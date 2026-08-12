"use client";
import React, { useState, useEffect } from 'react';
import { useChat } from './ChatProvider';

const GHOST_TEXTS = [
  "Ask about projects, experience, stack...",
  "Show me Vardz's latest projects...",
  "What tech stack does Vardz use?",
  "Tell me about your background..."
];

export default function ChatInterface() {
  const { isChatActive, setIsChatActive, chatHistory, addMessage } = useChat();
  const [placeholder, setPlaceholder] = useState("");
  const [ghostIndex, setGhostIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Ghost Typist Effect (only when not active)
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

  const displayPlaceholder = isChatActive ? "Ask a follow up..." : placeholder;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    if (!isChatActive) setIsChatActive(true);
    addMessage('user', inputValue);
    setInputValue("");
    
    // Mock AI response for UI demonstration
    setTimeout(() => {
      addMessage('ai', "I'm navigating you to that section now. Let me know if you need anything else!");
    }, 1000);
  };

  const handleChipClick = (text: string) => {
    if (!isChatActive) setIsChatActive(true);
    addMessage('user', text);
    setTimeout(() => {
      addMessage('ai', "Here is what you asked for! I've updated the panel on the right.");
    }, 1000);
  };

  return (
    <div 
      className={`fixed top-0 left-0 h-screen z-50 flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isChatActive 
          ? 'w-full md:w-[30%] bg-transparent justify-end pb-12' 
          : 'w-full bg-transparent pointer-events-none justify-end pb-[24px]'
      }`}
    >
      
      {/* Close Button (Visible only when active) */}
      {isChatActive && (
        <div className="absolute top-12 w-full max-w-[640px] px-8 flex justify-start z-[100] pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              setIsChatActive(false);
            }}
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

      {/* Chat History Container */}
      <div className={`w-full max-w-[640px] flex-1 overflow-y-auto px-8 pt-24 pb-12 flex flex-col gap-12 transition-all duration-700 delay-100 ${isChatActive ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 hidden translate-y-10'}`}>
        
        {chatHistory.map((msg, idx) => (
          <div 
            key={idx} 
            className={`w-full flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'user' ? (
              <h2 className="text-[28px] md:text-[32px] font-bold font-mono tracking-tight text-text">
                {msg.content}
              </h2>
            ) : (
              <p className="text-[14px] md:text-[15px] leading-relaxed font-mono text-muted max-w-[90%] md:max-w-[85%]">
                {msg.content}
              </p>
            )}
          </div>
        ))}

      </div>

      {/* Input Area */}
      <div className={`w-[min(720px,calc(100%-32px))] transition-all duration-700 pointer-events-auto ${isChatActive ? 'max-w-[640px]' : ''}`}>
        
        <form 
          onSubmit={handleSubmit}
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
            className="shrink-0 ml-[8px] w-[36px] h-[36px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-full md:rounded-[16px] bg-text text-bg hover:scale-105 transition-transform duration-300 shadow-md"
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
