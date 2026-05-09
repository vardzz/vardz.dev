// src/components/custom/footer.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <footer id="contact" className="w-full bg-base text-accent pt-32 pb-6 md:pb-12 overflow-hidden relative border-t border-accent/10">
       
       <motion.div 
         variants={containerVariants}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true }}
         // FIX 1: Added w-full and adjusted alignment for mobile/desktop
         className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-20 md:mb-32"
       >
         
         {/* Collaborate */}
         <motion.div variants={itemVariants}>
           <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-accent/70 mb-6 block">Contact</span>
           <a 
             href="mailto:vardz@dev.com" 
             className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter border-b border-transparent hover:border-accent transition-all duration-500 cursor-pointer block"
           >
             VARDZ@DEV.COM
           </a>
         </motion.div>

         {/* Networks */}
         <motion.div variants={itemVariants} className="flex flex-col md:text-right gap-6">
           <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-accent/70 block">Networks</span>
           <div className="flex gap-8 flex-wrap">
              {[
                 { label: "LinkedIn", href: "https://www.linkedin.com/in/vardz/" },
                 { label: "Instagram", href: "https://www.instagram.com/v_ardzz/" },
                 { label: "Facebook", href: "https://www.facebook.com/Changeiscomingtoday" },
                 { label: "Github", href: "https://github.com/vardzz" }
              ].map((net, i) => (
                <motion.a 
                  key={i} 
                  href={net.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, color: "var(--foreground)" }}
                  className="text-[10px] font-bold text-accent/70 transition-colors duration-500 uppercase tracking-[0.2em] cursor-pointer"
                >
                  {net.label}
                </motion.a>
              ))}
           </div>
         </motion.div>

       </motion.div>

       {/* Massive Fluid Signature */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.8, y: 100 }}
         whileInView={{ opacity: 1, scale: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
         // FIX 2: Added overflow-hidden to prevent clipping/scrolling, centered items
         className="w-full overflow-hidden flex justify-center items-center mb-16 py-8"
       >
         <h1 className="font-heading font-display text-[20vw] leading-[0.8] font-black tracking-tighter uppercase text-accent whitespace-nowrap">
            @VARDZ
         </h1>
       </motion.div>

       {/* Bottom Details */}
       <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ delay: 1 }}
         className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[10px] text-accent/70 tracking-[0.2em] uppercase font-bold gap-4"
       >
         <span>© 2026 JERICHO VARDE. ALL RIGHTS RESERVED.</span>
         <span>LOCATED IN THE PHILIPPINES</span>
       </motion.div>
    </footer>
  );
}