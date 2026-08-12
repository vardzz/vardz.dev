import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Experience | Vardz',
  description: 'Professional experience and work history.',
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-zinc-800 selection:text-zinc-100 pb-24">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-900/50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-300">←</span> 
            Back
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-16 md:pt-24">
        {/* Header Section */}
        <header className="mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-100 tracking-tight mb-6">
            experience
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            Building across AI engineering, frontend development, and data analytics — driving growth and scalable solutions.
          </p>
        </header>

        {/* Timeline Section */}
        <div className="relative border-l border-zinc-800/60 ml-4 md:ml-6 space-y-20">
          
          {/* Experience 1: Flyrank AI */}
          <div className="relative group pl-8 md:pl-12 hover:-translate-y-1 transition-transform duration-500">
            {/* Timeline Icon */}
            <div className="absolute -left-[28px] top-0 bg-[#0a0a0a] py-2">
              <div className="w-14 h-14 rounded-2xl border border-zinc-800 bg-zinc-900/40 flex items-center justify-center text-zinc-200 font-medium text-sm shadow-sm group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm">
                FA
              </div>
            </div>

            <div className="flex flex-col gap-5 pt-2">
              {/* Header */}
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors duration-300">
                  Flyrank AI
                </h2>
                <div className="text-sm text-zinc-500 mt-1.5 font-mono tracking-wide">Full-time</div>
              </div>

              {/* Role Info */}
              <div className="relative">
                <div className="absolute -left-[37px] md:-left-[53px] top-[10px] w-2 h-2 rounded-full border border-zinc-700 bg-zinc-800 group-hover:bg-blue-400 group-hover:border-blue-400 transition-colors duration-300" />
                <h3 className="text-lg md:text-xl text-zinc-200 font-medium">Frontend AI Engineer</h3>
                <div className="text-xs font-mono text-zinc-500 mt-2 uppercase tracking-wider">
                  Jun 2026 - Present
                </div>
              </div>

              {/* Description */}
              <div className="text-sm md:text-base text-zinc-400 leading-relaxed space-y-5">
                <p>
                  Leveraged AI-assisted development workflows and modern web technologies to design, build, and optimize high-performance, client-ready frontend interfaces within FlyRank’s organic growth and SEO automation platform. Combined robust engineering principles with AI fluency to accelerate the product delivery lifecycle.
                </p>
                <ul className="space-y-3 list-none">
                  <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-zinc-700 before:rounded-full group-hover:before:bg-blue-500/50 before:transition-colors">
                    <strong className="text-zinc-200 font-medium">AI-Powered Pair Programming:</strong> Utilized advanced LLMs and AI coding tools as pair-programmers to rapidly scaffold, refactor, and deploy responsive web pages, storefront interfaces, and personalized user components.
                  </li>
                  <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-zinc-700 before:rounded-full group-hover:before:bg-blue-500/50 before:transition-colors">
                    <strong className="text-zinc-200 font-medium">Modern Frontend Engineering:</strong> Developed scalable, clean, and highly interactive user interfaces using modern tech stacks (including React, Tailwind CSS, and TypeScript), ensuring pixel-perfect execution and layout integrity.
                  </li>
                  <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-zinc-700 before:rounded-full group-hover:before:bg-blue-500/50 before:transition-colors">
                    <strong className="text-zinc-200 font-medium">Performance & SEO Optimization:</strong> Collaborated on UI workflows emphasizing web performance metrics, Core Web Vitals, and seamless user experiences tailored for modern organic search visibility.
                  </li>
                  <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-zinc-700 before:rounded-full group-hover:before:bg-blue-500/50 before:transition-colors">
                    <strong className="text-zinc-200 font-medium">Rapid Prototyping & Delivery:</strong> Successfully built and delivered a production-ready capstone project from scratch, demonstrating strict adherence to component architecture, speed, and cross-browser reliability.
                  </li>
                  <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-zinc-700 before:rounded-full group-hover:before:bg-blue-500/50 before:transition-colors">
                    <strong className="text-zinc-200 font-medium">Core Fluency:</strong> Participated in specialized tracks focusing on AI fluency, prompt engineering for developers, and production-level UI/UX implementation.
                  </li>
                </ul>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Next.js', 'React.js', 'Typescript', 'Tailwind CSS', 'Frontend Development', 'Prompt Engineering', 'AI Orchestration'].map(skill => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 text-xs font-medium border border-zinc-800/80 rounded-lg text-zinc-400 bg-zinc-900/30 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-800/50 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience 2: DEVCON Laguna */}
          <div className="relative group pl-8 md:pl-12 hover:-translate-y-1 transition-transform duration-500">
            <div className="absolute -left-[28px] top-0 bg-[#0a0a0a] py-2">
              <div className="w-14 h-14 rounded-2xl border border-zinc-800 bg-zinc-900/40 flex items-center justify-center text-zinc-200 font-medium text-sm shadow-sm group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300 backdrop-blur-sm">
                DL
              </div>
            </div>

            <div className="flex flex-col gap-5 pt-2">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors duration-300">
                  DEVCON Laguna
                </h2>
                <div className="text-sm text-zinc-500 mt-1.5 font-mono tracking-wide">Part-time</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[37px] md:-left-[53px] top-[10px] w-2 h-2 rounded-full border border-zinc-700 bg-zinc-800 group-hover:bg-emerald-400 group-hover:border-emerald-400 transition-colors duration-300" />
                <h3 className="text-lg md:text-xl text-zinc-200 font-medium">Membership Data Analyst</h3>
                <div className="text-xs font-mono text-zinc-500 mt-2 uppercase tracking-wider">
                  July 2026 - Present
                </div>
              </div>

              <div className="text-sm md:text-base text-zinc-400 leading-relaxed space-y-5">
                <p>
                  As the Membership Data Analyst for DEVCON Laguna, I manage the data pipelines that drive community growth and event execution for one of the premier tech organizations in the region.
                </p>
                <ul className="space-y-3 list-none">
                  <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-zinc-700 before:rounded-full group-hover:before:bg-emerald-500/50 before:transition-colors">
                    <strong className="text-zinc-200 font-medium">Membership Analytics:</strong> Track, analyze, and report on community growth and demographic trends to help shape localized engagement strategies.
                  </li>
                  <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-zinc-700 before:rounded-full group-hover:before:bg-emerald-500/50 before:transition-colors">
                    <strong className="text-zinc-200 font-medium">Event Data Stewardship:</strong> Oversee registration pipelines, monitor attendee turnouts, and manage data integrity for all DEVCON Laguna events, workshops, and hackathons.
                  </li>
                  <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-zinc-700 before:rounded-full group-hover:before:bg-emerald-500/50 before:transition-colors">
                    <strong className="text-zinc-200 font-medium">Operational Insights:</strong> Translate raw registration and membership metrics into actionable insights to optimize event operations and enhance the overall community experience.
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Project Management', 'Data Analysis', 'Data Visualization', 'Data Cleaning', 'Data Management', 'Statistical Data Analysis', 'Exploratory Data Analysis', 'Critical Thinking'].map(skill => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 text-xs font-medium border border-zinc-800/80 rounded-lg text-zinc-400 bg-zinc-900/30 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-800/50 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
