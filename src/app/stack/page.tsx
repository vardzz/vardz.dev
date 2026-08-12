"use client";
import React from 'react';

export default function StackPage() {
  const stackSections = [
    {
      title: "FRONTEND",
      skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS']
    },
    {
      title: "BACKEND",
      skills: ['Node.js', 'Python']
    },
    {
      title: "DEVOPS & CLOUD",
      skills: ['Docker', 'Kubernetes', 'AWS', 'GCP']
    },
    {
      title: "AI & MACHINE LEARNING",
      skills: ['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain']
    },
    {
      title: "DEVELOPER TOOLS",
      skills: ['Git', 'VS Code', 'Postman', 'Figma']
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300">
      <main className="min-w-0">
        <div className="block pt-[54px] md:pt-[70px] pb-24">
          <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0">
            
            {/* Header section */}
            <header className="mb-[38px] md:mb-[48px]">
              <h1 className="m-0 text-[28px] md:text-[32px] font-medium tracking-[-.04em] text-text mb-[12px]">Tech Stack</h1>
              <p className="text-muted text-[14px] leading-[1.6] max-w-[560px]">
                The technologies I leverage to build scalable cloud architectures, engineer seamless AI-driven interfaces, and drive impactful data analytics.
              </p>
            </header>

            <div className="flex flex-col">
              {stackSections.map((section, idx) => (
                <div key={idx} className="mb-[48px]">
                  <h2 className="text-muted font-mono text-[11px] tracking-[.1em] uppercase mb-[16px]">
                    {section.title}
                  </h2>
                  <div className="flex flex-wrap gap-[12px]">
                    {section.skills.map(skill => (
                      <div 
                        key={skill} 
                        className="px-[14px] py-[6px] text-[13px] font-mono border border-line rounded-[6px] text-text bg-transparent hover:border-text transition-colors cursor-default"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
