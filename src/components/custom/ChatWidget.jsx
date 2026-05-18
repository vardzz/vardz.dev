'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, ChevronDown, MessageSquareText, Send, Sparkles, X } from 'lucide-react';

const QUICK_PROMPTS = [
  'Tell me about your tech stack',
  'Show me your strongest projects',
  'What are you best at?',
  'Can we schedule a meeting?',
];

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    sender: 'bot',
    text: 'Hi, I am Jericho\'s portfolio assistant. Ask about his work, stack, or availability, and I will answer directly.',
  },
];

function createSessionId() {
  return `session-${Math.random().toString(36).slice(2, 10)}`;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const endRef = useRef(null);

  useEffect(() => {
    setSessionId(createSessionId());
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOpen]);

  const canSend = input.trim().length > 0 && !isSending;

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, sender: 'bot', text }]);
  };

  const handleSendMessage = async (messageOverride) => {
    const messageText = (messageOverride ?? input).trim();

    if (!messageText || isSending) {
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
    }

    setInput('');
    setIsSending(true);
    setMessages((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, sender: 'user', text: messageText }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText, sessionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to reach the assistant right now.');
      }

      addBotMessage(data.reply || 'I am here, but I could not generate a response just now.');
    } catch (error) {
      addBotMessage('Connection lost. Please try again in a moment.');
    } finally {
      setIsSending(false);
    }
  };

  const resetConversation = () => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
    setSessionId(createSessionId());
  };

  return (
    <div className="fixed bottom-20 right-4 z-[60] font-sans text-[#F4EDE4] md:bottom-6 md:right-6">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.section
            key="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`relative flex h-[min(70vh,640px)] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(23,22,21,0.96)_0%,rgba(14,13,12,0.98)_100%)] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl ${isMinimized ? 'h-auto' : ''}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,237,228,0.12),transparent_42%),linear-gradient(135deg,rgba(201,200,197,0.08),transparent_45%)]" />
            <div className="relative flex items-center justify-between border-b border-white/8 px-4 py-4 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
                  <Bot className="h-5 w-5 text-[#F4EDE4]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#F4EDE4]/55">Portfolio Assistant</p>
                  <p className="mt-1 text-sm text-[#F4EDE4]">Jericho AI</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMinimized((prev) => !prev)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#F4EDE4]/85 transition hover:bg-white/10"
                  aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#F4EDE4]/85 transition hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="relative border-b border-white/8 px-4 py-4 sm:px-5">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#F4EDE4]/45">
                    <Sparkles className="h-3.5 w-3.5" />
                    Ask anything about the portfolio
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleSendMessage(prompt)}
                        disabled={isSending}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-[12px] leading-tight text-[#F4EDE4]/80 transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[82%] rounded-[22px] px-4 py-3 text-sm leading-relaxed shadow-[0_10px_30px_rgba(0,0,0,0.18)] ${
                            message.sender === 'user'
                              ? 'rounded-tr-md border border-white/8 bg-[#F4EDE4] text-[#111111]'
                              : 'rounded-tl-md border border-white/10 bg-white/6 text-[#F4EDE4]/90'
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}

                    {isSending && (
                      <div className="flex justify-start">
                        <div className="rounded-[22px] rounded-tl-md border border-white/10 bg-white/6 px-4 py-3 text-sm text-[#F4EDE4]/65">
                          Thinking...
                        </div>
                      </div>
                    )}
                    <div ref={endRef} />
                  </div>
                </div>

                <div className="relative border-t border-white/8 p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={resetConversation}
                      className="text-[11px] uppercase tracking-[0.28em] text-[#F4EDE4]/40 transition hover:text-[#F4EDE4]/70"
                    >
                      Reset chat
                    </button>
                    <span className="text-[11px] tracking-[0.2em] text-[#F4EDE4]/35">
                      Powered by AWS Lex
                    </span>
                  </div>

                  <div className="flex items-end gap-2 rounded-[22px] border border-white/10 bg-black/20 px-3 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Ask about work, stack, or availability..."
                      rows={1}
                      className="max-h-36 min-h-10 flex-1 resize-none bg-transparent text-sm text-[#F4EDE4] outline-none placeholder:text-[#F4EDE4]/35"
                    />

                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      disabled={!canSend}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4EDE4] text-[#111111] transition hover:scale-[1.02] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
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
            className="group flex items-center gap-3 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(244,237,228,0.96)_0%,rgba(201,200,197,0.82)_100%)] px-4 py-3 text-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition hover:scale-[1.02]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-[#F4EDE4] shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset]">
              <MessageSquareText className="h-4 w-4" />
            </span>
            <span className="text-left">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.34em] text-[#111111]/55">Open assistant</span>
              <span className="block text-sm font-medium text-[#111111]">Chat with Jericho AI</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
