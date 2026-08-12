"use client";
import React from 'react';
import Navbar from '../../components/Navbar';

export default function ExperiencePage() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />
      
      <main className="min-w-0">
        <div className="block pt-[54px] md:pt-[70px] pb-24">
          <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0">
            
            {/* Header section matching minimalist style */}
            <header className="mb-[38px]">
              <h1 className="m-0 text-[28px] md:text-[32px] font-medium tracking-[-.04em] text-text mb-[12px]">experience</h1>
              <p className="text-muted text-[14px] leading-[1.6] max-w-[560px]">
                Six years building across AI engineering and full-stack development — from internal GenAI platforms at global enterprises to 60+ products shipped for startups.
              </p>
            </header>

            <div className="border-t border-line">
              
              {/* Flyrank AI */}
              <div className="py-[32px] border-b border-line">
                <div className="flex flex-col md:flex-row justify-between gap-[9px] md:gap-[20px] mb-[16px]">
                  <div>
                    <div className="text-[17px] font-medium tracking-[-.03em] text-text">Flyrank AI</div>
                    <div className="text-muted text-[13px] mt-[4px] font-mono">Full-time</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] mb-[16px]">
                  <div>
                    <div className="text-[15px] font-medium text-text">Frontend AI Engineer</div>
                  </div>
                  <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap uppercase mt-1 md:mt-0">
                    Jun 2026 — Present
                  </div>
                </div>

                <div className="text-muted text-[13px] leading-[1.6] max-w-[600px] mb-[20px]">
                  Leveraged AI-assisted development workflows and modern web technologies to design, build, and optimize high-performance, client-ready frontend interfaces within FlyRank’s organic growth and SEO automation platform. Combined robust engineering principles with AI fluency to accelerate the product delivery lifecycle.
                </div>

                <ul className="space-y-[12px] text-[13px] text-muted leading-[1.6] max-w-[600px] list-none pl-0 mb-[24px]">
                  <li className="relative pl-[14px] before:absolute before:left-0 before:top-[8px] before:w-[4px] before:h-[4px] before:bg-line before:rounded-full">
                    <strong className="text-soft font-medium">AI-Powered Pair Programming:</strong> Utilized advanced LLMs and AI coding tools as pair-programmers to rapidly scaffold, refactor, and deploy responsive web pages, storefront interfaces, and personalized user components.
                  </li>
                  <li className="relative pl-[14px] before:absolute before:left-0 before:top-[8px] before:w-[4px] before:h-[4px] before:bg-line before:rounded-full">
                    <strong className="text-soft font-medium">Modern Frontend Engineering:</strong> Developed scalable, clean, and highly interactive user interfaces using modern tech stacks (including React, Tailwind CSS, and TypeScript), ensuring pixel-perfect execution and layout integrity.
                  </li>
                  <li className="relative pl-[14px] before:absolute before:left-0 before:top-[8px] before:w-[4px] before:h-[4px] before:bg-line before:rounded-full">
                    <strong className="text-soft font-medium">Performance & SEO Optimization:</strong> Collaborated on UI workflows emphasizing web performance metrics, Core Web Vitals, and seamless user experiences tailored for modern organic search visibility.
                  </li>
                  <li className="relative pl-[14px] before:absolute before:left-0 before:top-[8px] before:w-[4px] before:h-[4px] before:bg-line before:rounded-full">
                    <strong className="text-soft font-medium">Rapid Prototyping & Delivery:</strong> Successfully built and delivered a production-ready capstone project from scratch, demonstrating strict adherence to component architecture, speed, and cross-browser reliability.
                  </li>
                  <li className="relative pl-[14px] before:absolute before:left-0 before:top-[8px] before:w-[4px] before:h-[4px] before:bg-line before:rounded-full">
                    <strong className="text-soft font-medium">Core Fluency:</strong> Participated in specialized tracks focusing on AI fluency, prompt engineering for developers, and production-level UI/UX implementation.
                  </li>
                </ul>

                <div className="flex flex-wrap gap-[8px]">
                  {['Next.js', 'React.js', 'Typescript', 'Tailwind CSS', 'Frontend Development', 'Prompt Engineering', 'AI Orchestration'].map(skill => (
                    <span 
                      key={skill} 
                      className="px-[12px] py-[4px] text-[11px] font-mono border border-line rounded-[6px] text-muted cursor-default hover:text-text hover:border-text transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* DEVCON Laguna */}
              <div className="py-[32px] border-b border-line">
                <div className="flex flex-col md:flex-row justify-between gap-[9px] md:gap-[20px] mb-[16px]">
                  <div>
                    <div className="text-[17px] font-medium tracking-[-.03em] text-text">DEVCON Laguna</div>
                    <div className="text-muted text-[13px] mt-[4px] font-mono">Part-time</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] mb-[16px]">
                  <div>
                    <div className="text-[15px] font-medium text-text">Membership Data Analyst</div>
                  </div>
                  <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap uppercase mt-1 md:mt-0">
                    Jul 2026 — Present
                  </div>
                </div>

                <div className="text-muted text-[13px] leading-[1.6] max-w-[600px] mb-[20px]">
                  As the Membership Data Analyst for DEVCON Laguna, I manage the data pipelines that drive community growth and event execution for one of the premier tech organizations in the region.
                </div>

                <ul className="space-y-[12px] text-[13px] text-muted leading-[1.6] max-w-[600px] list-none pl-0 mb-[24px]">
                  <li className="relative pl-[14px] before:absolute before:left-0 before:top-[8px] before:w-[4px] before:h-[4px] before:bg-line before:rounded-full">
                    <strong className="text-soft font-medium">Membership Analytics:</strong> Track, analyze, and report on community growth and demographic trends to help shape localized engagement strategies.
                  </li>
                  <li className="relative pl-[14px] before:absolute before:left-0 before:top-[8px] before:w-[4px] before:h-[4px] before:bg-line before:rounded-full">
                    <strong className="text-soft font-medium">Event Data Stewardship:</strong> Oversee registration pipelines, monitor attendee turnouts, and manage data integrity for all DEVCON Laguna events, workshops, and hackathons.
                  </li>
                  <li className="relative pl-[14px] before:absolute before:left-0 before:top-[8px] before:w-[4px] before:h-[4px] before:bg-line before:rounded-full">
                    <strong className="text-soft font-medium">Operational Insights:</strong> Translate raw registration and membership metrics into actionable insights to optimize event operations and enhance the overall community experience.
                  </li>
                </ul>

                <div className="flex flex-wrap gap-[8px]">
                  {['Project Management', 'Data Analysis', 'Data Visualization', 'Data Cleaning', 'Data Management', 'Statistical Data Analysis', 'Exploratory Data Analysis', 'Critical Thinking'].map(skill => (
                    <span 
                      key={skill} 
                      className="px-[12px] py-[4px] text-[11px] font-mono border border-line rounded-[6px] text-muted cursor-default hover:text-text hover:border-text transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
