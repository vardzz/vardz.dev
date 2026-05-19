'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Bot, Eye, MessageSquareText, MoreVertical, X } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    sender: 'bot',
    text: 'Hi there! I am Jeje, Jericho\'s portfolio assistant. Ask about his work, stack, or availability, and I will answer directly.',
    createdAt: Date.now(),
  },
];

function createSessionId() {
  return `session-${Math.random().toString(36).slice(2, 10)}`;
}

function createMessage(sender, text) {
  return {
    id: `${Date.now()}-${Math.random()}`,
    sender,
    text,
    createdAt: Date.now(),
  };
}

function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
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
    setMessages((prev) => [...prev, createMessage('bot', text)]);
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
    setMessages((prev) => [...prev, createMessage('user', messageText)]);

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

  return (
    <div className="fixed inset-x-4 bottom-4 z-[60] font-sans text-[#EDEDED] md:inset-x-auto md:bottom-6 md:right-6">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.section
            key="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative ml-auto flex h-[min(74vh,620px)] w-full max-w-[390px] flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#111111] shadow-[0_26px_70px_rgba(0,0,0,0.55)]"
          >
            <div className="relative flex items-center justify-between border-b border-white/5 bg-[#222224] px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d7b85d]/25 bg-[#141414]">
                  <Bot className="h-3.5 w-3.5 text-[#d7b85d]" />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[27px] font-semibold leading-none text-[#d7b85d]">Jeje</p>
                  <span className="rounded-full border border-[#d7b85d]/20 bg-[#5f4d1d]/35 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#d7b85d]">
                    AI ASSISTANT
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8b8b8d] transition-all hover:bg-black/20 hover:text-[#b7b7b9] active:scale-95"
                  aria-label="Chat options"
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8b8b8d] transition-all hover:bg-black/20 hover:text-[#b7b7b9] active:scale-95"
                  aria-label="Close chat"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <>
              <div className="relative flex-1 overflow-y-auto bg-[#161616] px-4 py-4 sm:px-5">
                <div className="space-y-4">
                  <div className="pt-1 text-center text-[8px] uppercase tracking-[0.16em] text-[#555557]">Today</div>

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[84%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                        {message.sender === 'bot' ? (
                          <div className="mb-1.5 flex items-center gap-2 pl-0.5">
                            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#a88b37]/75">
                              <Eye className="h-2.5 w-2.5 text-[#f7f2df]" />
                            </span>
                          </div>
                        ) : null}

                        <div
                          className={`rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed shadow-[0_8px_22px_rgba(0,0,0,0.22)] ${
                            message.sender === 'user'
                              ? 'rounded-br-[9px] border border-white/5 bg-[#2a2a2d] text-[#e8e8e8]'
                              : 'rounded-bl-[9px] border border-white/5 bg-[#2a2a2d] text-[#e8e8e8]'
                          }`}
                        >
                          {message.text}
                        </div>

                        <span className="mt-1.5 px-1 text-[8px] uppercase tracking-[0.14em] text-[#7a7a7c]">
                          {formatTimestamp(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isSending && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[84%] flex-col items-start">
                        <div className="mb-1.5 flex items-center gap-2 pl-0.5">
                          <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#a88b37]/75">
                            <Eye className="h-2.5 w-2.5 text-[#f7f2df]" />
                          </span>
                        </div>
                        <div className="rounded-2xl rounded-bl-[9px] border border-white/5 bg-[#2a2a2d] px-4 py-3 text-sm text-[#a0a0a2]">
                          Thinking...
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
              </div>

              <div className="relative border-t border-white/5 bg-[#131313] px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
                <div className="mb-2.5 flex items-center justify-center">
                  <span className="text-[8px] uppercase tracking-[0.28em] text-[#555557]">
                    POWERED BY AMAZON LEX
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#2a2a2d] px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all focus-within:border-[#d7b85d]/45">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask anything about Jericho..."
                    rows={1}
                    className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-2 text-[13px] text-[#dddddf] outline-none placeholder:text-[#7b7b7d]"
                  />

                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!canSend}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#d7b85d] text-[#181818] transition-all hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
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
            className="group ml-auto flex items-center gap-3 rounded-full border border-[#d7b85d]/25 bg-[#1b1b1d] px-4 py-3 text-[#e9e9ea] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all hover:-translate-y-0.5 hover:border-[#d7b85d]/45 active:scale-95"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7b85d]/30 bg-[#121212] text-[#d7b85d]">
              <MessageSquareText className="h-4 w-4" />
            </span>
            <span className="text-left">
              <span className="block text-[10px] font-medium uppercase tracking-[0.34em] text-neutral-500">Open assistant</span>
              <span className="block text-sm font-semibold text-[#e9e9ea]">Chat with Jeje</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
