import { createGroq } from '@ai-sdk/groq';
import { streamText, tool, isStepCount, convertToModelMessages } from 'ai';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

export const maxDuration = 60;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Read knowledge base for RAG
  const kbPath = path.join(process.cwd(), 'src/data/knowledge-base.md');
  const kb = fs.readFileSync(kbPath, 'utf-8');

  const systemPrompt = `You are the friendly and smart AI co-pilot/assistant for Jericho Varde's (vardz) portfolio.
Your goal is to act as a helpful partner for the visitor, guiding them through Jericho's work, skills, and background, making them feel welcome and comfortable.

Follow these guidelines for a premium conversational experience:
1. **Greetings & Casual Chat**: Be welcoming! Respond to greetings ("hi", "hello", "how are you?", etc.) in a friendly, warm, and slightly witty tone. Do not refuse polite small talk, but gently guide them towards exploring the portfolio.
2. **Be Conversational, Not Robotic**: Do not output dry, sterile denials. If a question is about something not in the knowledge base, answer politely (e.g., "I don't have that specific detail in my memory bank, but I'd love to tell you about Jericho's Next.js projects or how you can get in touch with him!").
3. **Use the Knowledge Base**: Rely on the facts in the knowledge base below to answer questions about Jericho's background, projects, experience, and skills. Refer to the tone directives in Section 0 of the knowledge base.
4. **Visual UI Navigation**: Remember that you are a visual guide! Whenever the user asks about or you discuss projects, skills/stack, experience, certifications, or bio/contact, you MUST use the \`navigateUI\` tool to automatically scroll/navigate the portfolio to that section for them.

KNOWLEDGE BASE:
${kb}`;

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    stopWhen: isStepCount(3),
    tools: {
      navigateUI: tool({
        description: 'Navigate the right panel of the portfolio to a specific route based on the topic being discussed. You MUST call this tool whenever you answer a question about a specific topic (e.g. Bio, Skills, Experience, Projects).',
        inputSchema: z.object({
          route: z.enum(['/', '/projects', '/experience', '/stack', '/certificates']).describe('The exact route path to navigate to.'),
        }),
        execute: async ({ route }: { route: string }) => `Navigated to ${route}`,
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}

