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
      <div className="flex justify-center pb-24 md:pb-28">
        <div className="group relative overflow-hidden rounded-[24px] border border-[#F4EDE4]/10 bg-[#161616] p-6 transition-all duration-300 hover:border-[#F4EDE4]/20 hover:shadow-[0_0_30px_rgba(244,237,228,0.03)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F4EDE4]/2 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative flex flex-col items-center gap-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#F4EDE4]/70 text-center">
              Gridworks is featured on appbuildersph.com
            </h3>
            <div className="overflow-hidden rounded-xl bg-[#F4EDE4] p-1">
              <iframe
                src="https://appbuildersph.com/embed/apps/gridworks"
                title="Gridworks votes on App Builders PH"
                width="320"
                height="72"
                style={{
                  border: 0,
                  mixBlendMode: "multiply",
                }}
                loading="lazy"
                scrolling="no"
                className="block"
              />
            </div>
          </div>
        </div>
      </div>
    </ProjectTemplate>
  );
}
