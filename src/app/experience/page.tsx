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
              <h1 className="m-0 text-[28px] md:text-[32px] font-medium tracking-[-.04em] text-text mb-[12px]">Experience</h1>
              <p className="text-muted text-[14px] leading-[1.6] max-w-[560px]">
                Bridging the gap between AI-driven frontend engineering and impactful data analytics to build scalable, user-centric solutions and drive community growth.
              </p>
            </header>

            <div className="ml-[24px] md:ml-[28px] mt-[48px]">
              
              {/* Flyrank AI */}
              <div className="relative pl-[40px] md:pl-[48px] group pb-[64px]">
                {/* Timeline Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-line transition-all duration-300 group-hover:bg-text group-hover:shadow-[0_0_15px_var(--color-muted)] z-0"></div>

                {/* Timeline Node */}
                <div className="absolute -left-[24px] top-[-8px] bg-bg py-[8px] z-10">
                  <div className="w-[48px] h-[48px] rounded-[14px] border border-line bg-bg flex items-center justify-center text-text font-medium text-[13px] transition-all duration-300 group-hover:border-text group-hover:shadow-[0_0_15px_var(--color-muted)]">
                    FA
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-[9px] md:gap-[20px] mb-[16px]">
                  <div>
                    <div className="text-[17px] font-medium tracking-[-.03em] text-text">Flyrank AI</div>
                    <div className="text-muted text-[13px] mt-[4px] font-mono">Internship</div>
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

                <div className="text-muted text-[13px] leading-[1.7] max-w-[600px] mb-[24px] space-y-[16px]">
                  <p>
                    During my time at Flyrank AI, I spearheaded the development of client-ready frontend interfaces for their organic growth and SEO automation platform. My workflow was heavily integrated with advanced LLMs, utilizing them as pair-programming partners to rapidly scaffold, refactor, and deploy highly responsive web pages and personalized storefront components. This AI-first approach allowed me to combine traditional frontend engineering using React, TypeScript, and Tailwind CSS with modern AI orchestration to drastically accelerate the product delivery lifecycle.
                  </p>
                  <p>
                    I placed a strong emphasis on modern web performance and SEO, ensuring all UI workflows were strictly optimized for Core Web Vitals and high organic search visibility. Ultimately, this culminated in the successful end-to-end delivery of a production-ready capstone project from scratch, proving that rapid prototyping can still adhere to strict component architecture, pixel-perfect execution, and absolute cross-browser reliability.
                  </p>
                </div>

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
              <div className="relative pl-[40px] md:pl-[48px] group pb-[32px]">
                {/* Timeline Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-line transition-all duration-300 group-hover:bg-text group-hover:shadow-[0_0_15px_var(--color-muted)] z-0"></div>

                {/* Timeline Node */}
                <div className="absolute -left-[24px] top-[-8px] bg-bg py-[8px] z-10">
                  <div className="w-[48px] h-[48px] rounded-[14px] border border-line bg-bg flex items-center justify-center text-text font-medium text-[13px] transition-all duration-300 group-hover:border-text group-hover:shadow-[0_0_15px_var(--color-muted)]">
                    DL
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-[9px] md:gap-[20px] mb-[16px]">
                  <div>
                    <div className="text-[17px] font-medium tracking-[-.03em] text-text">DEVCON Laguna</div>
                    <div className="text-muted text-[13px] mt-[4px] font-mono">Full-time</div>
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

                <div className="text-muted text-[13px] leading-[1.7] max-w-[600px] mb-[24px] space-y-[16px]">
                  <p>
                    As the Membership Data Analyst for DEVCON Laguna, I took ownership of the data pipelines critical to driving community growth and orchestrating seamless event execution for one of the region's premier tech organizations. By tracking and analyzing demographic trends, I translated raw registration metrics into actionable operational insights that directly shaped our localized engagement strategies.
                  </p>
                  <p>
                    Beyond just analysis, I acted as a data steward across multiple major event cycles—overseeing registration pipelines, monitoring attendee turnouts, and ensuring strict data integrity for all workshops and hackathons. This hands-on experience in exploratory data analysis and project management empowered the organization to continuously optimize its operations and deliver a highly tailored, impactful experience to its members.
                  </p>
                </div>

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
