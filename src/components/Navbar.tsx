"use client";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

import Image from "next/image";

export default function Navbar() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = theme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    if (!(document as any).startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add('theme-transitioning');

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
      if (newTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove('theme-transitioning');
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${radius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          pseudoElement: "::view-transition-new(root)",
        } as any
      );
    });
  };

  return (
    <nav className="sticky top-0 z-40 bg-[var(--color-bg)] max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0 pt-10 pb-4 flex justify-between items-center w-full transition-colors duration-300">
      <div className="font-mono font-medium text-text text-[16px] flex items-center gap-[10px]">
        <Image 
          src="/assets/vardz-logo-white.png" 
          alt="Vardz Logo" 
          width={20} 
          height={20} 
          style={{ filter: theme === 'light' ? 'invert(1)' : 'none' }}
        />
        Vardz
      </div>
      <button 
        onClick={toggleTheme}
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
