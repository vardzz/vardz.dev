import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StatsBar } from './StatsBar';
import { VirtualKeyboard } from './VirtualKeyboard';
import { WordDisplay } from './WordDisplay';

// A small sample list of words to generate random text
const WORD_LIST = [
  'without', 'go', 'play', 'few', 'this', 'consider', 'here', 'begin', 'open', 'there',
  'against', 'here', 'form', 'because', 'number', 'face', 'many', 'most', 'help', 'place',
  'hold', 'in', 'and', 'word', 'the', 'of', 'to', 'is', 'you', 'that', 'it', 'he', 'was',
  'for', 'on', 'are', 'as', 'with', 'his', 'they', 'I', 'at', 'be', 'this', 'have', 'from',
  'or', 'one', 'had', 'by', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can',
  'said', 'there', 'use', 'an', 'each', 'which', 'she', 'do', 'how', 'their', 'if', 'will',
  'up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would'
];

const generateWords = (count: number) => {
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
  }
  return words;
};

interface TypingTestProps {
  onClose: () => void;
}

export const TypingTest: React.FC<TypingTestProps> = ({ onClose }) => {
  const [words, setWords] = useState<string[]>([]);
  const [typedText, setTypedText] = useState('');
  const [status, setStatus] = useState<'idle' | 'typing' | 'finished'>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize words
  useEffect(() => {
    setWords(generateWords(30));
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'typing' && startTime !== null) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, startTime]);

  const calculateStats = () => {
    if (words.length === 0) return { wpm: 0, accuracy: 100 };
    
    const typedWords = typedText.split(' ');
    let correctChars = 0;
    let totalTypedChars = 0;

    for (let i = 0; i < typedWords.length; i++) {
      const typedWord = typedWords[i];
      const targetWord = words[i];
      if (!targetWord) break;

      // We only count characters typed
      for (let j = 0; j < typedWord.length; j++) {
        totalTypedChars++;
        if (typedWord[j] === targetWord[j]) {
          correctChars++;
        }
      }
      if (i < typedWords.length - 1) {
        // Count space as character typed
        totalTypedChars++;
        correctChars++; // Assume space is correct if we split
      }
    }

    const accuracy = totalTypedChars === 0 ? 100 : Math.round((correctChars / totalTypedChars) * 100);
    
    // WPM: (correct characters / 5) / (time in minutes)
    const minutes = timeElapsed === 0 ? (1 / 60) : timeElapsed / 60; // Avoid Infinity on 0s
    const wpm = Math.round((correctChars / 5) / minutes);

    return { wpm, accuracy };
  };

  const { wpm, accuracy } = calculateStats();

  const handleRestart = useCallback(() => {
    setWords(generateWords(30));
    setTypedText('');
    setStatus('idle');
    setStartTime(null);
    setTimeElapsed(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow default behavior for Ctrl/Alt/Meta combinations except what we explicitly need
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      
      if (e.key === 'Tab') {
        e.preventDefault();
        handleRestart();
        return;
      }
      
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (status === 'finished') return;

      if (e.key === 'Backspace') {
        setTypedText((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key === ' ') {
        if (status === 'idle') {
          setStatus('typing');
          setStartTime(Date.now());
        }
        
        const currentWordIndex = typedText.split(' ').length - 1;
        if (currentWordIndex >= words.length - 1) {
          setStatus('finished');
          return;
        }

        setTypedText((prev) => prev + e.key);
        return;
      }

      if (e.key.length === 1) { // Normal character
        if (status === 'idle') {
          setStatus('typing');
          setStartTime(Date.now());
        }
        
        const newTypedText = typedText + e.key;
        setTypedText(newTypedText);

        // Check if finished immediately on the last character
        const newTypedWords = newTypedText.split(' ');
        const newCurrentWordIndex = newTypedWords.length - 1;
        
        if (newCurrentWordIndex >= words.length - 1) {
          const lastWordTyped = newTypedWords[newCurrentWordIndex];
          const lastWordTarget = words[words.length - 1];
          
          if (lastWordTyped === lastWordTarget) {
            setStatus('finished');
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [status, words, handleRestart, onClose, typedText]);

  if (status === 'finished') {
    const rawWpm = timeElapsed === 0 ? 0 : Math.round(((typedText.length / 5) / (timeElapsed / 60)));
    return (
      <div 
        ref={containerRef}
        className="flex flex-col items-center justify-center min-h-[60vh] w-full animate-page-enter"
        tabIndex={0}
      >
        <div className="flex justify-center gap-4 mb-16 text-xs font-mono text-[var(--color-muted)]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-line)]">tab</span> restart
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-line)]">esc</span> close
          </div>
        </div>

        <div className="flex flex-col items-center mb-12">
          <span className="text-8xl font-bold font-mono text-[var(--color-text)] tracking-tighter">{wpm}</span>
          <span className="text-xs uppercase tracking-widest text-[var(--color-muted)] mt-2 font-mono">WORDS PER MINUTE</span>
        </div>

        <div className="flex justify-center gap-12 mb-12 font-mono text-[var(--color-text)]">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{accuracy}<span className="text-xl text-[var(--color-muted)]">%</span></span>
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mt-1">ACCURACY</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{rawWpm}</span>
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mt-1">RAW</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{timeElapsed}<span className="text-xl text-[var(--color-muted)]">s</span></span>
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mt-1">TIME</span>
          </div>
        </div>

        <div className="flex items-center justify-center text-sm font-mono text-[var(--color-muted)] mb-8">
          you didn't beat vardz · 140 wpm
        </div>

        <button 
          onClick={handleRestart}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-sm font-medium hover:bg-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          try again
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-[60vh] w-full animate-page-enter"
      tabIndex={0} // Allows capturing focus if needed, though we listen globally here
    >
      <StatsBar 
        wpm={status === 'idle' ? 0 : wpm} 
        accuracy={status === 'idle' ? 100 : accuracy} 
        timeElapsed={timeElapsed} 
      />
      
      <div className="my-12 px-8 w-full max-w-5xl overflow-hidden">
        <WordDisplay words={words} typedText={typedText} />
      </div>

      <VirtualKeyboard />
    </div>
  );
};
