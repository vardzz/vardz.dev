'use client';

import React, { useState, useEffect } from 'react';
import { TypingTest } from './TypingTest';

export const TypingTestModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Trigger on Alt + k
      if (e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg)]/70 backdrop-blur-lg text-[var(--color-text)]">
      <div className="w-full h-full p-8 flex items-center justify-center relative">
        <TypingTest onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
};
