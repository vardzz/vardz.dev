import React from 'react';
import CertificateCard from '../../components/CertificateCard';
import { AwsIcon } from '../../components/Certifications';

const AnthropicIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <title>Anthropic</title>
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
  </svg>
);

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
        },
        {
          title: "Introduction to Cloud Computing",
          provider: "SIMPLILEARN",
          icon: <span className="font-serif font-bold text-[18px]">S</span>,
          verifyLink: "https://drive.google.com/file/d/1ZaZZb0qA68pYr_hxPzhNTtdXROHWzeTb/view",
          rotation: "-rotate-1",
          translateY: "translate-y-1",
          zIndex: 3
        }
      ]
    },
    {
      title: "AI",
      certificates: [
        {
          title: "Claude with Google Cloud's Vertex AI",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/efnafnbyoraa",
          rotation: "-rotate-2",
          translateY: "translate-y-2",
          zIndex: 1
        },
        {
          title: "Claude with Amazon Bedrock",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/perhpfj7subh",
          rotation: "rotate-1",
          translateY: "-translate-y-1",
          zIndex: 2
        },
        {
          title: "Model Context Protocol - Advanced Topics",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/wtpozbpxsr2q",
          rotation: "-rotate-1",
          translateY: "translate-y-1",
          zIndex: 3
        },
        {
          title: "Introduction to Subagents",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/rve88ywv5ybq",
          rotation: "rotate-2",
          translateY: "-translate-y-2",
          zIndex: 1
        },
        {
          title: "Introduction to Model Context Protocol",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/ov2pxutmxd3c",
          rotation: "-rotate-2",
          translateY: "translate-y-1",
          zIndex: 2
        },
        {
          title: "Claude Platform 101",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/fy55hzgu8k4z",
          rotation: "rotate-1",
          translateY: "translate-y-2",
          zIndex: 3
        },
        {
          title: "Claude Code in Actions",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/rkz2xyj4u3mb",
          rotation: "rotate-0",
          translateY: "-translate-y-1",
          zIndex: 1
        },
        {
          title: "Claude Code 101",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/x7fxuqrhyod2",
          rotation: "-rotate-1",
          translateY: "translate-y-2",
          zIndex: 2
        },
        {
          title: "AI Fluency for Non-Profits",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/buciuhdsnr36",
          rotation: "rotate-2",
          translateY: "-translate-y-2",
          zIndex: 3
        },
        {
          title: "Teaching AI Fluency Framework",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/jdftukb9wcen",
          rotation: "-rotate-2",
          translateY: "translate-y-1",
          zIndex: 1
        },
        {
          title: "AI Fluency for Educators",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/ed2oxacnms2g",
          rotation: "rotate-1",
          translateY: "translate-y-2",
          zIndex: 2
        },
        {
          title: "AI Fluency for Small Businesses",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/mv3vxtjd77c2",
          rotation: "-rotate-1",
          translateY: "-translate-y-1",
          zIndex: 3
        },
        {
          title: "AI Fluency for Students",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/j7eo4kmdum38",
          rotation: "rotate-2",
          translateY: "translate-y-1",
          zIndex: 1
        },
        {
          title: "AI Capabilities and Limitations",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/ir4i7rf6u7cz",
          rotation: "-rotate-2",
          translateY: "translate-y-2",
          zIndex: 2
        },
        {
          title: "Introduction to Claude Cowork",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/opsr3h8ug9sb",
          rotation: "rotate-1",
          translateY: "-translate-y-2",
          zIndex: 3
        },
        {
          title: "Claude with the Anthropic API",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/f8pxrg3mhed6",
          rotation: "-rotate-1",
          translateY: "translate-y-1",
          zIndex: 1
        },
        {
          title: "Introduction to Agent Skills",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/sqjv7aif3zun",
          rotation: "rotate-2",
          translateY: "-translate-y-1",
          zIndex: 2
        },
        {
          title: "AI Fluency for Builders",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/pn8uvprn69zp",
          rotation: "-rotate-2",
          translateY: "translate-y-2",
          zIndex: 3
        },
        {
          title: "Claude 101",
          provider: "ANTHROPIC",
          icon: <AnthropicIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://verify.skilljar.com/c/o8n8vk9cdeer",
          rotation: "rotate-1",
          translateY: "-translate-y-2",
          zIndex: 1
        },
        {
          title: "No Code AI Agent Builder",
          provider: "SIMPLILEARN",
          icon: <span className="font-serif font-bold text-[18px]">S</span>,
          verifyLink: "https://drive.google.com/file/d/1fAVuEK8TDT1cE00tMUozlRrbzFdcNRbV/view",
          rotation: "-rotate-1",
          translateY: "translate-y-1",
          zIndex: 2
        }
      ]
    },
    {
      title: "DATA",
      certificates: [
        {
          title: "Joining Data in SQL",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/course/5a9db308461a5134fc7e862e3d45b5be754714cf",
          rotation: "-rotate-2",
          translateY: "translate-y-2",
          zIndex: 1
        },
        {
          title: "Intermediate SQL",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/course/6936d10c0fcf6ad54026ce29f705129513116feb",
          rotation: "rotate-1",
          translateY: "-translate-y-1",
          zIndex: 2
        },
        {
          title: "Introduction to SQL",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/course/367c158d5f053538d7bae1da37460dc98cfe0ad5",
          rotation: "-rotate-1",
          translateY: "translate-y-1",
          zIndex: 3
        },
        {
          title: "Data Literacy Professional",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/track/2e3174f67f220a1e145b2ed0063b28c495bb09c7",
          rotation: "rotate-2",
          translateY: "-translate-y-2",
          zIndex: 1
        },
        {
          title: "Data Story Telling Concepts",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/course/4d0bef953a786cd9ee69889d9a79dd113fd1edc4",
          rotation: "-rotate-2",
          translateY: "translate-y-1",
          zIndex: 2
        },
        {
          title: "Forming Analytical Questions",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/course/03b6d2b5447c6c1b677a696590f3e86ee44f7a85",
          rotation: "rotate-1",
          translateY: "translate-y-2",
          zIndex: 3
        },
        {
          title: "Introduction to Data Culture",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/course/4a65b7025acf9b30a1527b7674b6fb97a4023c28",
          rotation: "rotate-0",
          translateY: "-translate-y-1",
          zIndex: 1
        },
        {
          title: "Introduction to Statistics",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/course/b8d881ebcb566aa579ac2185ce224378ca9a545c",
          rotation: "-rotate-1",
          translateY: "translate-y-2",
          zIndex: 2
        },
        {
          title: "Communicating Data Insights",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/course/afb24cd6086e13dc10bacdbced3bd02c38146019",
          rotation: "rotate-2",
          translateY: "-translate-y-2",
          zIndex: 3
        },
        {
          title: "Introduction to Data",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/course/0a87c8f2e69236b61036d54a703566477fb3ab09",
          rotation: "-rotate-2",
          translateY: "translate-y-1",
          zIndex: 1
        },
        {
          title: "Introduction to Python",
          provider: "DATACAMP",
          icon: <DataCampIcon className="w-[28px] h-[28px] text-text" />,
          verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/course/ae8bdb64fd561f3640b248fd455ee19ade17c986",
          rotation: "rotate-1",
          translateY: "translate-y-2",
          zIndex: 2
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
                    className="transition-transform duration-500 hover:z-50"
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
