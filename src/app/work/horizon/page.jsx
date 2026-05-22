import ProjectTemplate from "@/components/custom/ProjectTemplate";

export default function HorizonPage() {
  return (
    <ProjectTemplate
      projectName="Horizon AI"
      projectDescription="An advanced thesis project titled Horizontal Intelligence: Optimizing Small Language Model Reasoning via Role-Driven Multi-Agent Orchestration, designed to leverage multiple AI agents for complex reasoning and workflow automation."
      role="Frontend Developer"
      responsibilities="Engineered the frontend architecture using Next.js, TypeScript, and Tailwind CSS. Designed and implemented the system's complex UI/UX, including real-time orchestration panels, skeleton loading states, and persistent thread management to visually translate multi-agent interactions for the user."
      liveUrl="https://github.com/horizon-ai-code"
      liveUrlText="https://github.com/horizon-ai-code"
      imageSrc="/projects/horizon/horizon-landing.png"
      imageAlt="Horizon AI showcase thumbnail"
      prevProjectHref="/work/lunas"
      prevProjectName="Lunas"
      nextProjectName="Court Catcher"
      nextProjectHref="/work/court-catcher"
    />
  );
}
