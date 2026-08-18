import React, { useEffect, useState } from 'react';

interface VirtualKeyboardProps {
  // We can pass down the currently pressed key if needed, or handle it internally
}

const ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ['space']
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let key = e.key.toLowerCase();
      if (key === ' ') key = 'space';
      setPressedKeys((prev) => new Set(prev).add(key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      let key = e.key.toLowerCase();
      if (key === ' ') key = 'space';
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 mt-12">
      {ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-2">
          {row.map((key) => {
            const isPressed = pressedKeys.has(key);
            return (
              <div
                key={key}
                className={`
                  flex items-center justify-center rounded-lg font-mono text-sm transition-colors duration-100
                  ${key === 'space' ? 'w-64 h-10' : 'w-10 h-10'}
                  ${
                    isPressed
                      ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                      : 'bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-muted)]'
                  }
                `}
              >
                {key === 'space' ? 'SPACE' : key}
              </div>
            );
          })}
        </div>
      ))}
      <div className="flex justify-center gap-4 mt-6 text-xs font-mono text-[var(--color-muted)]">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-line)]">tab</span> restart
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-line)]">esc</span> close
        </div>
      </div>
    </div>
  );
};
