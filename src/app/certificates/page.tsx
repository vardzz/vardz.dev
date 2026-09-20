import React from 'react';
import { Metadata } from 'next';
import CertificateCard from '../../components/certificates/CertificateCard';
import { AwsIcon } from '../../components/root/Certifications';

export const metadata: Metadata = {
  title: "Certificates — Vardz",
};

const DataCampIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <title>DataCamp</title>
    <path d="M12.946 18.151v-5.239L21.209 8.2 19.2 7.048l-6.254 3.567V5.36c0-.356-.192-.689-.5-.866L4.922.177a1.434 1.434 0 0 0-1.455.044 1.438 1.438 0 0 0-.676 1.224v14.777A1.44 1.44 0 0 0 4.92 17.49l6.032-3.44v4.683a1 1 0 0 0 .504.867l7.73 4.4 2.01-1.152-8.25-4.697zM10.953 5.938v5.814L4.785 15.27V2.4l6.168 3.539v-.001z"/>
  </svg>
);

export default function CertificatesPage() {
  const certificateCategories = [
    {
      title: "CLOUD",
      certificates: [
        {
          title: "AWS Technical Essentials",
          provider: "AMAZON WEB SERVICES",
          icon: <AwsIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://drive.google.com/file/d/1uhLjRXghJLVyVC_soSfc3PeYOm5xoEia/view",
          rotation: "-rotate-2",
          translateY: "translate-y-2",
          zIndex: 1
        },
        {
          title: "AWS Cloud Practitioner Essentials",
          provider: "AMAZON WEB SERVICES",
          icon: <AwsIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://drive.google.com/file/d/1uotVanXocFflbTJtAY_uxoY57Vas_ToP/view",
          rotation: "rotate-2",
          translateY: "-translate-y-2",
          zIndex: 2
        }
      ]
    },
    {
      title: "AI",
      certificates: [
        {
          title: "AI Engineer for Developers Associate",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/certificate/AIEDA0019019720935",
          rotation: "-rotate-2",
          translateY: "translate-y-2",
          zIndex: 1
        }
      ]
    },
    {
      title: "DATA",
      certificates: [
        {
          title: "Data Analyst Associate",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/certificate/DAA0015766640456",
          rotation: "rotate-1",
          translateY: "translate-y-2",
          zIndex: 2
        },
        {
          title: "Data Literacy Professional",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/track/2e3174f67f220a1e145b2ed0063b28c495bb09c7",
          rotation: "rotate-2",
          translateY: "-translate-y-2",
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
          <h1 className="m-0 text-[28px] md:text-[32px] font-medium tracking-[-.04em] text-text mb-[16px]">Certifications</h1>
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
              
              {/* Flex Container instead of negative margins for large collections */}
              <div className="flex flex-wrap items-center justify-center gap-[20px]">
                {category.certificates.map((cert, certIdx) => (
                  <div 
                    key={certIdx} 
                    className="transition-transform duration-500 hover:z-30"
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
