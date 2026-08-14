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
    <div className="min-h-screen bg-bg flex flex-col items-center pt-[100px] px-6 pb-20">
      <div className="w-full max-w-[600px]">
        <Link href="/" className="text-muted hover:text-accent transition-colors font-mono text-[13px] mb-8 inline-block">
          ← back to portfolio
        </Link>
        
        <h1 className="text-[clamp(32px,5vw,48px)] font-serif text-text tracking-tight mb-2">Send me an email.</h1>
        <p className="text-muted text-[15px] mb-10">I'll get back to you as soon as possible.</p>

        {status === "success" && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl mb-8 font-mono text-[14px]">
            Message sent successfully!
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 font-mono text-[14px]">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-text font-mono text-[12px] uppercase tracking-widest">Your Email</label>
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

          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-text font-mono text-[12px] uppercase tracking-widest">Subject</label>
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

          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-text font-mono text-[12px] uppercase tracking-widest">Message</label>
            <textarea 
              id="content" 
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your message here..."
              className="bg-surface border border-line rounded-xl px-4 py-3 text-[15px] text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted/50 resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={status === "loading"}
            className="mt-4 bg-text text-bg hover:bg-text/90 font-medium py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[15px]"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
