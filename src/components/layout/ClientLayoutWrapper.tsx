"use client";
import React from 'react';
import { useChat } from './ChatProvider';
import dynamic from 'next/dynamic';
const ChatInterface = dynamic(() => import('./ChatInterface'), { ssr: false });

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isChatActive } = useChat();

  return (
    <div className="relative flex w-full h-screen overflow-hidden bg-bg">
      
      {/* Left Panel Placeholder for Flex Layout */}
      <div 
        className={`h-full flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isChatActive ? 'w-full md:w-[30%] border-r border-line/5 shadow-[4px_0_24px_rgba(0,0,0,0.1)] z-10' : 'w-0 border-r-0'
        }`}
      >
        {/* We leave this empty because the actual ChatInterface floats on top and positions itself here */}
      </div>

      {/* Right Panel - Portfolio */}
      <div 
        id="portfolio-canvas"
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
