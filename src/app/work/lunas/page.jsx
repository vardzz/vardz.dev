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
    />
  );
}
