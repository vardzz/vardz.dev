import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

export const maxDuration = 60;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Read knowledge base
  const kbPath = path.join(process.cwd(), 'src/data/knowledge-base.md');
  const systemPrompt = fs.readFileSync(kbPath, 'utf-8');

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: systemPrompt,
    messages,
    tools: {
      navigateUI: {
        description: 'Navigate the right panel of the portfolio to a specific route based on the topic being discussed. You MUST call this tool whenever you answer a question about a specific topic (e.g. Bio, Skills, Experience, Projects).',
        inputSchema: z.object({
          route: z.enum(['/', '/projects', '/experience', '/stack', '/certificates']).describe('The exact route path to navigate to.'),
        }),
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
