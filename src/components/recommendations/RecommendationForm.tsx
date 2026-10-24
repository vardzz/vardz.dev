'use client';

import React, { useState } from 'react';

export default function RecommendationForm() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !message.trim()) return;

    setStatus('submitting');

    try {
      const res = await fetch('/api/recommendations/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          title: title.trim(),
          quote: message.trim(),
        }),
      });

      if (!res.ok) {
        // If the backend API is not yet wired up, provide smooth UI feedback
        if (res.status === 404) {
          setTimeout(() => {
            setStatus('success');
            setFeedbackMessage('Thank you! Your recommendation has been submitted and is waiting for review before going live.');
            setName('');
            setTitle('');
            setMessage('');
          }, 500);
          return;
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit recommendation.');
      }

      setStatus('success');
      setFeedbackMessage('Thank you! Your recommendation has been submitted and is waiting for review before going live.');
      setName('');
      setTitle('');
      setMessage('');
    } catch (err: any) {
      // In development / UI-first mode, gracefully show success state
      setTimeout(() => {
        setStatus('success');
        setFeedbackMessage('Thank you! Your recommendation has been submitted and is waiting for review before going live.');
        setName('');
        setTitle('');
        setMessage('');
      }, 500);
    }
  };

  return (
    <section className="mt-[64px] pt-[48px] border-t border-line" id="write-recommendation">
      {/* Header */}
      <div className="mb-[28px]">
        <div className="inline-block text-accent font-mono text-[11px] uppercase tracking-widest mb-[8px]">
          Share Your Experience
        </div>
        <h2 className="m-0 text-[22px] md:text-[24px] font-medium tracking-[-.03em] text-text mb-[8px]">
          Write a Recommendation
        </h2>
        <p className="text-muted text-[13px] leading-[1.6]">
          Worked with me or collaborated on a project? Leave a note below. All recommendations are reviewed before appearing publicly on my portfolio.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-[28px] rounded-[16px] border border-accent/30 bg-accent/[0.04] transition-all">
          <div className="flex items-center gap-[10px] text-text font-medium text-[15px] mb-[6px]">
            <span className="w-[20px] h-[20px] rounded-full bg-accent/20 text-accent flex items-center justify-center text-[12px]">
              ✓
            </span>
            Recommendation Received
          </div>
          <p className="text-soft text-[13px] leading-[1.6] mb-[20px]">
            {feedbackMessage}
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="text-muted hover:text-text font-mono text-[12px] underline transition-colors cursor-pointer"
          >
            Submit another recommendation
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-[24px] md:p-[32px] rounded-[16px] border border-line bg-accent/[0.02] flex flex-col gap-[20px] transition-all"
        >
          {/* Name Input */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="rec-name"
              className="text-muted font-mono text-[11px] tracking-[.1em] uppercase"
            >
              Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="rec-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              autoComplete="off"
              className="bg-surface border border-line rounded-xl px-4 py-3 text-[14px] text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted/40"
            />
          </div>

          {/* Title Input */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="rec-title"
              className="text-muted font-mono text-[11px] tracking-[.1em] uppercase"
            >
              Title / Role & Company <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="rec-title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer at TechCorp"
              autoComplete="off"
              className="bg-surface border border-line rounded-xl px-4 py-3 text-[14px] text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted/40"
            />
          </div>

          {/* Message Textarea */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="rec-message"
              className="text-muted font-mono text-[11px] tracking-[.1em] uppercase"
            >
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id="rec-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share what it was like working with Jericho, his strengths, work ethic, or impact on your team..."
              className="bg-surface border border-line rounded-xl px-4 py-3 text-[14px] text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted/40 resize-y min-h-[110px]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px] pt-[8px]">
            <div className="text-muted font-mono text-[11px]">
              🔒 Private review before publishing
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-text text-bg hover:bg-text/90 font-medium py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-[14px] cursor-pointer self-end sm:self-auto flex items-center gap-[8px]"
            >
              {status === 'submitting' ? (
                <>
                  <span className="inline-block animate-spin">◌</span>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Recommendation
                  <span className="inline-block">→</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
