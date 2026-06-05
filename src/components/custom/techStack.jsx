"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiHtml5, SiCss3, SiJavascript, SiPython, SiPhp, SiLaravel, SiGooglecloud, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPostgresql, SiAmazonwebservices, SiDocker, SiGit, SiFigma, SiVercel, SiSupabase, SiPrisma, SiPostman } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandVscode } from "react-icons/tb";

export const TECH_STACK = [
    { name: "HTML", icon: SiHtml5, color: "text-accent", category: "Web Fundamentals", experience: "5+ years of experience", specialization: "Frontend" },
    { name: "CSS", icon: SiCss3, color: "text-accent", category: "Web Styling", experience: "5+ years of experience", specialization: "Frontend" },
    { name: "JavaScript", icon: SiJavascript, color: "text-accent", category: "Core Scripting", experience: "5+ years of experience", specialization: "Core" },
    { name: "Java", icon: FaJava, color: "text-accent", category: "Backend Development", experience: "3 years of experience", specialization: "Backend" },
    { name: "Python", icon: SiPython, color: "text-accent", category: "Data & Scripting", experience: "4 years of experience", specialization: "Backend" },
    { name: "PHP", icon: SiPhp, color: "text-accent", category: "Server-side Development", experience: "4 years of experience", specialization: "Backend" },
    { name: "Laravel", icon: SiLaravel, color: "text-accent", category: "PHP Framework", experience: "3 years of experience", specialization: "Backend" },
    { name: "Google Cloud", icon: SiGooglecloud, color: "text-accent", category: "Cloud Infrastructure", experience: "2 years of experience", specialization: "Tools" },
    { name: "React", icon: SiReact, color: "text-accent", category: "Frontend Library", experience: "4 years of experience", specialization: "Core" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-accent dark:text-accent", category: "React Framework", experience: "2 years of experience", specialization: "Core" },
    { name: "TypeScript", icon: SiTypescript, color: "text-accent", category: "Typed JavaScript", experience: "3 years of experience", specialization: "Core" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-accent", category: "Utility CSS", experience: "4 years of experience", specialization: "Core" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-accent", category: "Runtime Environment", experience: "4 years of experience", specialization: "Core" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-accent", category: "Relational Database", experience: "3 years of experience", specialization: "Backend" },
    { name: "AWS", icon: SiAmazonwebservices, color: "text-accent", category: "Cloud Services", experience: "2 years of experience", specialization: "Tools" },
    { name: "Docker", icon: SiDocker, color: "text-accent", category: "Containerization", experience: "2 years of experience", specialization: "Tools" },
    { name: "Git", icon: SiGit, color: "text-accent", category: "Version Control", experience: "5+ years of experience", specialization: "Tools" },
    { name: "Figma", icon: SiFigma, color: "text-accent", category: "Design Tool", experience: "3 years of experience", specialization: "Frontend" },
    { name: "Vercel", icon: SiVercel, color: "text-accent dark:text-accent", category: "Deployment Platform", experience: "2 years of experience", specialization: "Tools" },
    { name: "VS Code", icon: TbBrandVscode, color: "text-accent", category: "Code Editor", experience: "5+ years of experience", specialization: "Tools" },
    { name: "Supabase", icon: SiSupabase, color: "text-accent", category: "Backend-as-a-Service", experience: "2 years of experience", specialization: "Backend" },
    { name: "Prisma", icon: SiPrisma, color: "text-accent dark:text-accent", category: "ORM / Database Tool", experience: "2 years of experience", specialization: "Backend" },
    { name: "Postman", icon: SiPostman, color: "text-accent", category: "API Development", experience: "1 year of experience", specialization: "Tools" },
];

export default function TechStack({ variant = "icons" }) {
  const iconSet = TECH_STACK;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.2, 1, 0.3, 1] }}
      className="relative flex items-center overflow-hidden bg-background py-12 transition-colors duration-300 ease-in-out"
    >
      <div className="absolute inset-x-0 w-[200vw] pointer-events-none sm:w-[300vw]" />

      {variant === "icons" ? (
        <div className="relative flex w-full overflow-hidden py-4">
          <motion.div
            className="flex w-max whitespace-nowrap will-change-transform transform-gpu"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            <div className="flex items-center gap-10 px-6 sm:gap-14 md:gap-20 md:px-12 lg:gap-24">
              {iconSet.map((tech, idx) => (
                <TechItem key={`set1-${idx}`} tech={tech} variant={variant} />
              ))}
            </div>
            <div className="flex items-center gap-10 px-6 sm:gap-14 md:gap-20 md:px-12 lg:gap-24">
              {iconSet.map((tech, idx) => (
                <TechItem key={`set2-${idx}`} tech={tech} variant={variant} />
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="relative flex overflow-hidden py-4">
          <motion.div
            className="flex whitespace-nowrap will-change-transform transform-gpu"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          >
            <div className="flex items-center gap-16 pr-16 md:gap-24 md:pr-24">
              {TECH_STACK.map((tech, idx) => (
                <TechItem key={`set1-${idx}`} tech={tech} variant={variant} />
              ))}
            </div>
            <div className="flex items-center gap-16 pr-16 md:gap-24 md:pr-24">
              {TECH_STACK.map((tech, idx) => (
                <TechItem key={`set2-${idx}`} tech={tech} variant={variant} />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}

const TechItem = React.memo(function TechItem({ tech, variant }) {
  return (
    <div 
      className={`flex items-center justify-center transition-colors duration-300 cursor-pointer ${variant === "icons" ? `text-accent hover:${tech.color}` : "text-accent hover:text-accent/70"} transform-gpu`}
      title={tech.name}
    >
      {variant === "icons" ? (
        <div className="transform transition-transform duration-300 hover:scale-110">
          <tech.icon size={30} className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11" />
        </div>
      ) : (
        <span className="text-4xl font-black uppercase tracking-tighter md:text-7xl">
          {tech.name}
        </span>
      )}
    </div>
  );
});
