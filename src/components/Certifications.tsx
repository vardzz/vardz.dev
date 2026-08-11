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
          <div key={i} className="group flex flex-col items-center justify-between p-[32px] md:p-[40px] rounded-[16px] border border-line bg-transparent hover:border-accent/50 transition-all duration-500">
            {/* Icon Container */}
            <div className="w-[56px] h-[56px] rounded-[14px] bg-[var(--color-line)] flex items-center justify-center mb-[28px] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
              <img src={cert.iconUrl} alt={cert.provider} className="w-[28px] h-[28px] object-contain" />
            </div>
            
            {/* Title & Provider */}
            <div className="text-center mb-[auto] flex flex-col items-center">
              <h3 className="text-[16px] md:text-[18px] font-medium tracking-[-.03em] text-text mb-[8px] leading-[1.4] transition-colors duration-300 group-hover:text-accent">
                {cert.title}
              </h3>
              <p className="text-muted font-mono text-[10px] md:text-[11px] uppercase tracking-[0.05em]">
                {cert.provider}
              </p>
            </div>

            {/* Verify Link */}
            <a href={cert.verifyLink} target="_blank" className="mt-[32px] text-muted font-mono text-[12px] group-hover:text-text transition-colors flex items-center gap-[6px]">
              <span className="opacity-40 group-hover:opacity-100 transition-opacity duration-300">{"{"}</span>
              VERIFY
              <span className="opacity-40 group-hover:opacity-100 transition-opacity duration-300">{"}"}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
