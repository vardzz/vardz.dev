import { NextResponse } from 'next/server';
import { LexRuntimeV2Client, RecognizeTextCommand } from '@aws-sdk/client-lex-runtime-v2';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const lexClient = new LexRuntimeV2Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const hasUpstashEnv = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

const burstLimiter = hasUpstashEnv
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '10 s'),
      prefix: 'chat-burst',
    })
  : null;

const dailyLimiter = hasUpstashEnv
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.fixedWindow(100, '24 h'),
      prefix: 'chat-daily',
    })
  : null;

const burstFallbackStore = new Map<string, number[]>();
const dailyFallbackStore = new Map<string, { count: number; reset: number }>();

function checkBurstFallback(identifier: string) {
  const now = Date.now();
  const windowStart = now - 10_000;
  const events = (burstFallbackStore.get(identifier) || []).filter((timestamp) => timestamp > windowStart);

  if (events.length >= 5) {
    const resetTimestamp = events[0] + 10_000;
    burstFallbackStore.set(identifier, events);
    return { success: false, reset: resetTimestamp };
  }

  events.push(now);
  burstFallbackStore.set(identifier, events);
  return { success: true, reset: now + 10_000 };
}

function checkDailyFallback(identifier: string) {
  const now = Date.now();
  const entry = dailyFallbackStore.get(identifier);

  if (!entry || entry.reset <= now) {
    const reset = now + 24 * 60 * 60 * 1000;
    dailyFallbackStore.set(identifier, { count: 1, reset });
    return { success: true, reset };
  }

  if (entry.count >= 100) {
    return { success: false, reset: entry.reset };
  }

  dailyFallbackStore.set(identifier, { count: entry.count + 1, reset: entry.reset });
  return { success: true, reset: entry.reset };
}

function getClientIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
}

function formatResetTimestamp(resetTimestamp: number) {
  const date = new Date(resetTimestamp);
  const parts = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(date);

  const pick = (type: string) => parts.find((part) => part.type === type)?.value || '';

  return `${pick('month')} ${pick('day')}, ${pick('year')} at ${pick('hour')}:${pick('minute')} ${pick('dayPeriod')}`;
}

function createLimitResponse(options: {
  message: string;
  resetTimestamp: number;
  limitType: 'burst' | 'daily';
}) {
  const resetAtLabel = formatResetTimestamp(options.resetTimestamp);
  const retryAfterSeconds = Math.max(1, Math.ceil((options.resetTimestamp - Date.now()) / 1000));

  return NextResponse.json(
    {
      error: options.message,
      resetTimestamp: options.resetTimestamp,
      resetAtLabel,
      limitType: options.limitType,
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSeconds),
        'Cache-Control': 'no-store',
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const { message, sessionId } = (await request.json()) as {
      message?: string;
      sessionId?: string;
    };

    const identifier = getClientIp(request);

    const dailyLimit = dailyLimiter ? await dailyLimiter.limit(identifier) : checkDailyFallback(identifier);

    if (!dailyLimit.success) {
      return createLimitResponse({
        message: `You've hit your limit for today in using Jeje AI Assistant, you can use it again tomorrow ${formatResetTimestamp(dailyLimit.reset)}`,
        resetTimestamp: dailyLimit.reset,
        limitType: 'daily',
      });
    }

    const burstLimit = burstLimiter ? await burstLimiter.limit(identifier) : checkBurstFallback(identifier);

    if (!burstLimit.success) {
      return createLimitResponse({
        message: 'You are sending messages too quickly. Please pause for a few seconds and try again.',
        resetTimestamp: burstLimit.reset,
        limitType: 'burst',
      });
    }

    const command = new RecognizeTextCommand({
      botId: process.env.AWS_LEX_BOT_ID,
      botAliasId: process.env.AWS_LEX_BOT_ALIAS_ID,
      localeId: 'en_US',
      sessionId: sessionId || 'portfolio-guest-session',
      text: message,
    });

    const response = await lexClient.send(command);
    const botReply = response.messages?.[0]?.content || "I'm having trouble connecting right now.";

    return NextResponse.json({ reply: botReply });
  } catch (error) {
    console.error('Lex Connection Error:', error);
    return NextResponse.json(
      {
        error: 'The assistant is temporarily unavailable. Please try again in a moment.',
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
