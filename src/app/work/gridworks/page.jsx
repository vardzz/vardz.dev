import ProjectTemplate from "@/components/custom/ProjectTemplate";

export default function GridworksPage() {
  return (
    <ProjectTemplate
      projectName="Gridworks"
      projectDescription="Transform raw, messy university schedule PDFs into clean, beautiful, print-ready calendar grids in under 3 seconds."
      role="Solo Developer"
      responsibilities="As the sole engineer and creator, my responsibility is to build, own, and maintain the entire technical infrastructure, core logic, and stack from the ground up, deploying AI agents merely as tools to accelerate my workflow."
      liveUrl="https://gridworks.vercel.app/"
      liveUrlText="https://gridworks.vercel.app/"
      imageSrc="/projects/gridworks/gridworks-landing.png"
      imageAlt="Gridworks showcase thumbnail"
      prevProjectHref="/work/ghostnet"
      prevProjectName="GhostNet AI"
      nextProjectName="CourtCatcher"
      nextProjectHref="/work/courtcatcher"
    >
      <div className="flex flex-col items-center text-center px-6 pb-24 md:pb-28">
        <h2 
          className="font-heading font-display text-4xl text-[#F4EDE4] mb-4 md:text-5xl leading-tight"
          style={{ fontFamily: "var(--font-melodrama), Melodrama, serif" }}
        >
          Featured on App Builders PH
        </h2>
        <p className="max-w-md text-sm text-[#F4EDE4]/60 leading-relaxed mb-8">
          Gridworks has been recognized as a featured application on appbuildersph.com, highlighting standout web development projects.
        </p>
        <a 
          href="https://appbuildersph.com/apps/gridworks" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 md:gap-6 w-full max-w-[620px] h-[72px] md:h-[100px] p-3 md:p-5 rounded-[18px] md:rounded-[24px] bg-[#F4EDE4] border border-[#111111]/10 select-none transition-all duration-300 hover:scale-[1.02] hover:border-[#111111]/20 hover:shadow-[0_0_20px_rgba(17,17,17,0.05)]"
        >
          {/* Logo */}
          <div className="relative w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 bg-[#16a34a]">
            <img 
              src="https://api.appbuildersph.com/storage/app-images/2c6ce69e-f2f3-4de0-992b-23eed6895f50/7b86cd4c-670a-4c09-a2b3-2eebfdc13dc3.webp?v=1783306546" 
              alt="Gridworks Logo" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Typography */}
          <div className="flex flex-col flex-1 min-w-0 text-left leading-tight gap-0.5 md:gap-1.5">
            <span className="font-bold text-base md:text-xl tracking-tight text-[#111111]">Gridworks</span>
            <span className="text-xs md:text-base text-[#111111]/70">
              on <strong className="font-bold text-[#111111]">App Builders PH</strong>
            </span>
          </div>

          {/* Metric */}
          <div className="flex flex-col items-center justify-center w-[68px] md:w-[100px] h-full rounded-xl md:rounded-2xl bg-[#111111] text-[#F4EDE4] leading-none px-1">
            <div className="flex items-center justify-center gap-0.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 translate-y-[-0.5px]">
                <path d="M18.593 15.8051C19.0376 15.4776 19.1326 14.8516 18.8051 14.4069C18.5507 14.0615 18.2963 13.7332 18.0731 13.4472C17.6276 12.8764 17.0143 12.1118 16.3479 11.3444C15.6859 10.5819 14.9518 9.79361 14.2666 9.18811C13.9251 8.88637 13.5721 8.60888 13.2279 8.4014C12.9112 8.21046 12.476 8 11.9999 8C11.5238 8 11.0885 8.21046 10.7718 8.4014C10.4276 8.60888 10.0747 8.88637 9.7332 9.18811C9.04791 9.79361 8.31387 10.5819 7.65183 11.3444C6.98548 12.1118 6.37216 12.8764 5.92664 13.4472C5.70347 13.7332 5.44902 14.0615 5.19463 14.4069C4.86712 14.8516 4.96211 15.4776 5.4068 15.8051C5.58556 15.9368 5.79362 16.0002 5.99982 16L11.9999 16L17.9999 16C18.2061 16.0002 18.4142 15.9368 18.593 15.8051Z" />
              </svg>
              <strong className="text-[15px] md:text-[22px] font-extrabold">9</strong>
            </div>
            <span className="text-[10px] md:text-[12px] font-bold mt-1.5 md:mt-2">votes</span>
          </div>
        </a>
      </div>
    </ProjectTemplate>
  );
}
