import { createGroq } from '@ai-sdk/groq';
import { streamText, tool, isStepCount, convertToModelMessages } from 'ai';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

export const maxDuration = 60;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const kbPath = path.join(process.cwd(), 'src/data/knowledge-base.md');
const kb = fs.readFileSync(kbPath, 'utf-8');

export async function POST(req: Request) {
  const { messages } = await req.json();

  const getLastUserText = (inputMessages: unknown): string => {
    if (!Array.isArray(inputMessages)) return '';

    for (let index = inputMessages.length - 1; index >= 0; index -= 1) {
      const message = inputMessages[index] as {
        role?: string;
        content?: unknown;
        parts?: Array<{ type?: string; text?: string }>;
      };

      if (message?.role !== 'user') continue;

      if (typeof message.content === 'string') {
        return message.content;
      }

      if (Array.isArray(message.parts)) {
        const text = message.parts
          .filter((part) => part?.type === 'text' && typeof part.text === 'string')
          .map((part) => part.text)
          .join(' ')
          .trim();

        if (text) return text;
      }
    }

    return '';
  };

  const detectRoute = (input: string): '/' | '/projects' | '/experience' | '/stack' | '/certificates' | undefined => {
    const normalized = input.toLowerCase();

    if (
      /\b(horizon ai|lunas|gridworks|gabaysr|ghostnet|dentara)\b/.test(normalized) ||
      (/\b(projects?|project)\b/.test(normalized) &&
        /(dive|deep|details|detail|architecture|implementation|feature|compare|how it works|more about|learn more|show me|tell me more|what is|what are|explain|tell me about)/.test(normalized))
    ) {
      return '/projects';
    }

    if (/\b(stack|tech stack|technologies|languages|tools|frameworks|tech)\b/.test(normalized)) {
      return '/stack';
    }

    if (/\b(experience|work experience|internship|volunteer)\b/.test(normalized)) {
      return '/experience';
    }

    if (/\b(certificates?|certifications?|education|academic|school|college)\b/.test(normalized)) {
      return '/certificates';
    }

    if (/\b(bio|about|contact|general info|who are you|about you)\b/.test(normalized)) {
      return '/';
    }

    if (/\b(dive deeper|more details|deep dive|more about|tell me more|show me more|architecture|implementation)\b/.test(normalized)) {
      return '/projects';
    }

    if (/\b(projects?|project)\b/.test(normalized)) {
      return '/';
    }

    return undefined;
  };

  const lastUserText = getLastUserText(messages);
  const forcedRoute = detectRoute(lastUserText);

  // Knowledge base is read at the module level for RAG caching

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
    "When answering, keep the response concise but readable. Write in 2 to 4 short paragraphs with clear spacing between them. Each paragraph should contain one or two sentences, never a dense wall of text. Do not use emojis, decorative symbols, or markdown-heavy formatting. Keep the tone polished, helpful, and confident. Do not tell the user to navigate themselves. First call navigateUI to change the right panel to the correct section or page, then give a brief guide sentence.",
    "Prefer a clear structure: start with the core answer, then add one short sentence of context or next-step guidance. If a URL is relevant, include the full URL plainly and without extra explanation so it can be rendered as a clickable link. If the user asks for a project detail or deeper explanation, keep it specific and useful without rambling or repeating the same idea.",
    "",
    "KNOWLEDGE BASE:",
    kb,
  ].join("\n");

  const result = streamText({
  model: groq('llama-3.1-8b-instant'),
  system: systemPrompt,
  messages: await convertToModelMessages(messages.slice(-5)),
  stopWhen: isStepCount(3),
  toolChoice: forcedRoute ? { type: 'tool', toolName: 'navigateUI' } : 'auto',
  providerOptions: {
    groq: {
      reasoningFormat: 'hidden',   // stops the "thinking" from leaking into the chat
      reasoningEffort: 'low',      // less internal deliberation = more likely to just act
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

