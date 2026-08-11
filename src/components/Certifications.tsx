export default function Certifications() {
  const certs = [
    {
      title: "AWS Technical Essentials Course",
      provider: "Amazon Web Services (AWS)",
      iconUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
      verifyLink: "#"
    },
    {
      title: "AWS Cloud Practitioner Essentials Course",
      provider: "Amazon Web Services (AWS)",
      iconUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
      verifyLink: "#"
    },
    {
      title: "Data Literacy Professional",
      provider: "DataCamp",
      iconUrl: "https://cdn.simpleicons.org/datacamp/03E812",
      verifyLink: "#"
    }
  ];

  return (
    <section className="py-[54px] md:py-[70px]" id="certifications">
      <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
        <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Certifications</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
        {certs.map((cert, i) => (
          <div key={i} className="group flex flex-col items-center p-[32px] rounded-[16px] border border-line bg-accent/[0.02] hover:bg-accent/[0.04] transition-all duration-300">
            {/* Icon Container */}
            <div className="w-[48px] h-[48px] rounded-[12px] bg-accent/[0.04] border border-line/50 flex items-center justify-center mb-[20px] transition-transform duration-500 group-hover:scale-110">
              <img src={cert.iconUrl} alt={cert.provider} className="w-[24px] h-[24px] object-contain" />
            </div>
            
            {/* Title & Provider */}
            <div className="text-center mb-[auto] flex flex-col items-center">
              <h3 className="text-[15px] md:text-[16px] font-semibold tracking-tight text-text mb-[6px] leading-[1.3] transition-colors duration-300 group-hover:text-accent">
                {cert.title}
              </h3>
              <p className="text-muted font-mono text-[10px] md:text-[11px] uppercase tracking-widest">
                {cert.provider}
              </p>
            </div>

            {/* Verify Link */}
            <a href={cert.verifyLink} target="_blank" className="mt-[28px] text-muted font-mono text-[11px] md:text-[12px] tracking-widest hover:text-text transition-colors flex items-center gap-[6px]">
              <span className="opacity-40">{"{"}</span>
              VERIFY
              <span className="opacity-40">{"}"}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
