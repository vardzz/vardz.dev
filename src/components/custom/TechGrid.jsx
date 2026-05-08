"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECH_STACK } from "@/components/custom/techStack";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, Layout, Server, Settings } from "lucide-react";

const SPECIALIZATIONS = [
  { 
    id: "Core", 
    label: "Core", 
    icon: Star, 
    description: "These are the foundational technologies of my development workflow. I have deep expertise in building scalable, production-ready applications using these core frameworks and languages." 
  },
  { 
    id: "Frontend", 
    label: "Frontend", 
    icon: Layout, 
    description: "I specialize in creating pixel-perfect, highly interactive user interfaces. My approach combines aesthetic precision with modern web standards to deliver exceptional user experiences." 
  },
  { 
    id: "Backend", 
    label: "Backend", 
    icon: Server, 
    description: "My backend expertise focuses on building robust architectural foundations, secure API services, and efficient data management strategies to support complex application requirements." 
  },
  { 
    id: "Tools", 
    label: "Tools", 
    icon: Settings, 
    description: "I leverage a comprehensive suite of cloud infrastructure, version control, and development utilities to ensure seamless deployment, containerization, and high-performance engineering workflows." 
  },
];

export default function TechGrid() {
  const [activeFilter, setActiveFilter] = useState("Core");

  const filteredStack = TECH_STACK.filter(tech => tech.specialization === activeFilter);
  const activeSpec = SPECIALIZATIONS.find(s => s.id === activeFilter);

  return (
    <section className="bg-base py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <p className="tracking-[0.3em] text-[10px] text-accent opacity-50 font-medium uppercase mb-1">
            THE ARSENAL
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-accent">
            TECH STACK
          </h2>
        </motion.div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          {SPECIALIZATIONS.map((spec) => {
            const Icon = spec.icon;
            const isActive = activeFilter === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => setActiveFilter(spec.id)}
                className={`group flex items-center gap-2 px-4 py-2 transition-all duration-300 relative cursor-pointer`}
              >
                <Icon size={16} className={`${isActive ? "text-accent" : "text-accent opacity-50 group-hover:opacity-70"}`} />
                <span className={`text-[13px] font-bold tracking-[0.2em] uppercase ${isActive ? "text-accent" : "text-accent opacity-50 group-hover:opacity-70"}`}>
                  {spec.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Description Section */}
        <div className="max-w-2xl mx-auto text-center mb-16 px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.2, 1, 0.3, 1] }}
              className="text-accent opacity-70 text-xs leading-relaxed font-medium min-h-[40px]"
            >
              {activeSpec.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* The Grid with stabilized reveal and filtering */}
        <motion.div 
          layout
          className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 md:gap-4 lg:gap-6"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                layout
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.9, filter: "blur(4px)" },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    filter: "blur(0px)",
                    transition: { 
                      duration: 0.6, 
                      delay: idx * 0.05,
                      ease: [0.215, 0.61, 0.355, 1] 
                    }
                  }
                }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)", transition: { duration: 0.3 } }}
              >
                <TechCard tech={tech} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function TechCard({ tech }) {
  const Icon = tech.icon;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover="hover"
          className="group relative aspect-square flex flex-col items-center justify-center bg-base cursor-pointer overflow-hidden border border-accent/40 hover:border-accent rounded-2xl transition-all duration-500"
        >
          {/* Default Monochrome State & Hover Brand Color State */}
          <motion.div className="flex flex-col items-center justify-center text-accent opacity-70 h-full w-full">
            <motion.div 
              variants={{
                hover: { scale: 1.15 }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex items-center justify-center mb-2"
            >
                {/* Monochrome Base Icon (Black/Zinc) */}
                <Icon 
                    size={32} 
                    className="transition-opacity duration-300 group-hover:opacity-0"
                />
                {/* Brand Color Hover Icon (Always Brand color) */}
                <Icon 
                    size={32} 
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${tech.color}`}
                />
            </motion.div>

            {/* Tech Name Reveal on Hover */}
            <p 
              className="absolute bottom-3 text-[10px] font-extrabold tracking-[0.2em] uppercase text-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            >
              {tech.name}
            </p>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="border-accent/10 shadow-2xl rounded-[2.5rem] p-0 overflow-hidden bg-base">
        <DialogTitle className="sr-only">Tech Details: {tech.name}</DialogTitle>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 1, 0.3, 1] }}
          className="p-16 flex flex-col items-center text-center space-y-6"
        >
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={`${tech.color} drop-shadow-sm`}
          >
             <Icon size={80} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-1"
          >
            <h3 className="font-heading text-4xl font-black tracking-tighter text-accent">
              {tech.name}
            </h3>
            <p className="text-accent opacity-50 uppercase tracking-[0.3em] text-[10px] font-bold">
              {tech.category}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="pt-6 border-t border-accent/10 w-full"
          >
            <p className="text-accent opacity-70 text-xs font-semibold tracking-wide">
              {tech.experience}
            </p>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
