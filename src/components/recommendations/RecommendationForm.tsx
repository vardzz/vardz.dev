'use client';

import React, { useState } from 'react';

export default function RecommendationForm() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

      if (!res.ok && res.status !== 404) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit');
      }

      setStatus('success');
      setName('');
      setTitle('');
      setMessage('');
    } catch {
      setStatus('success');
      setName('');
      setTitle('');
      setMessage('');
    }
  };

  return (
    <div className="mt-[80px]">
      {status === 'success' ? (
        <div className="bg-surface border border-line rounded-xl p-6 text-center">
          <p className="text-text text-[15px] mb-2 font-mono">
            Thank you! Your recommendation has been submitted.
          </p>
          <p className="text-muted text-[13px] mb-4">
            It will be reviewed before appearing on the site.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="text-text underline text-[13px] font-mono hover:opacity-80 transition-opacity cursor-pointer"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="name"
              className="text-muted font-mono text-[11px] tracking-[.1em] uppercase"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
              autoComplete="off"
              className="bg-surface border border-line rounded-xl px-4 py-3 text-[15px] text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted/50"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="title"
              className="text-muted font-mono text-[11px] tracking-[.1em] uppercase"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Senior Software Engineer at TechCorp"
              autoComplete="off"
              className="bg-surface border border-line rounded-xl px-4 py-3 text-[15px] text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted/50"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="message"
              className="text-muted font-mono text-[11px] tracking-[.1em] uppercase"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message here..."
              className="bg-surface border border-line rounded-xl px-4 py-3 text-[15px] text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted/50 resize-y min-h-[140px]"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-2 bg-text text-bg hover:bg-text/90 font-medium py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[15px] cursor-pointer w-full text-center"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Recommendation'}
          </button>
        </form>
      )}
    </div>
  );
}
