import React from 'react';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-bg/50 backdrop-blur-sm z-40 transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-surface border-l border-line shadow-2xl z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-line">
          <h2 className="font-mono text-sm tracking-widest text-text uppercase">Vardz AI</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-line/50 hover:bg-line text-text transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
          <div className="self-end bg-accent/10 text-text px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm">
            Show me the projects
          </div>
          
          <div className="self-start bg-bg border border-line text-muted px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm flex gap-3">
            <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-bg mt-0.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
              </svg>
            </span>
            <span>
              <p className="mb-2 text-text">Navigating to /projects...</p>
              Here are my top projects! I highly recommend checking out <strong className="text-text">Horizon AI</strong>, a full-stack SaaS platform built with Next.js and AWS.
            </span>
          </div>
        </div>
        
        <div className="p-4 border-t border-line">
          <form className="relative flex items-center bg-bg border border-line rounded-[16px] p-[6px] pl-[14px] focus-within:border-accent focus-within:ring-[2px] focus-within:ring-accent-dim transition-all">
            <input 
              type="text" 
              placeholder="Ask a follow up..."
              className="w-full bg-transparent border-0 outline-0 text-text py-[8px] text-[14px] placeholder-muted"
            />
            <button 
              type="button" 
              className="shrink-0 ml-[8px] w-[32px] h-[32px] flex items-center justify-center rounded-full bg-text text-bg hover:scale-105 transition-transform"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[-1px]">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
