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
        <div className="relative w-[304px] h-[56px] overflow-hidden rounded-[14px]">
          <iframe
            src="https://appbuildersph.com/embed/apps/gridworks"
            title="Gridworks votes on App Builders PH"
            width="320"
            height="72"
            style={{
              border: 0,
              position: "absolute",
              left: "-8px",
              top: "-8px",
            }}
            loading="lazy"
            scrolling="no"
            className="block"
          />
        </div>
      </div>
    </ProjectTemplate>
  );
}
