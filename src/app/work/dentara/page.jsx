import ProjectTemplate from "@/components/custom/ProjectTemplate";

export default function DentaraPage() {
  return (
    <ProjectTemplate
      projectName="DENTARA"
      projectDescription="Dentara is a health-tech PWA that helps dental students and clinics coordinate patients, records, and supervised care in one simple workflow."
      role="Web Development"
      responsibilities="Consultation, PWA architecture, Supabase integration, UI implementation, and deployment."
      liveUrl="https://dentara.vercel.app/"
      liveUrlText="https://dentara.vercel.app/"
      imageSrc="/projects/dentara/dentara-landing.png"
      imageAlt="Dentara showcase thumbnail"
      nextProjectName="Horizon"
      nextProjectHref="/work/horizon"
    />
  );
}
