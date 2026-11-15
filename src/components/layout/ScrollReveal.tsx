"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  distance?: number; // Distance to translate in pixels
  direction?: "up" | "down" | "left" | "right" | "none";
  blur?: number; // Blur amount in pixels
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  as?: React.ElementType;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 750,
  distance = 24,
  direction = "up",
  blur = 4,
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  once = true,
  as: Component = "div",
  style,
  ...rest
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const domRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Respect reduced motion settings
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      setIsDone(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      setIsDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
            setIsDone(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  // Clean up transform/filter once transition is finished to avoid stacking context issues
  useEffect(() => {
    if (isVisible && !isDone) {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, duration + delay + 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isDone, duration, delay]);

  // Compute direction transforms
  let initialTransform = "translate3d(0, 0, 0)";
  if (direction === "up") initialTransform = `translate3d(0, ${distance}px, 0)`;
  else if (direction === "down") initialTransform = `translate3d(0, -${distance}px, 0)`;
  else if (direction === "left") initialTransform = `translate3d(${distance}px, 0, 0)`;
  else if (direction === "right") initialTransform = `translate3d(-${distance}px, 0, 0)`;

  const dynamicStyle: React.CSSProperties = isDone
    ? {
        ...style,
        opacity: 1,
      }
    : {
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : initialTransform,
        filter: blur > 0 ? (isVisible ? "blur(0px)" : `blur(${blur}px)`) : undefined,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? "opacity, transform, filter" : "auto",
      };

  return (
    <Component
      ref={domRef as any}
      className={`scroll-reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={dynamicStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}
