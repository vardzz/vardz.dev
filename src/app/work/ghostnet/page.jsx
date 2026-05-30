import ProjectTemplate from "@/components/custom/ProjectTemplate";
import TeamTemplate from "@/components/custom/TeamTemplate";

export default function GhostNetPage() {
  return (
    <ProjectTemplate
      projectName="GhostNet"
      projectDescription="Automates brand-impersonation monitoring by scanning the live web for phishing and typosquats, capturing verifiable evidence, and drafting machine-readable takedown reports."
      role="Technical Lead & Fullstack Engineer"
      responsibilities="As Technical Lead for GhostNet AI, I designed the system architecture, built the core infrastructure, and directed a five-member team through development. I engineered the web scraping pipeline to intercept phishing and typosquatting threats, and integrated the Gemini API to automate the analysis of scraped data."
      liveUrl="https://ghostnet-ai.vercel.app/"
      liveUrlText="https://ghostnet-ai.vercel.app/"
      imageSrc="/projects/ghostnet/ghostnet-landing.png"
      imageAlt="GhostNet AI landing page"
      prevProjectHref="/work/horizon"
      prevProjectName="Horizon AI"
      nextProjectName="Court Catcher"
      nextProjectHref="/work/court-catcher"
    >
      <TeamTemplate
        title="Web Data Unlocked Hackathon: LABLAB.AI"
        paragraphs={[
          "Proud to have participated internationally alongside 2,500 global developers in my second hackathon of the year. This sprint allowed me to pioneer the integration of Bright Data's live web infrastructure to handle target scraping across Google and Bing. Staying hungry for fresh technologies and continuously expanding my technical horizon is the core of my identity as a developer. Much appreciation to my team DEVNUMERO—Raziel, Kurt, Charles, and Paul—for their collaboration and dedication in bringing this autonomous architecture to reality.",
        ]}
        imageSrc="/projects/horizon/horizon-team.jpg"
        imageAlt="Horizon team photo"
      />
    </ProjectTemplate>
  );
}
