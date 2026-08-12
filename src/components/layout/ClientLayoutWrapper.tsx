"use client";
import React, { useEffect, useRef } from 'react';
import { useChat } from './ChatProvider';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
const ChatInterface = dynamic(() => import('./ChatInterface'), { ssr: false });

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isChatActive, setIsAtBottom } = useChat();
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    // Reset at bottom state on navigate
    setIsAtBottom(false);
  }, [pathname, setIsAtBottom]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Trigger when within 50px of the bottom
    const atBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
    setIsAtBottom(atBottom);
  };

  return (
    <div className="relative flex w-full h-screen overflow-hidden bg-bg">
      
      {/* Left Panel Placeholder for Flex Layout */}
      <div 
        className={`h-full flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isChatActive ? 'w-full md:w-[30%] z-10' : 'w-0'
        }`}
      >
        {/* We leave this empty because the actual ChatInterface floats on top and positions itself here */}
      </div>

      {/* Right Panel - Portfolio */}
      <div 
        id="portfolio-canvas"
        ref={scrollRef}
        onScroll={handleScroll}
        className={`h-full flex-shrink-0 bg-bg overflow-y-auto overflow-x-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isChatActive ? 'w-full md:w-[70%]' : 'w-full'
        }`}
      >
        <div className="w-full min-h-full transition-transform duration-700">
           {children}
        </div>
      </div>
      
      {/* The Global Chat Interface */}
      <ChatInterface />

    </div>
  );
}
