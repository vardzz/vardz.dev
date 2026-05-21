import ProjectTemplate from "@/components/custom/ProjectTemplate";

export default function LunasPage() {
  return (
    <ProjectTemplate
      projectName="Lunas"
      projectDescription="A secure, web-based emergency medical passport that provides PRC-verified professionals with instant, PIN-restricted access to a patient's critical health data via QR code."
      role="Lead Frontend Engineer"
      responsibilities="System architecture using Next.js and PostgreSQL, implementing secure QR-based access protocols, and developing the administrative monitoring dashboard."
      liveUrl="https://lunas.software/"
      liveUrlText="https://lunas.software/"
      imageSrc="/projects/lunas/lunas-landing.png"
      imageAlt="Lunas showcase thumbnail"
      nextProjectName="Horizon"
      nextProjectHref="/work/horizon"
    >
      <section className="bg-[#111111] px-6 pb-28 md:px-16 lg:px-24 lg:pb-36">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mx-auto mb-10 text-3xl leading-tight opacity-90 md:text-5xl">
            SIKAPTala 2026: The National CS & IT Competition!
          </h1>

          <div className="mx-auto max-w-3xl space-y-6 text-center text-base leading-relaxed opacity-90 md:text-lg">
            <p>
              Stepping into my very first hackathon was a mix of intense excitement and pressure. Out of over 70 competing teams from different colleges and universities across the Philippines, we pushed our project, Lunas—a secure, web-based emergency medical passport—and managed to break into the Top 8. It was a massive milestone and an experience I am deeply grateful for.
            </p>
            <p>
              A massive thank you to my incredible teammates—Raziel, Kurt, Charles, Paul, Christian, Emiel, and Charles. We took the challenge head-on, trusted each other&apos;s strengths, and built something we are genuinely proud of.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] px-6 pb-28 md:px-16 lg:px-24 lg:pb-36">
        <div className="mx-auto w-full max-w-[1220px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0C0C0C] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <img
            src="/projects/lunas/team-otso-otso.jpg"
            alt="Lunas team photo"
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
    </ProjectTemplate>
  );
}
