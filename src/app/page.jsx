"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Sidebar from "@/components/custom/sidebar";
import Hero from "@/components/custom/hero";
import About from "@/components/custom/about";
import TechStack from "@/components/custom/techStack";
import Experience from "@/components/custom/Experience";
import Projects from "@/components/custom/projects";
import Footer from "@/components/custom/footer";
import LoadingScreen from "@/components/custom/loadingScreen";

import TechGrid from "@/components/custom/TechGrid";
import SmoothScroll from "@/components/custom/SmoothScroll";
import ScrollReveal from "@/components/custom/ScrollReveal";
import Certificates from "@/components/custom/certificates";

export default function Portfolio() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" onFinished={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="relative min-h-screen w-full bg-background text-foreground selection:bg-foreground selection:text-background font-sans transition-colors duration-700 ease-in-out">
        <Sidebar />
        <main>
          <ScrollReveal delay={0.1}>
            <Hero />
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} variant="fade">
            <TechStack variant="icons" />
          </ScrollReveal>

          <ScrollReveal variant="up" distance={60}>
            <About />
          </ScrollReveal>

          <ScrollReveal variant="up" distance={60}>
            <TechGrid />
          </ScrollReveal>

          <ScrollReveal variant="fade">
            <TechStack variant="names" />
          </ScrollReveal>

          <ScrollReveal variant="up" distance={60}>
            <Experience />
          </ScrollReveal>

          <ScrollReveal variant="up" distance={60}>
            <Projects />
          </ScrollReveal>

          <ScrollReveal variant="up" distance={40}>
          <Certificates />
        </ScrollReveal>
        </main>
        
        <ScrollReveal variant="down" distance={40}>
          <Footer />
        </ScrollReveal>
      </div>
    </SmoothScroll>
  );
}
