"use client";
import React, { useState, useRef, MouseEvent } from 'react';

interface CertificateCardProps {
  title: string;
  provider: string;
  icon: React.ReactNode;
  verifyLink: string;
  rotation?: string;
  translateY?: string;
  zIndex?: number;
}

export default function CertificateCard({ 
  title, 
  provider, 
  icon, 
  verifyLink, 
  rotation = "rotate-0", 
  translateY = "translate-y-0",
  zIndex = 1 
}: CertificateCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotationState, setRotationState] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate cursor position relative to the card
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    
    // Percentage relative to card dimensions (0 to 100)
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;
    
    // Calculate rotation (-15 to 15 degrees) for dramatic 3D effect
    const rotateY = ((x / rect.width) - 0.5) * 30; 
    const rotateX = ((y / rect.height) - 0.5) * -30;
    
    setRotationState({ x: rotateX, y: rotateY });
    setGlarePosition({ x: xPct, y: yPct, opacity: 1 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotationState({ x: 0, y: 0 });
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <a 
      ref={cardRef}
      href={verifyLink} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`group relative flex flex-col items-center p-[32px] rounded-[20px] border border-line bg-[#151413] transition-all duration-300 w-[260px] h-[300px] flex-shrink-0 cursor-pointer shadow-xl ${!isHovered ? `${rotation} ${translateY}` : ''}`}
      style={{
        zIndex: isHovered ? 50 : zIndex,
        transform: isHovered ? `perspective(1000px) rotateX(${rotationState.x}deg) rotateY(${rotationState.y}deg) scale3d(1.05, 1.05, 1.05)` : undefined,
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Holographic Glare Layer */}
      <div 
        className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-300 overflow-hidden"
        style={{
          opacity: glarePosition.opacity,
          background: `
            radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%),
            linear-gradient(${glarePosition.x}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0) 80%)
          `,
          mixBlendMode: 'screen',
          zIndex: 10
        }}
      />
      
      {/* Icon Container (pops out slightly due to translateZ) */}
      <div 
        className="w-[56px] h-[56px] rounded-[16px] bg-accent/[0.04] border border-line/50 flex items-center justify-center mb-[32px] transition-transform duration-300 bg-[#1A1918]"
        style={{ transform: isHovered ? 'translateZ(60px)' : 'translateZ(0)' }}
      >
        {icon}
      </div>
      
      {/* Title & Provider */}
      <div 
        className="text-center mb-[auto] flex flex-col items-center px-[8px] transition-transform duration-300"
        style={{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)' }}
      >
        <h3 className="text-[14px] md:text-[15px] font-semibold tracking-tight text-text mb-[8px] leading-[1.3]">
          {title}
        </h3>
        <p className="text-muted font-mono text-[10px] md:text-[11px] uppercase tracking-widest">
          {provider}
        </p>
      </div>

      {/* Verify Link */}
      <div 
        className="mt-[28px] text-muted font-mono text-[11px] md:text-[12px] tracking-widest group-hover:text-text transition-all duration-300 flex items-center gap-[6px]"
        style={{ transform: isHovered ? 'translateZ(50px)' : 'translateZ(0)' }}
      >
        <span className="opacity-40">{"<"}</span>
        VERIFY
        <span className="opacity-40">{">"}</span>
      </div>
    </a>
  );
}
