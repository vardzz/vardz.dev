import { NextResponse } from 'next/server';
import { LexRuntimeV2Client, RecognizeTextCommand } from '@aws-sdk/client-lex-runtime-v2';

// Initialize the AWS Lex Client using your server-side environment variables
const lexClient = new LexRuntimeV2Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(request: Request) {
  try {
    const { message, sessionId } = await request.json();

    const command = new RecognizeTextCommand({
      botId: process.env.AWS_LEX_BOT_ID,
      botAliasId: process.env.AWS_LEX_BOT_ALIAS_ID,
      localeId: 'en-US',
      sessionId: sessionId || 'portfolio-guest-session', // Track unique conversation threads
      text: message,
    });

    const response = await lexClient.send(command);
    
    // Extract the text message group your bot generated in the console
    const botReply = response.messages?.[0]?.content || "I'm having trouble connecting right now.";

    return NextResponse.json({ reply: botReply });
  } catch (error) {
    console.error('Lex Connection Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}