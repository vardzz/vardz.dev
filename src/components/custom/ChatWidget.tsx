'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, MessageSquareText, X } from 'lucide-react';

type ChatSender = 'bot' | 'user';
type ChatTone = 'normal' | 'limit' | 'error';

type ChatMessage = {
  id: string;
  sender: ChatSender;
  text: string;
  tone?: ChatTone;
  meta?: {
    resetAtLabel?: string;
  };
};

type ChatResponse = {
  reply?: string;
  error?: string;
  resetTimestamp?: number;
  resetAtLabel?: string;
  limitType?: 'burst' | 'daily';
};

type RobotIconProps = {
  className?: string;
};

type MessageSegment =
  | {
      type: 'text';
      value: string;
      key: string;
    }
  | {
      type: 'link';
      href: string;
      key: string;
    };

const RobotIcon = ({ className }: RobotIconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
    <rect x="3" y="7" width="18" height="10" rx="2" strokeWidth="1.5" />
    <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
    <path d="M9 17v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="10" y="3" width="4" height="2" rx="1" strokeWidth="1.5" />
  </svg>
);

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome',
    sender: 'bot',
    text: "Hi there! I am Jeje, Jericho's portfolio assistant. Ask about his work, stack, or availability, and I will answer directly.",
  },
];

const URL_PATTERN = /(https?:\/\/[^\s<>()"']+)/g;

function trimUrlPunctuation(url: string) {
  let cleanUrl = url;
  let trailing = '';

  while (cleanUrl.length > 0 && /[.,!?;:)"]]$/.test(cleanUrl)) {
    trailing = `${cleanUrl.slice(-1)}${trailing}`;
    cleanUrl = cleanUrl.slice(0, -1);
  }

  return {
    href: cleanUrl,
    trailing,
  };
}

function parseMessageSegments(text: string): MessageSegment[] {
  const segments: MessageSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(URL_PATTERN)) {
    const url = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      segments.push({
        type: 'text',
        value: text.slice(lastIndex, index),
        key: `text-${lastIndex}-${index}`,
      });
    }

    const { href, trailing } = trimUrlPunctuation(url);

    segments.push({
      type: 'link',
      href,
      key: `link-${index}-${href}`,
    });

    if (trailing) {
      segments.push({
        type: 'text',
        value: trailing,
        key: `trail-${index}-${trailing}`,
      });
    }

    lastIndex = index + url.length;
  }

  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      value: text.slice(lastIndex),
      key: `text-${lastIndex}-${text.length}`,
    });
  }

  return segments;
}

