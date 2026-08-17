"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

export default function EmailPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setSubject("");
        setContent("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send email.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <main className="min-w-0 pb-[100px]">
        <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0">
          
          <div className="mb-[40px] md:mb-[60px]">
            <h1 className="text-[32px] md:text-[32px] font-medium tracking-[-.04em] text-text">Email</h1>
            <p className="text-muted text-[15px] mt-[12px] max-w-[480px]">
              I'll get back to you as soon as possible.
            </p>
          </div>

          {isMounted && status === "success" && createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-md bg-bg/60 animate-page-enter">
              <div className="bg-surface border border-line p-6 md:p-8 rounded-2xl shadow-xl max-w-[400px] w-full text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-[20px] font-medium text-text mb-2">Message Sent</h3>
                <p className="text-muted text-[15px] mb-6">
                  Thank you for reaching out! I'll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="w-full bg-text text-bg hover:bg-text/90 font-medium py-3 rounded-xl transition-colors text-[14px] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>,
            document.body
          )}

          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-[40px] font-mono text-[14px]">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-muted font-mono text-[11px] tracking-[.1em] uppercase">Your Email</label>
              <input 
                type="email" 
                id="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                autoComplete="off"
                className="bg-surface border border-line rounded-xl px-4 py-3 text-[15px] text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted/50"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="subject" className="text-muted font-mono text-[11px] tracking-[.1em] uppercase">Subject</label>
              <input 
                type="text" 
                id="subject" 
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What's this about?"
                autoComplete="off"
                className="bg-surface border border-line rounded-xl px-4 py-3 text-[15px] text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted/50"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="content" className="text-muted font-mono text-[11px] tracking-[.1em] uppercase">Message</label>
              <textarea 
                id="content" 
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Your message here..."
                className="bg-surface border border-line rounded-xl px-4 py-3 text-[15px] text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted/50 resize-none"
              />
            </div>

          <button 
            type="submit" 
            disabled={status === "loading"}
            className="mt-4 bg-text text-bg hover:bg-text/90 font-medium py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[15px] cursor-pointer"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          
          <p className="text-center text-muted text-[13px] mt-2">
            Note: if you want to email me personally, send me an email at <a href="mailto:vardejericho@gmail.com" className="text-text hover:underline transition-all">vardejericho@gmail.com</a>
          </p>
          </form>

        </div>
      </main>
    </div>
  );
}
