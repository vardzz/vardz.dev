import ProjectTemplate from "@/components/custom/ProjectTemplate";

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
      <section className="bg-[#111111] px-6 pb-28 md:px-16 lg:px-24 lg:pb-36">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mx-auto mb-10 text-3xl leading-tight opacity-90 md:text-5xl">
            Horizontal Intelligence: Optimizing Small Language Model Reasoning via Role-Driven Multi-Agent Orchestration
          </h1>

          <div className="mx-auto max-w-3xl space-y-6 text-center text-base leading-relaxed opacity-90 md:text-lg">
            <p>
              Building Horizon AI hasn't just been an academic requirement; it's been a test of our resilience. I am incredibly grateful to my team for pushing through the late nights and massive hurdles of Thesis 1. As we gear up for Thesis 2, I want to wish us all the best of luck. Let's keep the momentum going, finish strong, and cross that graduation stage together next year.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] px-6 pb-28 md:pl-24 md:pr-16 lg:pl-32 lg:pr-24 lg:pb-36">
        <div className="mx-auto w-full max-w-[1220px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0C0C0C] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <img
            src="/projects/horizon/horizon-team.jpg"
            alt="Horizon team photo"
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
    </ProjectTemplate>
  );
}
