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
          className={`absolute top-[3px] left-[3px] w-[16px] h-[16px] rounded-full bg-text transition-transform duration-300 ${theme === 'light' ? 'translate-x-[20px]' : 'translate-x-0'}`}
        />
      </button>
    </nav>
  );
}
