"use client";
import React from 'react';
import { useChat } from '../layout/ChatProvider';

export default function ChatPrompts() {
  const { setIsChatActive } = useChat();

  const handleOptionClick = (text: string) => {
    window.dispatchEvent(new CustomEvent('sendChatMessage', { detail: text }));
    setIsChatActive(true);
    
    const portfolioCanvas = document.getElementById('portfolio-canvas');
    if (portfolioCanvas) {
      portfolioCanvas.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-[80px] pb-[150px] md:pt-[110px] md:pb-[150px] min-h-[430px] flex flex-col justify-center items-start text-left" id="chat">
      <h2 className="text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-tight font-serif text-text mb-8">
        What would you like<br />
        to know about Jericho?
      </h2>
      <p className="text-[16px] md:text-[18px] text-muted max-w-[600px] leading-relaxed mb-12">
        I am an advanced digital consciousness trained exclusively on the
        portfolio, background, and capabilities of Jericho Varde.
      </p>

      <ul className="flex flex-col gap-6">
        {[
          "About Jericho Varde",
          "Education and background",
          "Skills and capabilities",
          "Connect and contact"
        ].map((option, idx) => (
          <li key={idx}>
            <button 
              onClick={() => handleOptionClick(option)}
              className="flex items-center gap-6 text-[18px] md:text-[20px] text-muted hover:text-text transition-colors duration-300 group text-left"
            >
              <span className="w-8 h-[1px] bg-line group-hover:bg-accent transition-colors duration-300"></span>
              {option}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
