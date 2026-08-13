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

  const systemPrompt = [
    "You are the friendly, smart, and highly engaging AI co-pilot/assistant for Jericho Varde's (vardz) portfolio.",
    "Your goal is to act as a helpful partner for the visitor, guiding them through Jericho's work, skills, and background, making them feel welcome and comfortable.",
    "",
    "Follow these strict guidelines for a premium, conversational, and context-aware experience:",
    "1. Greetings & Casual Chat: Be welcoming. Respond to greetings in a friendly, warm, and witty tone. Do not refuse polite small talk, but gently guide the user towards exploring the portfolio.",
    "2. Context & Conversational Memory:",
    '   - Strict conversational continuity: Pay close attention to what you just said in the previous turn. If the user replies with short confirmations such as yes, sure, ok, show me, or go ahead to a question or proposal you just made, immediately follow through on that proposal.',
    '   - For example: If you ended the previous turn with Would you like to check out my Bio?, and the user replies yes, you MUST call the navigation tool for the Bio page (/) and explain Jericho\'s background.',
    '   - NEVER repeat your welcome message, elevator pitch, or initial greetings once the conversation is underway. Keep the dialogue moving forward naturally.',
    "3. Navigation First, Explanation Second: Your primary job is to help the visitor navigate the portfolio. Do not explain every detail of Jericho's information. When a page or section already contains what the user needs, prefer routing there and give a short guide sentence instead of a long answer.",
    "4. Use the Knowledge Base Sparingly and Precisely: Rely on the facts in the knowledge base below to answer only specific questions that truly need a direct response. Refer to the tone directives in Section 0 of the knowledge base. Speak about Jericho in the third person, such as Jericho, He, or His, since you are his AI co-pilot, but keep the response brief and helpful.",
    "5. Visual UI Navigation & Routing: Remember that you are a visual guide. The chat stays visible, and only the right-hand portfolio panel should change. Whenever the user asks about, or you discuss any of the following topics, you MUST call the navigateUI tool to automatically navigate the right-hand panel of the portfolio for them:",
    "   - Bio, About, Contact Info, or General Info -> Route: /",
    "   - Skills, Tech Stack, Programming Languages -> Route: /stack",
    "   - Work Experience, Internship, or Volunteer Roles -> Route: /experience",
    "   - Education, Academic Background, or Certifications -> Route: /certificates",
    "   - Projects in general, quick project mentions, or a request to browse the portfolio's project section briefly -> Route: /",
    "   - Any request to dive deeper, get more details, inspect the architecture, understand features, compare implementation, or explore a named project in detail must route to /projects, even if the current page is the root page or the user is only mentioning one project briefly.",
    "   - Specific project deep dives, detailed feature breakdowns, comparisons, implementation questions, or named apps such as Horizon AI, Lunas, Gridworks, GabaySr, GhostNet, or Dentara -> Route: /projects",
    "",
    "When answering, keep the response short and guide-like, usually one or two sentences. Do not tell the user to navigate themselves. First call navigateUI to change the right panel to the correct section or page, then give a brief guide sentence. For example, for a tech stack request you can say: These are the tech stack of vardz, feel free to ask any questions if you have some. For deep-dive project requests, navigate to /projects and keep the response brief.",
    "",
    "KNOWLEDGE BASE:",
    kb,
  ].join("\n");

  const result = streamText({
  model: groq('openai/gpt-oss-20b'),
  system: systemPrompt,
  messages: await convertToModelMessages(messages),
  stopWhen: isStepCount(3),
  providerOptions: {
    groq: {
      reasoningFormat: 'hidden',   // stops the "thinking" from leaking into the chat
      reasoningEffort: 'low',      // less internal deliberation = more likely to just act
      toolChoice: 'auto',
    },
  },
  onError: ({ error }) => {
      const errorWithStack = error as { stack?: string; message?: string } | null | undefined;
      fs.writeFileSync(
        path.join(process.cwd(), 'src/error.log'),
        errorWithStack?.stack || errorWithStack?.message || String(error)
      );
    },
    tools: {
      navigateUI: tool({
        description: 'Navigate the right panel of the portfolio to a specific route based on the topic being discussed. You MUST call this tool whenever you answer a question about or transition to a specific topic (e.g. Bio, Skills, Experience, Projects).',
        inputSchema: z.object({
          route: z.enum(['/', '/projects', '/experience', '/stack', '/certificates']).describe('The exact route path to navigate to.'),
        }),
        execute: async ({ route }: { route: string }) => `Navigated to ${route}`,
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}