function renderMessageText(text: string) {
  const paragraphs = text.split(/\n+/);

  return (
    <div className="whitespace-pre-line">
      {paragraphs.map((paragraph, paragraphIndex) => {
        const segments = parseMessageSegments(paragraph);

        return (
          <p key={`paragraph-${paragraphIndex}`} className={paragraphIndex > 0 ? 'mt-4' : undefined}>
            {segments.map((segment) => {
              if (segment.type === 'link') {
                return (
                  <a
                    key={segment.key}
                    href={segment.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-amber-400 underline decoration-amber-300/40 decoration-1 underline-offset-4 transition-colors duration-200 hover:text-amber-300 hover:decoration-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/35"
                  >
                    Click here
                  </a>
                );
              }

              return <span key={segment.key}>{segment.value}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}

function createSessionId() {
  return `session-${Math.random().toString(36).slice(2, 10)}`;
}

function createMessage(sender: ChatSender, text: string, tone: ChatTone = 'normal', meta?: ChatMessage['meta']) {
  return {
    id: `${Date.now()}-${Math.random()}`,
    sender,
    text,
    tone,
    meta,
  } satisfies ChatMessage;
}

function formatResetTimestamp(resetTimestamp?: number) {
  if (!resetTimestamp || Number.isNaN(resetTimestamp)) {
    return null;
  }

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

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sessionId] = useState(() => createSessionId());
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isLightBg, setIsLightBg] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getCssBase = () => (getComputedStyle(document.documentElement).getPropertyValue('--base') || '').trim();

    const parseRgb = (value: string) => {
      const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);

      if (!match) {
        return null;
      }

      return [Number(match[1]), Number(match[2]), Number(match[3])];
    };

    const hexToRgb = (hex: string) => {
      try {
        const clean = hex.replace(/"|'/g, '').trim().replace(/^#/, '');

        if (clean.length === 3) {
          return [
            Number.parseInt(clean[0] + clean[0], 16),
            Number.parseInt(clean[1] + clean[1], 16),
            Number.parseInt(clean[2] + clean[2], 16),
          ];
        }

        if (clean.length === 6) {
          return [
            Number.parseInt(clean.slice(0, 2), 16),
            Number.parseInt(clean.slice(2, 4), 16),
            Number.parseInt(clean.slice(4, 6), 16),
          ];
        }
      } catch {
        return null;
      }

      return null;
    };

    const evaluate = () => {
      try {
        const baseVar = getCssBase();

        if (baseVar) {
          const low = baseVar.replace(/"|'/g, '').toLowerCase();

          if (low.includes('#f4ede4')) {
            setIsLightBg(true);
            return;
          }

          if (low.includes('#111111')) {
            setIsLightBg(false);
            return;
          }

          const rgb = low.includes('#') ? hexToRgb(low) : parseRgb(low);

          if (rgb) {
            const [r, g, b] = rgb.map((value) => value / 255);
            const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            setIsLightBg(luminance > 0.5);
            return;
          }
        }

        const theme = document.documentElement.getAttribute('data-theme');

        if (theme) {
          setIsLightBg(theme.toLowerCase().includes('light'));
          return;
        }

        const bodyBg = getComputedStyle(document.body).backgroundColor || '';
        const rgb = parseRgb(bodyBg);

        if (rgb) {
          const [r, g, b] = rgb.map((value) => value / 255);
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          setIsLightBg(luminance > 0.5);
          return;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          setIsLightBg(true);
          return;
        }

        setIsLightBg(false);
      } catch {
        setIsLightBg(false);
      }
    };

    evaluate();

    const observer = new MutationObserver(() => evaluate());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'data-theme'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });

    const media = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const onMedia = () => evaluate();

    if (media && media.addEventListener) {
      media.addEventListener('change', onMedia);
    }

    return () => {
      observer.disconnect();

      if (media && media.removeEventListener) {
        media.removeEventListener('change', onMedia);
      }
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOpen]);

  const canSend = input.trim().length > 0 && !isSending;

  const addBotMessage = (text: string, tone: ChatTone = 'normal', meta?: ChatMessage['meta']) => {
    setMessages((prev) => [...prev, createMessage('bot', text, tone, meta)]);
  };

  const handleSendMessage = async (messageOverride?: string) => {
    const messageText = (messageOverride ?? input).trim();

    if (!messageText || isSending) {
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
    }

    setInput('');
    setIsSending(true);
    setMessages((prev) => [...prev, createMessage('user', messageText)]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText, sessionId }),
      });

      const data = (await response.json()) as ChatResponse;

      if (response.status === 429) {
        const resetAtLabel = data.resetAtLabel || formatResetTimestamp(data.resetTimestamp) || 'soon';
        const errorText =
          data.error ||
          `You've hit your limit for today in using Jeje AI Assistant, you can use it again tomorrow ${resetAtLabel}`;

        addBotMessage(errorText, 'limit', { resetAtLabel });
        return;
      }

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to reach the assistant right now.');
      }

      addBotMessage(data.reply || 'I am here, but I could not generate a response just now.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Connection lost. Please try again in a moment.';
      addBotMessage(message, 'error');
    } finally {
      setIsSending(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-20 z-[60] font-sans text-[#EDEDED] md:inset-x-auto md:bottom-6 md:right-6">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.section
            key="chat-panel"
            data-palette={isLightBg ? 'light' : 'dark'}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`relative ml-auto flex h-[min(74vh,620px)] w-full max-w-[390px] flex-col overflow-hidden rounded-2xl shadow-[0_26px_70px_rgba(0,0,0,0.55)] ${isLightBg ? 'border border-[#111111]/8 bg-[#F4EDE4] text-[#111111]' : 'border border-white/5 bg-[#111111] text-[#F4EDE4]'}`}
          >
            <div className={`relative flex items-center justify-between border-b px-4 py-3.5 sm:px-5 ${isLightBg ? 'border-[#111111]/8 bg-[#F4EDE4]/90' : 'border-white/5 bg-[#222224]'}`}>
              <div className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isLightBg ? 'border-[#111111]/15 bg-[#F4EDE4]' : 'border-white/6 bg-[#141414]'}`}>
                  <RobotIcon className={`h-3.5 w-3.5 ${isLightBg ? 'text-[#111111]' : 'text-[#F4EDE4]'}`} />
                </div>
                <div className="flex items-center gap-2">
                  <p className={`text-[27px] font-semibold leading-none ${isLightBg ? 'text-[#111111]' : 'text-[#F4EDE4]'}`}>Jeje</p>
                  <span className={`rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] ${isLightBg ? 'border border-[#111111]/12 bg-transparent text-[#111111]' : 'border border-[#F4EDE4]/20 bg-transparent text-[#F4EDE4]'}`}>
                    AI ASSISTANT
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#8b8b8d] transition-all hover:bg-black/20 hover:text-[#b7b7b9] active:scale-95"
                aria-label="Close chat"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className={`relative flex-1 overflow-y-auto px-4 py-4 sm:px-5 ${isLightBg ? 'bg-[#F4EDE4]/90' : 'bg-[#161616]'}`}>
              <div className="space-y-4">
                {messages.map((message) => {
                  const isUser = message.sender === 'user';
                  const isErrorTone = message.tone === 'error';
                  const isLimitTone = message.tone === 'limit';

                  return (
                    <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex max-w-[84%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                        {!isUser ? (
                          <div className="mb-1.5 flex items-center gap-2 pl-0.5">
                            <span className={`relative inline-flex h-5 w-5 items-center justify-center rounded-full ${isLightBg ? 'bg-[#111111]/90' : 'bg-[#F4EDE4]/10'}`}>
                              <RobotIcon className="h-2.5 w-2.5 text-[#F4EDE4]" />
                            </span>
                          </div>
                        ) : null}

                        <div
                          className={`rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed shadow-[0_8px_22px_rgba(0,0,0,0.22)] ${isUser ? 'rounded-br-[9px] border border-white/6 bg-[#2a2a2d] text-[#e8e8e8]' : 'rounded-bl-[9px] border text-[#e8e8e8]'} ${
                            !isUser && isErrorTone
                              ? 'border-rose-400/25 bg-rose-500/10 text-rose-100'
                              : !isUser && isLimitTone
                                ? 'border-[#F4EDE4]/10 bg-[#F4EDE4]/6 text-[#f0ece6]'
                                : 'border-white/6 bg-[#2a2a2d]'
                          } ${isLightBg && !isUser ? 'text-[#111111]' : ''}`}
                        >
                          {renderMessageText(message.text)}

                          {!isUser && message.meta?.resetAtLabel ? (
                            <div className={`mt-2 text-[11px] uppercase tracking-[0.22em] ${isErrorTone ? 'text-rose-200/70' : 'text-[#9f9f9f]'}`}>
                              Unblocks {message.meta.resetAtLabel}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isSending ? (
                  <div className="flex justify-start">
                    <div className="flex max-w-[84%] flex-col items-start">
                      <div className="mb-1.5 flex items-center gap-2 pl-0.5">
                        <span className={`relative inline-flex h-5 w-5 items-center justify-center rounded-full ${isLightBg ? 'bg-[#111111]/90' : 'bg-[#F4EDE4]/10'}`}>
                          <RobotIcon className="h-2.5 w-2.5 text-[#F4EDE4]" />
                        </span>
                      </div>
                      <div className={`rounded-2xl rounded-bl-[9px] border border-white/5 bg-[#2a2a2d] px-4 py-3 text-sm ${isLightBg ? 'text-[#111111]' : 'text-[#a0a0a2]'}`}>
                        <span className="flex items-center gap-2">
                          <span>Thinking</span>
                          <span className="dots inline-flex items-center">
                            <span className="dot" style={{ backgroundColor: isLightBg ? '#111111' : '#F4EDE4' }} />
                            <span className="dot" style={{ backgroundColor: isLightBg ? '#111111' : '#F4EDE4' }} />
                            <span className="dot" style={{ backgroundColor: isLightBg ? '#111111' : '#F4EDE4' }} />
                          </span>
                        </span>
                        <style>{`\
                            .dots .dot{display:inline-block;width:6px;height:6px;border-radius:9999px;margin-left:6px;animation:dotBounce 900ms infinite ease-in-out}\
                            .dots .dot:nth-child(1){animation-delay:0s}\
                            .dots .dot:nth-child(2){animation-delay:120ms}\
                            .dots .dot:nth-child(3){animation-delay:240ms}\
                            @keyframes dotBounce{0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}\
                          `}</style>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div ref={endRef} />
              </div>
            </div>

            <div className="relative border-t border-white/5 bg-[#131313] px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
              <div className={`flex items-center gap-3 rounded-full border px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all ${isLightBg ? 'border-[#111111]/12 bg-[#F4EDE4]/90 focus-within:border-[#111111]/45' : 'border-white/6 bg-[#242424] focus-within:border-[#F4EDE4]/45'}`}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void handleSendMessage();
                    }
                  }}
                  placeholder="Ask anything about Jericho..."
                  className={`h-9 flex-1 bg-transparent px-3 text-[13px] placeholder:text-[#7b7b7d] outline-none ${isLightBg ? 'text-[#111111]' : 'text-[#d7d7d9]'}`}
                />

                <button
                  type="button"
                  onClick={() => {
                    void handleSendMessage();
                  }}
                  disabled={!canSend}
                  className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md shadow-sm transition-all hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${isLightBg ? 'bg-[#111111] text-[#F4EDE4]' : 'bg-[#F4EDE4] text-[#111111]'}`}
                  aria-label="Send message"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center">
                <span className="text-[8px] uppercase tracking-[0.28em] text-[#555557]">POWERED BY AMAZON LEX</span>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.button
            key="chat-launcher"
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => setIsOpen(true)}
            className={`group ml-auto flex items-center gap-3 rounded-full px-4 py-3 text-[#e9e9ea] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all active:scale-95 cursor-pointer md:gap-3 md:px-4 ${isLightBg ? 'border border-[#111111]/25 bg-[#F4EDE4] text-[#111111] hover:-translate-y-0.5 hover:border-[#111111]/45' : 'border border-[#F4EDE4]/25 bg-[#1b1b1d] text-[#F4EDE4] hover:-translate-y-0.5 hover:border-[#F4EDE4]/45'}`}
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-full border bg-[#121212] ${isLightBg ? 'border-[#111111]/30 bg-[#F4EDE4] text-[#111111]' : 'border-[#F4EDE4]/30 text-[#F4EDE4]'}`}>
              <MessageSquareText className="h-4 w-4" />
            </span>
            <span className="hidden flex-col text-left md:flex">
              <span className="block text-[10px] font-medium uppercase tracking-[0.34em] text-neutral-500">Open assistant</span>
              <span className="block text-sm font-semibold text-[#e9e9ea]">Chat with Jeje</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}