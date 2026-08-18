import React, { useMemo } from 'react';

interface WordDisplayProps {
  words: string[];
  typedText: string;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ words, typedText }) => {
  const typedWords = useMemo(() => typedText.split(' '), [typedText]);
  const currentWordIndex = typedText.length === 0 ? 0 : typedText.split(' ').length - 1;
  const isFinished = currentWordIndex >= words.length;

  return (
    <div className="text-2xl font-mono leading-[2.5] max-w-4xl mx-auto select-none text-justify" style={{ textAlignLast: 'center' }}>
      {words.map((word, wIdx) => {
        const isCurrentWord = wIdx === currentWordIndex;
        const isTypedWord = wIdx < currentWordIndex;
        const typedWord = typedWords[wIdx] || '';

        return (
          <React.Fragment key={wIdx}>
            <span className="relative inline-flex">
              {word.split('').map((char, cIdx) => {
                // Untyped styling (like the faint text in image)
                let colorClass = 'text-[var(--color-muted)] opacity-30'; 
                
                if (isTypedWord) {
                  const typedChar = typedWord[cIdx];
                  if (typedChar === char) {
                    colorClass = 'text-[var(--color-muted)] opacity-100'; // Correct
                  } else if (typedChar !== undefined) {
                    colorClass = 'text-red-500 opacity-100'; // Incorrect (red)
                  } else {
                    colorClass = 'text-red-500 opacity-100'; // Missed char in a typed word (red)
                  }
                } else if (isCurrentWord) {
                  const typedChar = typedWord[cIdx];
                  if (typedChar === char) {
                    colorClass = 'text-[var(--color-text)] opacity-100'; // Correctly typed so far (white/bright)
                  } else if (typedChar !== undefined) {
                    colorClass = 'text-red-500 bg-red-500/20 opacity-100'; // Incorrectly typed
                  }
                }

                // Rendering the cursor
                const showCursorHere = isCurrentWord && typedWord.length === cIdx;

                return (
                  <span key={cIdx} className="relative flex">
                    {showCursorHere && !isFinished && (
                      <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-text)] animate-pulse -ml-[1px]" />
                    )}
                    <span className={`transition-colors duration-75 ${colorClass}`}>
                      {char}
                    </span>
                  </span>
                );
              })}
              
              {/* Handle extra characters typed in the current word */}
              {isCurrentWord && typedWord.length > word.length && (
                 typedWord.slice(word.length).split('').map((char, extraIdx) => (
                   <span key={`extra-${extraIdx}`} className="relative flex">
                     {extraIdx === typedWord.length - word.length - 1 && !isFinished && (
                        // Cursor at the end of extra characters (not perfect logic but functional)
                        <span className="absolute right-0 top-0 bottom-0 w-[2px] bg-[var(--color-text)] animate-pulse -mr-[1px]" />
                     )}
                     <span className="text-red-500 bg-red-500/20 opacity-100">
                       {char}
                     </span>
                   </span>
                 ))
              )}
              
              {/* Cursor when space is expected (end of word) */}
              {isCurrentWord && typedWord.length === word.length && !isFinished && (
                  <span className="relative flex">
                    <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-text)] animate-pulse -ml-[1px]" />
                  </span>
              )}
            </span>
            {' '}
          </React.Fragment>
        );
      })}
    </div>
  );
};
