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
          ? 'w-full md:w-1/2 bg-surface/40 backdrop-blur-2xl border-r border-line/20 shadow-2xl justify-end pb-8' 
          : 'w-full bg-transparent pointer-events-none justify-end pb-[24px]'
      }`}
    >
      
      {/* Top Header for Chat (Only visible when active) */}
      <div className={`absolute top-0 left-0 w-full p-8 flex items-center justify-between transition-opacity duration-700 delay-200 pointer-events-auto ${isChatActive ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <div className="flex items-center gap-3">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="font-mono text-[11px] tracking-widest text-muted uppercase">Vardz AI Core</span>
        </div>
        <button 
          onClick={() => setIsChatActive(false)}
          className="text-muted hover:text-text transition-colors text-[12px] font-mono border border-line rounded-full px-4 py-2 bg-bg/50 backdrop-blur-md"
        >
          Close [Esc]
        </button>
      </div>

      {/* Chat History Container */}
      <div className={`w-full max-w-[600px] flex-1 overflow-y-auto px-6 pt-24 pb-4 flex flex-col gap-6 transition-all duration-700 delay-100 no-scrollbar ${isChatActive ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 hidden translate-y-10'}`}>
        
        {chatHistory.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 text-muted">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <p className="font-mono text-sm text-muted uppercase tracking-widest">Awaiting Prompt</p>
          </div>
        )}

        {chatHistory.map((msg, idx) => (
          <div 
            key={idx} 
            className={`px-5 py-4 text-[14px] leading-relaxed max-w-[85%] rounded-[24px] ${
              msg.role === 'user' 
                ? 'self-end bg-text text-bg rounded-br-sm shadow-md' 
                : 'self-start bg-bg/60 backdrop-blur-md border border-line/20 text-text rounded-bl-sm shadow-sm'
            }`}
          >
            {msg.content}
          </div>
        ))}

      </div>

      {/* Input Area */}
      <div className={`w-[min(720px,calc(100%-32px))] transition-all duration-700 pointer-events-auto ${isChatActive ? 'max-w-[600px]' : ''}`}>
        
        {/* Suggestion Chips */}
        <div className={`flex justify-center gap-2 mb-4 overflow-x-auto no-scrollbar pb-1 px-1 transition-all duration-500 ${isChatActive ? 'opacity-0 hidden' : 'opacity-90 hover:opacity-100'}`}>
          <button 
            type="button"
            onClick={() => handleChipClick("Show me the projects")}
            className="text-[12px] bg-bg/80 backdrop-blur-md border border-line text-muted rounded-full px-4 py-2 whitespace-nowrap hover:border-accent hover:text-accent transition-colors shadow-sm"
          >
            Show me the projects
          </button>
          <button 
            type="button"
            onClick={() => handleChipClick("Tell me about your background")}
            className="text-[12px] bg-bg/80 backdrop-blur-md border border-line text-muted rounded-full px-4 py-2 whitespace-nowrap hover:border-accent hover:text-accent transition-colors shadow-sm"
          >
            Tell me about your background
          </button>
        </div>

        <form 
          onSubmit={handleSubmit}
          className={`relative flex items-center bg-surface border shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] rounded-[24px] p-[8px] pl-[16px] focus-within:border-accent focus-within:ring-[3px] focus-within:ring-accent-dim transition-all duration-300 group ${isChatActive ? 'border-line/20 bg-bg/80 backdrop-blur-xl' : 'border-line'}`}
        >
          <input 
            type="text" 
            autoComplete="off" 
            aria-label="Ask the AI a question" 
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-transparent border-0 outline-0 text-text py-[12px] md:py-[14px] text-[14px] md:text-[15px] placeholder-muted"
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
