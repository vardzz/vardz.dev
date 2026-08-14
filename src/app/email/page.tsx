"use client";

import { useState } from "react";
import Link from "next/link";

export default function EmailPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      <main className="min-w-0 pb-[150px]">
        <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0 pt-[80px] md:pt-[110px]">
          
          <div className="mb-[40px] md:mb-[60px]">
            <h1 className="text-[32px] md:text-[32px] font-medium tracking-[-.04em] text-text">Email</h1>
          </div>

          <p className="text-soft text-[15px] leading-[1.8] max-w-[480px] mb-[40px]">
            I'll get back to you as soon as possible.
          </p>

          {status === "success" && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl mb-[40px] font-mono text-[14px]">
              Message sent successfully!
            </div>
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

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="group flex items-center gap-2 text-text hover:text-accent font-mono text-[13px] uppercase tracking-[.1em] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
              </button>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
}
