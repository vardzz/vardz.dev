import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "Projects — Vardz",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen transition-colors duration-300">

      {/* Main Content */}
      <main className="min-w-0 pb-[100px]">
        <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0">
          
          {/* Header */}
          <div className="mb-[40px] md:mb-[60px]">
            <h1 className="text-[32px] md:text-[32px] font-medium tracking-[-.04em] text-text">Projects</h1>
            <p className="text-muted text-[15px] mt-[12px] max-w-[500px]">This is a showcase of my best work in a variety of fields including Full-Stack Web Development, Artificial Intelligence, and Cloud Engineering.</p>
          </div>

          {/* Projects Grid */}
          <div className="flex flex-col gap-[16px]">
            
            {/* Featured Projects (Bento Box) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              {/* Project 1 (Large) */}
              <a href="https://horizonai-zeta.vercel.app/" target="_blank" className="group relative block md:col-span-2 aspect-[4/3] md:aspect-[21/9] rounded-[16px] overflow-hidden border border-line bg-transparent hover:border-accent/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-text/5 to-transparent z-10"></div>
                
                {/* Horizon Logo Background */}
                <div className="absolute inset-y-0 right-0 w-3/4 md:w-1/2 z-0 opacity-10 group-hover:opacity-100 transition-all duration-500 flex items-center justify-end p-[24px] md:p-[40px] pointer-events-none">
                  <img src="/projects/horizon-logo.png" alt="" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>

                {/* Protective Gradient for Text on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="absolute inset-0 p-[24px] md:p-[32px] flex flex-col justify-end z-20 pointer-events-none">
                  <div className="flex justify-between items-end pointer-events-auto">
                    <div className="transform transition-transform duration-500 origin-bottom-left group-hover:scale-[1.03]">
                      <div className="text-accent font-mono text-[11px] mb-[12px]">AI / SYSTEM</div>
                      <h3 className="text-[22px] md:text-[28px] font-medium tracking-[-.03em] text-text mb-[8px] group-hover:text-accent transition-colors">Horizon AI</h3>
                      <p className="text-muted text-[14px] leading-[1.6] max-w-[480px]">A role-driven multi-agent system designed to optimize the reasoning and workflow automation of Small Language Models (SLMs).</p>
                    </div>
                    <span className="hidden md:flex items-center justify-center w-[40px] h-[40px] rounded-full bg-line text-text group-hover:bg-accent group-hover:text-bg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-[10px] group-hover:translate-y-0">
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
                    </span>
                  </div>
                </div>
              </a>

              {/* Project 2 (Small) */}
              <a href="https://gridworks.vercel.app/" target="_blank" className="group relative block aspect-square md:aspect-[4/3] rounded-[16px] overflow-hidden border border-line bg-transparent hover:border-accent/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-text/5 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-3/4 md:w-1/2 z-0 opacity-10 group-hover:opacity-100 transition-all duration-500 flex items-center justify-end p-[24px] md:p-[40px] pointer-events-none">
                  <img src="/projects/gridworks-logo.png" alt="" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                
                {/* Protective Gradient for Text on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="absolute inset-0 p-[24px] flex flex-col justify-end z-20 pointer-events-none">
                  <div className="flex justify-between items-start mb-[auto] pointer-events-auto">
                    <div className="text-muted font-mono text-[10px]">WEB APP / UTILITY</div>
                    <span className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-line text-text group-hover:bg-accent group-hover:text-bg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-[10px] group-hover:translate-y-0">
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]">↗</span>
                    </span>
                  </div>
                  <div className="transform transition-transform duration-500 origin-bottom-left group-hover:scale-[1.03] pointer-events-auto">
                    <h3 className="text-[18px] md:text-[20px] font-medium tracking-[-.03em] text-text mb-[8px] group-hover:text-accent transition-colors">Gridworks</h3>
                    <p className="text-muted text-[13px] leading-[1.5]">Transform university schedule PDFs into clean, print-ready calendar grids in seconds.</p>
                  </div>
                </div>
              </a>

              {/* Project 3 (Small) */}
              <a href="https://lunas.software/" target="_blank" className="group relative block aspect-square md:aspect-[4/3] rounded-[16px] overflow-hidden border border-line bg-transparent hover:border-accent/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-tl from-text/5 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-3/4 md:w-1/2 z-0 opacity-10 group-hover:opacity-100 transition-all duration-500 flex items-center justify-end p-[24px] md:p-[40px] pointer-events-none">
                  <img src="/projects/lunas-logo.png" alt="" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>

                {/* Protective Gradient for Text on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="absolute inset-0 p-[24px] flex flex-col justify-end z-20 pointer-events-none">
                  <div className="flex justify-between items-start mb-[auto] pointer-events-auto">
                    <div className="text-muted font-mono text-[10px]">HEALTH-TECH / WEB</div>
                    <span className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-line text-text group-hover:bg-accent group-hover:text-bg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-[10px] group-hover:translate-y-0">
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]">↗</span>
                    </span>
                  </div>
                  <div className="transform transition-transform duration-500 origin-bottom-left group-hover:scale-[1.03] pointer-events-auto">
                    <h3 className="text-[18px] md:text-[20px] font-medium tracking-[-.03em] text-text mb-[8px] group-hover:text-accent transition-colors">Lunas</h3>
                    <p className="text-muted text-[13px] leading-[1.5]">A secure, web-based emergency medical passport for instant access to critical health data via QR code.</p>
                  </div>
                </div>
              </a>
            </div>

            {/* Other Projects (Simple Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mt-[40px]">
              {/* Dentara */}
              <a href="#" className="group block p-[24px] border border-line rounded-[16px] bg-bg hover:border-accent/50 transition-all duration-300">
                <div className="flex justify-between items-start mb-[16px]">
                  <div className="text-accent font-mono text-[10px]">WEB APP / DENTAL</div>
                  <span className="text-muted group-hover:text-accent transition-colors font-mono text-[12px]">↗</span>
                </div>
                <h3 className="text-[18px] font-medium tracking-[-.03em] text-text mb-[8px] group-hover:text-accent transition-colors">Dentara</h3>
                <p className="text-muted text-[13px] leading-[1.5]">A modern web application for dental clinic management and patient records.</p>
              </a>

              {/* Ghostnet AI */}
              <a href="#" className="group block p-[24px] border border-line rounded-[16px] bg-bg hover:border-accent/50 transition-all duration-300">
                <div className="flex justify-between items-start mb-[16px]">
                  <div className="text-accent font-mono text-[10px]">AI / SYSTEM</div>
                  <span className="text-muted group-hover:text-accent transition-colors font-mono text-[12px]">↗</span>
                </div>
                <h3 className="text-[18px] font-medium tracking-[-.03em] text-text mb-[8px] group-hover:text-accent transition-colors">Ghostnet AI</h3>
                <p className="text-muted text-[13px] leading-[1.5]">An intelligent system utilizing advanced machine learning algorithms.</p>
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
