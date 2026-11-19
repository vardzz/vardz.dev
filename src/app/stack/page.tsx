import React from 'react';
import { Metadata } from 'next';
import ScrollReveal from '../../components/layout/ScrollReveal';

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "Comprehensive breakdown of technical capabilities, programming languages, cloud platforms, and developer tooling utilized by Jericho Varde.",
  keywords: [
    "Jericho Varde Tech Stack",
    "Frontend Skills",
    "Backend Skills",
    "Cloud Architecture AWS GCP",
    "Database Systems PostgreSQL",
    "AI Frameworks Claude OpenAI",
    "DevOps Docker",
  ],
  alternates: {
    canonical: "/stack",
  },
  openGraph: {
    title: "Tech Stack | Vardz — Cloud & Software Engineer",
    description: "Technical capabilities across full-stack development, cloud infrastructure, databases, and AI tooling.",
    url: "/stack",
  },
};

export default function StackPage() {
  const stackSections = [
    {
      title: "FRONTEND",
      skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS', 'Vite']
    },
    {
      title: "BACKEND & APIs",
      skills: ['Node.js', 'Python', 'Java', 'PHP', 'Laravel', 'GraphQL', 'REST API', 'AWS Lambda']
    },
    {
      title: "DATABASES & ORM",
      skills: ['PostgreSQL', 'MySQL', 'DynamoDB', 'Supabase', 'Prisma']
    },
    {
      title: "DEVOPS & CLOUD",
      skills: ['AWS', 'GCP', 'Docker', 'Vercel']
    },
    {
      title: "AI & AUTOMATION",
      skills: ['OpenAI', 'Anthropic', 'Claude', 'Claude Code', 'Gemini', 'Codex', 'n8n']
    },
    {
      title: "DEVELOPER TOOLS",
      skills: ['Git', 'VS Code', 'Postman', 'Figma', 'Zod']
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300">
      <main className="min-w-0">
        <div className="block pb-24">
          <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0">
            
            {/* Header section */}
            <ScrollReveal distance={16} duration={700}>
              <header className="mb-[38px] md:mb-[48px]">
                <h1 className="m-0 text-[28px] md:text-[32px] font-medium tracking-[-.04em] text-text mb-[12px]">Tech Stack</h1>
                <p className="text-muted text-[14px] leading-[1.6] max-w-[560px]">
                  The technologies I leverage to build scalable cloud architectures, engineer seamless AI-driven interfaces, and drive impactful data analytics.
                </p>
              </header>
            </ScrollReveal>

            <div className="flex flex-col">
              {stackSections.map((section, idx) => (
                <ScrollReveal key={idx} distance={20} duration={700} delay={idx * 60}>
                  <div className="mb-[48px]">
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
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
