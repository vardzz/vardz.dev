'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, MessageSquareText, X } from 'lucide-react';

const RobotIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
    <rect x="3" y="7" width="18" height="10" rx="2" strokeWidth="1.5" />
    <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
    <path d="M9 17v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="10" y="3" width="4" height="2" rx="1" strokeWidth="1.5" />
  </svg>
);

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    sender: 'bot',
    text: 'Hi there! I am Jeje, Jericho\'s portfolio assistant. Ask about his work, stack, or availability, and I will answer directly.',
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
  };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isLightBg, setIsLightBg] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    setSessionId(createSessionId());
  }, []);

  useEffect(() => {
    // Robust palette detection: check --base var, data-theme, and body bg;
    // observe changes so the widget updates if page theme changes.
    const getCssBase = () => (getComputedStyle(document.documentElement).getPropertyValue('--base') || '').trim();
    const parseRgb = (s) => {
      const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if (!m) return null;
      return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
    };

    const hexToRgb = (hex) => {
      try {
        const h = hex.replace(/"|'/g, '').trim();
        const clean = h.startsWith('#') ? h.slice(1) : h;
        if (clean.length === 3) {
          return [parseInt(clean[0] + clean[0], 16), parseInt(clean[1] + clean[1], 16), parseInt(clean[2] + clean[2], 16)];
        }
        if (clean.length === 6) {
          return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)];
        }
      } catch (e) {
        return null;
      }
      return null;
    };

    const evaluate = () => {
      try {
        // 1) explicit CSS var --base
        const baseVar = getCssBase();
        if (baseVar) {
          // exact-match check for the two required hexes
          const low = baseVar.replace(/"|'/g, '').toLowerCase();
          if (low.includes('#f4ede4')) return setIsLightBg(true);
          if (low.includes('#111111')) return setIsLightBg(false);

          // try parse hex or rgb
          let rgb = null;
          if (low.includes('#')) rgb = hexToRgb(low);
          else rgb = parseRgb(low);

          if (rgb) {
            const [r, g, b] = rgb.map((v) => v / 255);
            const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            return setIsLightBg(L > 0.5);
          }
        }

        // 2) data-theme attribute (common pattern)
        const dt = document.documentElement.getAttribute('data-theme');
        if (dt) {
          return setIsLightBg(dt.toLowerCase().includes('light'));
        }

        // 3) computed body background
        const bodyBg = getComputedStyle(document.body).backgroundColor || '';
        if (bodyBg) {
          const rgb = parseRgb(bodyBg);
          if (rgb) {
            const [r, g, b] = rgb.map((v) => v / 255);
            const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            return setIsLightBg(L > 0.5);
          }
        }

        // 4) fallback to prefers-color-scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          return setIsLightBg(true);
        }

        // default: dark
        setIsLightBg(false);
      } catch (e) {
        setIsLightBg(false);
      }
    };

    evaluate();

    // observe changes to inline styles or attributes that may change palette
    const obs = new MutationObserver(() => evaluate());
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'data-theme'] });
    obs.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });

    const media = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const onMedia = () => evaluate();
    if (media && media.addEventListener) media.addEventListener('change', onMedia);

    return () => {
      obs.disconnect();
      if (media && media.removeEventListener) media.removeEventListener('change', onMedia);
    };
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
            data-palette={isLightBg ? 'light' : 'dark'}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`relative ml-auto flex h-[min(74vh,620px)] w-full max-w-[390px] flex-col overflow-hidden rounded-2xl shadow-[0_26px_70px_rgba(0,0,0,0.55)] ${isLightBg ? 'bg-[#F4EDE4] text-[#111111] border border-[#111111]/8' : 'bg-[#111111] text-[#F4EDE4] border border-white/5'}`}
          >
            <div className={`relative flex items-center justify-between border-b px-4 py-3.5 sm:px-5 ${isLightBg ? 'border-[#111111]/8 bg-[#F4EDE4]/90' : 'border-white/5 bg-[#222224]'}`}>
              <div className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isLightBg ? 'border-[#111111]/15 bg-[#F4EDE4]' : 'border-white/6 bg-[#141414]'}`}>
                  <RobotIcon className={`h-3.5 w-3.5 ${isLightBg ? 'text-[#111111]' : 'text-[#F4EDE4]'}`} />
                </div>
                <div className="flex items-center gap-2">
                  <p className={`text-[27px] font-semibold leading-none ${isLightBg ? 'text-[#111111]' : 'text-[#F4EDE4]'}`}>Jeje</p>
                  <span className={`rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] ${isLightBg ? 'border border-[#111111]/12 text-[#111111] bg-transparent' : 'border border-[#F4EDE4]/20 text-[#F4EDE4] bg-transparent'}`}>
                    AI ASSISTANT
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8b8b8d] transition-all hover:bg-black/20 hover:text-[#b7b7b9] active:scale-95 cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <>
              <div className={`relative flex-1 overflow-y-auto px-4 py-4 sm:px-5 ${isLightBg ? 'bg-[#F4EDE4]/90' : 'bg-[#161616]'}`}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[84%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                        {message.sender === 'bot' ? (
                          <div className="mb-1.5 flex items-center gap-2 pl-0.5">
                            <span className={`relative inline-flex h-5 w-5 items-center justify-center rounded-full ${isLightBg ? 'bg-[#111111]/90' : 'bg-[#F4EDE4]/10'}`}>
                              <RobotIcon className={`h-2.5 w-2.5 ${isLightBg ? 'text-[#F4EDE4]' : 'text-[#F4EDE4]'}`} />
                            </span>
                          </div>
                        ) : null}

                        <div className={`rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed shadow-[0_8px_22px_rgba(0,0,0,0.22)] ${message.sender === 'user' ? 'rounded-br-[9px] border border-white/6 bg-[#2a2a2d]' : 'rounded-bl-[9px] border border-white/6 bg-[#2a2a2d]'} ${isLightBg ? 'text-[#111111]' : 'text-[#e8e8e8]'}`}>
                          {message.text}
                        </div>

                        
                      </div>
                    </div>
                  ))}

                  {isSending && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[84%] flex-col items-start">
                                <div className="mb-1.5 flex items-center gap-2 pl-0.5">
                                <span className={`relative inline-flex h-5 w-5 items-center justify-center rounded-full ${isLightBg ? 'bg-[#111111]/90' : 'bg-[#F4EDE4]/10'}`}>
                                  <RobotIcon className={`h-2.5 w-2.5 ${isLightBg ? 'text-[#F4EDE4]' : 'text-[#F4EDE4]'}`} />
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
                          <style>{`
                            .dots .dot{display:inline-block;width:6px;height:6px;border-radius:9999px;margin-left:6px;animation:dotBounce 900ms infinite ease-in-out}
                            .dots .dot:nth-child(1){animation-delay:0s}
                            .dots .dot:nth-child(2){animation-delay:120ms}
                            .dots .dot:nth-child(3){animation-delay:240ms}
                            @keyframes dotBounce{0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
                          `}</style>
                        </div>
                      </div>
                    </div>
                  )}
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
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask anything about Jericho..."
                    className={`h-9 flex-1 bg-transparent px-3 text-[13px] placeholder:text-[#7b7b7d] outline-none ${isLightBg ? 'text-[#111111]' : 'text-[#d7d7d9]'}`}
                  />

                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!canSend}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-md shadow-sm transition-all hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${isLightBg ? 'bg-[#111111] text-[#F4EDE4]' : 'bg-[#F4EDE4] text-[#111111]'}`}
                    aria-label="Send message"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-center">
                  <span className="text-[8px] uppercase tracking-[0.28em] text-[#555557]">
                    POWERED BY AMAZON LEX
                  </span>
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
            className={`group ml-auto flex items-center gap-3 rounded-full px-4 py-3 text-[#e9e9ea] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all active:scale-95 cursor-pointer ${isLightBg ? 'border border-[#111111]/25 bg-[#F4EDE4] text-[#111111] hover:-translate-y-0.5 hover:border-[#111111]/45' : 'border border-[#F4EDE4]/25 bg-[#1b1b1d] text-[#F4EDE4] hover:-translate-y-0.5 hover:border-[#F4EDE4]/45'}`}
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-full border bg-[#121212] ${isLightBg ? 'border-[#111111]/30 text-[#111111] bg-[#F4EDE4]' : 'border-[#F4EDE4]/30 text-[#F4EDE4]'}`}>
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
