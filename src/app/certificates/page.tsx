import React from 'react';
import CertificateCard from '../../components/CertificateCard';

export default function CertificatesPage() {
  const certificateCategories = [
    {
      title: "A I",
      certificates: [
        {
          title: "Generative AI Leader",
          provider: "GOOGLE",
          icon: <img src="https://cdn.simpleicons.org/google/4285F4" alt="Google" className="w-[28px] h-[28px] object-contain" />,
          verifyLink: "#",
          rotation: "-rotate-2",
          translateY: "translate-y-4",
          zIndex: 1
        },
        {
          title: "Gemini Certified Educator",
          provider: "GOOGLE",
          icon: <img src="https://cdn.simpleicons.org/google/4285F4" alt="Google" className="w-[28px] h-[28px] object-contain" />,
          verifyLink: "#",
          rotation: "rotate-1",
          translateY: "-translate-y-2",
          zIndex: 2
        },
        {
          title: "Generative AI Certified Professional",
          provider: "ORACLE",
          icon: <img src="https://cdn.simpleicons.org/oracle/F80000" alt="Oracle" className="w-[28px] h-[28px] object-contain" />,
          verifyLink: "#",
          rotation: "-rotate-1",
          translateY: "translate-y-2",
          zIndex: 3
        },
        {
          title: "Neo4j & Generative AI Certification",
          provider: "NEO4J",
          icon: <img src="https://cdn.simpleicons.org/neo4j/008CC1" alt="Neo4j" className="w-[28px] h-[28px] object-contain" />,
          verifyLink: "#",
          rotation: "rotate-2",
          translateY: "translate-y-6",
          zIndex: 4
        },
        {
          title: "Building RAG Apps Using MongoDB",
          provider: "MONGODB",
          icon: <img src="https://cdn.simpleicons.org/mongodb/47A248" alt="MongoDB" className="w-[28px] h-[28px] object-contain" />,
          verifyLink: "#",
          rotation: "-rotate-3",
          translateY: "translate-y-10",
          zIndex: 1
        }
      ]
    },
    {
      title: "C L O U D",
      certificates: [
        {
          title: "AWS Technical Essentials",
          provider: "AMAZON WEB SERVICES",
          icon: <img src="https://cdn.simpleicons.org/amazonaws/FF9900" alt="AWS" className="w-[28px] h-[28px] object-contain" />,
          verifyLink: "https://drive.google.com/file/d/1uhLjRXghJLVyVC_soSfc3PeYOm5xoEia/view",
          rotation: "-rotate-2",
          translateY: "translate-y-2",
          zIndex: 1
        },
        {
          title: "AWS Cloud Practitioner Essentials",
          provider: "AMAZON WEB SERVICES",
          icon: <img src="https://cdn.simpleicons.org/amazonaws/FF9900" alt="AWS" className="w-[28px] h-[28px] object-contain" />,
          verifyLink: "https://drive.google.com/file/d/1uotVanXocFflbTJtAY_uxoY57Vas_ToP/view",
          rotation: "rotate-2",
          translateY: "-translate-y-2",
          zIndex: 2
        }
      ]
    },
    {
      title: "D A T A",
      certificates: [
        {
          title: "Data Literacy Professional",
          provider: "DATACAMP",
          icon: <img src="https://cdn.simpleicons.org/datacamp/03E812" alt="DataCamp" className="w-[28px] h-[28px] object-contain" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/track/2e3174f67f220a1e145b2ed0063b28c495bb09c7",
          rotation: "rotate-0",
          translateY: "translate-y-0",
          zIndex: 1
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300">
      <main className="min-w-0 pb-[100px]">
        
        {/* Header Section */}
        <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0 mb-[60px]">
          <h1 className="m-0 text-[28px] md:text-[32px] font-medium tracking-[-.04em] text-text mb-[16px]">certifications</h1>
          <p className="text-muted text-[14px] leading-[1.6] max-w-[560px]">
            Credentials across AI, cloud, engineering, and project management — each verifiable at its source.
          </p>
        </div>

        {/* Categories Section */}
        <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0 flex flex-col gap-[80px]">
          {certificateCategories.map((category, idx) => (
            <section key={idx} className="relative">
              <h2 className="text-muted font-mono text-[11px] tracking-[.2em] uppercase mb-[40px]">
                {category.title}
              </h2>
              
              {/* Staggered Cards Container */}
              <div className="flex flex-wrap items-center justify-center gap-[-40px] md:gap-[-20px]">
                {category.certificates.map((cert, certIdx) => (
                  <div 
                    key={certIdx} 
                    className="-ml-[20px] sm:-ml-[40px] md:-ml-[60px] first:ml-0 transition-transform duration-500 hover:z-50"
                  >
                    <CertificateCard
                      title={cert.title}
                      provider={cert.provider}
                      icon={cert.icon}
                      verifyLink={cert.verifyLink}
                      rotation={cert.rotation}
                      translateY={cert.translateY}
                      zIndex={cert.zIndex}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
