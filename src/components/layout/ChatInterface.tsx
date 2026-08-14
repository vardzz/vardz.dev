"use client";
import React, { useState, useEffect } from 'react';
import { useChat } from './ChatProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useChat as useAIChat } from '@ai-sdk/react';

const GHOST_TEXTS = [
  "Ask about projects, experience, stack...",
  "Show me Vardz's latest projects...",
  "What tech stack does Vardz use?",
  "Tell me about your background..."
];

export default function ChatInterface() {
  const { isChatActive, setIsChatActive, isAtBottom } = useChat();
  const pathname = usePathname();
  const router = useRouter();
  
  const [placeholder, setPlaceholder] = useState("");
  const [ghostIndex, setGhostIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const processedToolCalls = React.useRef<Set<string>>(new Set());
  const navigateToRoute = React.useCallback(
    (route?: string, toolCallId?: string) => {
      if (!route || (toolCallId && processedToolCalls.current.has(toolCallId))) {
        return;
      }

      if (toolCallId) {
        processedToolCalls.current.add(toolCallId);
      }

      router.push(route);

      const portfolioCanvas = document.getElementById('portfolio-canvas');
      if (portfolioCanvas) {
        portfolioCanvas.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [router]
  );

  const detectRoute = React.useCallback((input: string): string | undefined => {
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
  }, []);

  const { messages, sendMessage, status } = useAIChat({
    onToolCall: async ({ toolCall }) => {
      if (toolCall.toolName === 'navigateUI') {
        navigateToRoute((toolCall.input as { route?: string } | undefined)?.route, toolCall.toolCallId);
      }
    },
  });

  // Listen to new messages to trigger UI navigation tool calls
  useEffect(() => {
    messages.forEach((msg: any) => {
      // Check in toolInvocations (if populated by AI SDK)
      msg.toolInvocations?.forEach((toolInvocation: any) => {
        if (
          toolInvocation.toolName === 'navigateUI' &&
          !processedToolCalls.current.has(toolInvocation.toolCallId)
        ) {
          navigateToRoute(toolInvocation.input?.route, toolInvocation.toolCallId);
        }
      });

      // Also fallback/check in parts just in case
      msg.parts?.forEach((part: any) => {
        if (part.type === 'tool-invocation') {
          const toolInvocation = part.toolInvocation;
          if (
            toolInvocation.toolName === 'navigateUI' &&
            !processedToolCalls.current.has(toolInvocation.toolCallId)
          ) {
            navigateToRoute(toolInvocation.input?.route, toolInvocation.toolCallId);
          }
        }
      });
    });
  }, [messages, router]);

  useEffect(() => {
    const handleSendChatMessage = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const text = customEvent.detail;
      
      const route = detectRoute(text);
      navigateToRoute(route);
      
      if (!isChatActive) setIsChatActive(true);
      
      const portfolioCanvas = document.getElementById('portfolio-canvas');
      if (portfolioCanvas) {
        portfolioCanvas.scrollTo({ top: 0, behavior: 'smooth' });
      }

      sendMessage({ text });
    };

    window.addEventListener('sendChatMessage', handleSendChatMessage);
    return () => window.removeEventListener('sendChatMessage', handleSendChatMessage);
  }, [detectRoute, navigateToRoute, isChatActive, setIsChatActive, sendMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatActive) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isChatActive]);

  // Ghost Typist Effect
  useEffect(() => {
    if (isChatActive) return;
    
    const currentText = GHOST_TEXTS[ghostIndex];
    let typingSpeed = isDeleting ? 30 : 60;
    
    if (!isDeleting && placeholder === currentText) {
      typingSpeed = 2000;
      setIsDeleting(true);
    } else if (isDeleting && placeholder === "") {
      setIsDeleting(false);
      setGhostIndex((prev) => (prev + 1) % GHOST_TEXTS.length);
      typingSpeed = 500;
    }

    const timeout = setTimeout(() => {
      setPlaceholder(
        currentText.substring(0, placeholder.length + (isDeleting ? -1 : 1))
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [placeholder, isDeleting, ghostIndex, isChatActive]);

  const displayPlaceholder = isChatActive ? "Communicate..." : placeholder;
  const isGeneratingAnswer = status === 'submitted' || status === 'streaming';

  const getPrimaryHighlightText = (input: string): string | null => {
    const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const projectNames = ['Horizon AI', 'Lunas', 'Gridworks', 'GabaySr', 'GhostNet AI', 'Dentara'];

    for (const name of projectNames) {
      if (new RegExp(`\\b${escapeRegExp(name)}\\b`, 'i').test(input)) {
        return name;
      }
    }

    return null;
  };

  const renderFormattedAssistantText = (text: string) => {
    const sanitizedText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/[_~`]+/g, '')
      .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    const sentenceBlocks = sanitizedText
      .split(/\n\s*\n+/)
      .map((block) => block.trim())
      .filter(Boolean)
      .flatMap((block) => {
        const sentences = block
          .split(/(?<=[.!?])\s+(?=[A-Z0-9\"'])/)
          .map((sentence) => sentence.trim())
          .filter(Boolean);

        if (sentences.length <= 2) return [sentences.join(' ')];

        const grouped: string[] = [];
        for (let index = 0; index < sentences.length; index += 2) {
          grouped.push(sentences.slice(index, index + 2).join(' '));
        }
        return grouped;
      });

    return sentenceBlocks.map((paragraph, paragraphIndex) => {
      const segments = paragraph.split(/(https?:\/\/[^\s]+)/g).filter(Boolean);
      const textOnlyContent = segments
        .filter((segment) => !/^https?:\/\//.test(segment))
        .join(' ');
      const highlightText = getPrimaryHighlightText(textOnlyContent);

      const renderedContent = segments.map((segment, segmentIndex) => {
        if (/^https?:\/\//.test(segment)) {
          const cleanUrl = segment.replace(/[.,!?]+$/, '');
          return (
            <a
              key={`${paragraphIndex}-${segmentIndex}`}
              href={cleanUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent underline underline-offset-4 decoration-accent/60 hover:text-text transition-colors break-all"
            >
              {cleanUrl}
            </a>
          );
        }

        if (!highlightText) {
          return <React.Fragment key={`${paragraphIndex}-${segmentIndex}`}>{segment}</React.Fragment>;
        }

        const pattern = new RegExp(`(${highlightText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
        const parts = segment.split(pattern);

        return (
          <React.Fragment key={`${paragraphIndex}-${segmentIndex}`}>
            {parts.map((part, partIndex) => {
              if (part.toLowerCase() === highlightText.toLowerCase()) {
                return (
                  <strong
                    key={`${paragraphIndex}-${segmentIndex}-${partIndex}`}
                    className="text-text font-semibold"
                  >
                    {part}
                  </strong>
                );
              }
              return <React.Fragment key={`${paragraphIndex}-${segmentIndex}-${partIndex}`}>{part}</React.Fragment>;
            })}
          </React.Fragment>
        );
      });

      return (
        <p key={paragraphIndex} className="leading-relaxed text-[14px] md:text-[15px] text-muted whitespace-normal">
          {renderedContent}
        </p>
      );
    });
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const route = detectRoute(inputValue);
    navigateToRoute(route);
    
    if (!isChatActive) setIsChatActive(true);
    
    // Auto-scroll the root page to top
    const portfolioCanvas = document.getElementById('portfolio-canvas');
    if (portfolioCanvas) {
      portfolioCanvas.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Call AI SDK submit
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  return (
    <div 
      className={`fixed top-0 left-0 h-screen z-50 flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isChatActive 
          ? 'w-full md:w-[30%] bg-transparent justify-end pb-12' 
          : 'w-full bg-transparent pointer-events-none justify-end pb-[24px]'
      }`}
    >
      
      {/* Close Button */}
      {isChatActive && (
        <div className="absolute top-12 w-full max-w-[640px] px-8 flex justify-start z-[100] pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsChatActive(false)}
            className="text-muted hover:text-text transition-colors p-2 -ml-2 flex items-center gap-2 group cursor-pointer"
            aria-label="Close Chat"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="font-mono text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
          </button>
        </div>
      )}

      {/* Chat History */}
      <div className={`w-full max-w-[640px] flex-1 overflow-y-auto px-8 pt-24 pb-12 flex flex-col gap-12 transition-all duration-700 delay-100 no-scrollbar ${isChatActive ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 hidden translate-y-10'}`}>
        
        {messages.map((msg: any) => (
          <div 
            key={msg.id} 
            className={`w-full flex flex-col ${msg.role === 'user' ? 'items-end text-right' : 'items-start text-left'}`}
          >
            {msg.role === 'user' ? (
              <h2 className="text-[28px] md:text-[32px] font-bold font-mono tracking-tight text-text">
                {msg.parts
                  ?.filter((part: any) => part.type === 'text')
                  .map((part: any) => part.text)
                  .join('')}
              </h2>
            ) : (
              <div className="font-mono max-w-[90%] md:max-w-[85%] flex flex-col gap-3">
                {msg.parts?.map((part: any, idx: number) => {
                  if (part.type === 'text') {
                    const cleanedText = part.text
                      .replace(/<navigateUI>[\s\S]*?<\/navigateUI>/g, '')
                      .replace(/<tool_call>[\s\S]*?<\/tool_call>/g, '')
                      .trim();
                    if (!cleanedText) return null;
                    return (
                      <div key={idx} className="text-[14px] md:text-[15px] leading-relaxed text-muted flex flex-col gap-3">
                        {renderFormattedAssistantText(cleanedText)}
                      </div>
                    );
                  }
                  if (part.type === 'reasoning') {
                    return (
                      <div key={idx} className="text-xs italic opacity-50 border-l-2 border-line pl-2 select-none">
                        {part.text}
                      </div>
                    );
                  }
                  if (part.type === 'tool-invocation') {
                    const toolInvocation = part.toolInvocation;
                    if (toolInvocation.toolName === 'navigateUI') {
                      const route = toolInvocation.input?.route;
                      return (
                        <div key={toolInvocation.toolCallId} className="mt-2 text-xs font-mono text-accent opacity-70">
                          <span className="flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                            Navigating to {route || 'route'}...
                          </span>
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        ))}
        {isGeneratingAnswer && (
          <div className="w-full flex justify-start">
            <p className="thinking-indicator text-[14px] md:text-[15px] font-mono text-muted">
              thinking...
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`w-[min(720px,calc(100%-32px))] transition-all duration-700 ${
        isChatActive 
          ? 'max-w-[640px] opacity-100 pointer-events-auto translate-y-0' 
          : (isAtBottom && pathname === '/')
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none translate-y-12'
      }`}>
        
        <form 
          onSubmit={onFormSubmit}
          className="relative flex items-center transition-all duration-300 group bg-surface border border-line shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] rounded-[24px] p-[8px] pl-[16px] focus-within:border-accent focus-within:ring-[3px] focus-within:ring-accent-dim"
        >
          <input 
            type="text" 
            autoComplete="off" 
            aria-label="Ask the AI a question" 
            placeholder={isChatActive ? "Communicate..." : displayPlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-transparent border-0 outline-0 text-text font-mono placeholder-muted py-[12px] md:py-[14px] text-[14px] md:text-[15px]"
          />
          <button 
            type="submit" 
            disabled={isGeneratingAnswer}
            className="shrink-0 ml-[8px] w-[36px] h-[36px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-full md:rounded-[16px] bg-text text-bg hover:scale-105 transition-transform duration-300 shadow-md disabled:opacity-50 disabled:hover:scale-100"
            aria-label="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[-1px]">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </form>
      </div>
      
    </div>
  );
}
