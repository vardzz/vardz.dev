interface ChatboxProps {
  isVisible: boolean;
}

export default function Chatbox({ isVisible }: ChatboxProps) {
  return (
    <form className={`fixed bottom-[18px] md:bottom-[24px] left-1/2 -translate-x-1/2 z-30 w-[min(720px,calc(100%-32px))] transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-[120%] opacity-0 pointer-events-none'}`}>
      <div className="relative flex items-center bg-surface border border-line shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] rounded-[24px] p-[8px] pl-[16px] focus-within:border-accent focus-within:ring-[3px] focus-within:ring-accent-dim transition-all duration-300 group">
        <input 
          type="text" 
          autoComplete="off" 
          aria-label="Ask the portfolio a question" 
          placeholder="Ask about projects, experience, stack…" 
          className="w-full bg-transparent border-0 outline-0 text-text py-[12px] md:py-[14px] text-[14px] md:text-[15px] placeholder-muted"
        />
        <button 
          type="submit" 
          className="shrink-0 ml-[8px] w-[36px] h-[36px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-full md:rounded-[16px] bg-text text-bg hover:scale-105 transition-transform duration-300"
          aria-label="Send message"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[-1px]">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>
      </div>
    </form>
  );
}
