import ProjectTemplate from "@/components/custom/ProjectTemplate";
import TeamTemplate from "@/components/custom/TeamTemplate";

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
      prevProjectName="Dentara"
      prevProjectHref="/work/dentara"
      nextProjectName="Horizon"
      nextProjectHref="/work/horizon"
    >
      <TeamTemplate
        title="SIKAPTala 2026: The National CS & IT Competition!"
        paragraphs={[
          "Stepping into my very first hackathon was a mix of intense excitement and pressure. Out of over 70 competing teams from different colleges and universities across the Philippines, we pushed our project, Lunas—a secure, web-based emergency medical passport—and managed to break into the Top 8. It was a massive milestone and an experience I am deeply grateful for.",
          <>
            A massive thank you to my incredible teammates—
            <a
              href="#"
              className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-current"
            >
              Raziel
            </a>
            ,{" "}
            <a
              href="https://krtdotcode-portfolio.vercel.app/"
              className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-current"
            >
              Kurt
            </a>
            ,{" "}
            <a
              href="https://charlesplaton.vercel.app/"
              className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-current"
            >
              Charles
            </a>
            ,{" "}
            <a
              href="#"
              className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-current"
            >
              Paul
            </a>
            ,{" "}
            <a
              href="#"
              className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-current"
            >
              Christian
            </a>
            ,{" "}
            <a
              href="#"
              className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-current"
            >
              Emiel
            </a>
            , and{" "}
            <a
              href="#"
              className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-current"
            >
              Charles
            </a>
            . We took the challenge head-on, trusted each other's strengths,
            and built something we are genuinely proud of.
          </>,
        ]}
        imageSrc="/projects/lunas/team-otso-otso.jpg"
        imageAlt="Lunas team photo"
      />
    </ProjectTemplate>
  );
}
