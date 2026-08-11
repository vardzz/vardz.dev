"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  return (
    <nav className="sticky top-0 z-40 bg-[var(--color-bg)] max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0 pt-10 pb-4 flex justify-between items-center w-full transition-colors duration-300">
      <div className="font-mono font-medium text-text text-[16px]">Vardz</div>
      <button 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="w-[44px] h-[24px] rounded-full border border-line relative cursor-pointer transition-colors hover:border-text focus:outline-none"
        aria-label="Toggle Theme"
      >
        <span 
          className={`absolute top-[3px] left-[3px] w-[16px] h-[16px] rounded-full bg-text transition-transform duration-300 flex items-center justify-center text-bg ${theme === 'light' ? 'translate-x-[20px]' : 'translate-x-0'}`}
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          )}
        </span>
      </button>
    </nav>
  );
}
