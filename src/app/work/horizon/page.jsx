import ProjectTemplate from "@/components/custom/ProjectTemplate";
import TeamTemplate from "@/components/custom/TeamTemplate";

export default function HorizonPage() {
  return (
    <ProjectTemplate
      projectName="Horizon AI"
      projectDescription="A role-driven multi-agent system designed to optimize the reasoning and workflow automation of Small Language Models (SLMs)."
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
    >
      <TeamTemplate
        title="Horizontal Intelligence: Optimizing Small Language Model Reasoning via Role-Driven Multi-Agent Orchestration"
        paragraphs={[
          "Building Horizon AI hasn't just been an academic requirement; it's been a test of our resilience. I am incredibly grateful to my team for pushing through the late nights and massive hurdles of Thesis 1. As we gear up for Thesis 2, I want to wish us all the best of luck. Let's keep the momentum going, finish strong, and cross that graduation stage together next year.",
        ]}
        imageSrc="/projects/horizon/horizon-team.jpg"
        imageAlt="Horizon team photo"
      />
    </ProjectTemplate>
  );
}
