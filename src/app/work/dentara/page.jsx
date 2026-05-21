import ProjectTemplate from "@/components/custom/ProjectTemplate";

export default function DentaraPage() {
  return (
    <ProjectTemplate
      projectName="DENTARA"
      projectDescription="Health-tech Progressive Web App (PWA) designed to streamline clinical requirements by seamlessly matching dentistry students with clinical patients."
      role="Lead Full-Stack Engineer"
      responsibilities="End-to-end PWA architecture, Supabase database integration, UI/UX implementation, and full-stack deployment."
      liveUrl="https://dentara.vercel.app/"
      liveUrlText="https://dentara.vercel.app/"
      imageSrc="/projects/dentara/dentara-landing.png"
      imageAlt="Dentara showcase thumbnail"
      nextProjectName="Lunas"
      nextProjectHref="/work/lunas"
    />
  );
}
