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
        <iframe
          src="https://appbuildersph.com/embed/apps/gridworks"
          title="Gridworks votes on App Builders PH"
          width="320"
          height="72"
          style={{ border: 0 }}
          loading="lazy"
          scrolling="no"
        />
      </div>
    </ProjectTemplate>
  );
}
