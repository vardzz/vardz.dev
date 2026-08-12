"use client";
import { useState, useEffect } from 'react';
import ChatSidebar from './ChatSidebar';

interface ChatboxProps {
  isVisible: boolean;
}

const GHOST_TEXTS = [
  "Ask about projects, experience, stack...",
  "Show me Vardz's latest projects...",
  "What tech stack does Vardz use?",
  "Tell me about your background..."
];

export default function Chatbox({ isVisible }: ChatboxProps) {
  const [placeholder, setPlaceholder] = useState("");
  const [ghostIndex, setGhostIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Ghost Typist Effect
  useEffect(() => {
    const currentText = GHOST_TEXTS[ghostIndex];
    let typingSpeed = isDeleting ? 30 : 60;
    
    if (!isDeleting && placeholder === currentText) {
      typingSpeed = 2000; // Pause at the end before deleting
      setIsDeleting(true);
    } else if (isDeleting && placeholder === "") {
      setIsDeleting(false);
      setGhostIndex((prev) => (prev + 1) % GHOST_TEXTS.length);
      typingSpeed = 500; // Pause before typing next word
    }

    const timeout = setTimeout(() => {
      setPlaceholder(
        currentText.substring(0, placeholder.length + (isDeleting ? -1 : 1))
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [placeholder, isDeleting, ghostIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSidebarOpen(true);
    // In a real app, you'd pass inputValue to the sidebar or a context here.
  };

  const handleChipClick = (text: string) => {
    setInputValue(text);
    // Optional: automatically submit when a chip is clicked
    setTimeout(() => setIsSidebarOpen(true), 150);
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit}
        className={`fixed bottom-[18px] md:bottom-[24px] left-1/2 -translate-x-1/2 z-30 w-[min(720px,calc(100%-32px))] transition-all duration-700 ease-out ${isVisible && !isSidebarOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-[120%] opacity-0 pointer-events-none'}`}
      >
        {/* Suggestion Chips */}
        <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar pb-1 px-1 opacity-90 hover:opacity-100 transition-opacity">
          <button 
            type="button"
            onClick={() => handleChipClick("Show me the projects")}
            className="text-[12px] bg-bg/80 backdrop-blur-md border border-line text-muted rounded-full px-3 py-1.5 whitespace-nowrap hover:border-accent hover:text-accent transition-colors shadow-sm"
          >
            Show me the projects
          </button>
          <button 
            type="button"
            onClick={() => handleChipClick("Tell me about your background")}
            className="text-[12px] bg-bg/80 backdrop-blur-md border border-line text-muted rounded-full px-3 py-1.5 whitespace-nowrap hover:border-accent hover:text-accent transition-colors shadow-sm"
          >
            Tell me about your background
          </button>
        </div>

        <div className="relative flex items-center bg-surface border border-line shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] rounded-[24px] p-[8px] pl-[16px] focus-within:border-accent focus-within:ring-[3px] focus-within:ring-accent-dim transition-all duration-300 group">
          <input 
            type="text" 
            autoComplete="off" 
            aria-label="Ask the portfolio a question" 
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-transparent border-0 outline-0 text-text py-[12px] md:py-[14px] text-[14px] md:text-[15px] placeholder-muted"
          />
          <button 
            type="submit" 
            className="shrink-0 ml-[8px] w-[36px] h-[36px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-full md:rounded-[16px] bg-text text-bg hover:scale-105 transition-transform duration-300"
            aria-label="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[-1px]">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>
      </form>

      {/* Render the Sidebar overlay */}
      <ChatSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
