const AwsIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M11.968 15.011c-2.457 0-4.838-.456-7.067-1.348A16.035 16.035 0 0 0 .584 9.176l.019-.044c.642.345 1.345.626 2.083.843a14.735 14.735 0 0 0 4.103.585c1.602 0 3.251-.237 4.898-.707 1.637-.468 3.033-1.077 4.148-1.808l.128-.088.169.103c.594.364 1.229.68 1.884.945a12.631 12.631 0 0 0 4.298.749c.895 0 1.714-.087 2.433-.258l.107-.027-.089.066c-1.332.973-2.909 1.764-4.697 2.355-1.36.45-2.822.675-4.346.675Zm-2.793-4.618a.333.333 0 0 1-.368-.201l-1.63-4.475h-1.46L8.47 13.064h1.493l1.79-5.184c.142-.423.238-.802.288-1.134h.022c.045.313.141.68.288 1.1l1.83 5.218h1.46l2.673-7.346h-1.439l-1.576 4.382a8.675 8.675 0 0 1-.299 1.054h-.022a8.6 8.6 0 0 1-.301-1.056l-1.872-5.32h-1.352l-1.785 5.286a11.134 11.134 0 0 1-.31 1.056h-.02a9.124 9.124 0 0 1-.323-1.073l-.337-.89ZM19.264 5.72c-.896 0-1.564.218-1.986.647-.421.43-.633 1.026-.633 1.77 0 .614.156 1.092.463 1.423.308.33.722.497 1.233.497.643 0 1.25-.262 1.802-.78v.83c-.615.424-1.325.635-2.115.635-.916 0-1.642-.275-2.155-.82-.511-.546-.771-1.286-.771-2.198 0-.964.303-1.745.901-2.321.599-.575 1.393-.865 2.358-.865.753 0 1.455.19 2.086.564v1.173a3.526 3.526 0 0 0-1.183-.555ZM3.81 7.235c0-.495-.145-.884-.431-1.157-.286-.273-.665-.412-1.127-.412-.485 0-.974.148-1.453.439v1.27c.435-.333.868-.501 1.29-.501.442 0 .664.212.664.633v.352c-.443-.021-.84-.032-1.183-.032-1.11 0-1.666.426-1.666 1.272 0 .426.136.758.405 1.003.27.243.626.366 1.062.366.653 0 1.182-.234 1.572-.697v.646h1.36V7.235ZM1.996 9.537c.365 0 .736-.115 1.103-.342v-1.12c-.378.077-.798.117-1.25.117-.502 0-.756.208-.756.621 0 .484.3.724.903.724Zm20.407-2.602 1.405-.286v3.298c0 1.828-.962 2.753-2.859 2.753-1.037 0-1.897-.246-2.553-.732l.532-1.166c.643.376 1.259.566 1.829.566.502 0 .864-.131 1.077-.389.213-.259.322-.656.322-1.181v-.435a2.535 2.535 0 0 1-1.745.714c-.666 0-1.196-.226-1.578-.671-.383-.448-.577-1.042-.577-1.767 0-.765.234-1.38.696-1.83.461-.453 1.034-.682 1.7-.682.686 0 1.275.253 1.749.752V6.935Zm-.243 1.53c0-.422-.128-.759-.38-1.002-.254-.243-.586-.366-.99-.366-.412 0-.749.123-1.003.366-.254.243-.383.58-.383 1.002 0 .438.127.781.38 1.022.253.242.59.364 1.002.364.412 0 .745-.122 1.001-.364.256-.241.373-.584.373-1.022Zm1.654 4.093h1.005l.394 1.34h-1.03l-.37-1.34Z"/>
  </svg>
);

export default function Certifications() {
  const certs = [
    {
      title: "AWS Technical Essentials Course",
      provider: "Amazon Web Services",
      icon: <AwsIcon className="w-[24px] h-[24px] text-text" />,
      verifyLink: "https://drive.google.com/file/d/1uhLjRXghJLVyVC_soSfc3PeYOm5xoEia/view"
    },
    {
      title: "AWS Cloud Practitioner Essentials Course",
      provider: "Amazon Web Services",
      icon: <AwsIcon className="w-[24px] h-[24px] text-text" />,
      verifyLink: "https://drive.google.com/file/d/1uotVanXocFflbTJtAY_uxoY57Vas_ToP/view"
    },
    {
      title: "Data Literacy Professional",
      provider: "DataCamp",
      icon: <img src="https://cdn.simpleicons.org/datacamp/03E812" alt="DataCamp" className="w-[24px] h-[24px] object-contain" />,
      verifyLink: "https://www.datacamp.com/completed/statement-of-accomplishment/track/2e3174f67f220a1e145b2ed0063b28c495bb09c7"
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
              {cert.icon}
            </div>
            
            {/* Title & Provider */}
            <div className="text-center mb-[auto] flex flex-col items-center">
              <h3 className="text-[13px] md:text-[14px] font-semibold tracking-tight text-text mb-[6px] leading-[1.4] transition-colors duration-300 group-hover:text-accent">
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
