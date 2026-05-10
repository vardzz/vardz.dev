// src/app/work/dentara/page.jsx
import ProjectLayout from "@/components/custom/ProjectLayout";
import { motion } from "framer-motion";

export default function DentaraPage() {
  return (
    <ProjectLayout 
      name="Dentara" 
      role="Health Tech PWA" 
      nextProject="Horizon AI" 
      nextHref="/work/horizon-ai"
    >
      <div className="space-y-32">
        
        {/* Section 1: Hero Image & Overview */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
             <div className="aspect-[16/10] w-full bg-black/5 rounded-sm overflow-hidden relative">
                {/* Image tag would go here */}
                <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest opacity-20">
                  Main Platform Preview
                </div>
             </div>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end">
             <h3 className="font-bold text-xs uppercase tracking-widest mb-6 opacity-40 italic">01. Purpose</h3>
             <p className="text-xl md:text-2xl font-medium leading-tight mb-6">
                Bridging the gap between dentistry students and clinical patients through a seamless PWA.
             </p>
             <p className="text-sm leading-relaxed opacity-60">
                Dentara was born from a need to digitize the manual patient-matching process, 
                streamlining requirements for medical professionals in training.
             </p>
          </div>
        </section>

        {/* Section 2: Technical Specs (Sticky Layout) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-black/5 pt-12">
           <div className="md:col-span-4 sticky top-32 h-fit">
              <h3 className="font-bold text-xs uppercase tracking-widest mb-8 opacity-40 italic">02. Stack</h3>
              <ul className="space-y-4 text-[11px] font-bold tracking-widest uppercase">
                 <li className="flex justify-between border-b border-black/5 pb-2"><span>Frontend</span><span>Next.js 14</span></li>
                 <li className="flex justify-between border-b border-black/5 pb-2"><span>Database</span><span>Supabase</span></li>
                 <li className="flex justify-between border-b border-black/5 pb-2"><span>Styling</span><span>Tailwind CSS</span></li>
                 <li className="flex justify-between border-b border-black/5 pb-2"><span>Auth</span><span>NextAuth</span></li>
              </ul>
           </div>
           <div className="md:col-span-8 space-y-12">
              <div className="aspect-video bg-black/5 rounded-sm" />
              <div className="aspect-video bg-black/5 rounded-sm" />
           </div>
        </section>

      </div>
    </ProjectLayout>
  );
}