import Footer from "@/components/custom/footer";

export const metadata = {
  title: "Contact | Vardz",
  description: "Get in touch for collaborations and inquiries.",
};

export default function ContactPage() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#111111", color: "#F4EDE4" }}
    >
      <div
        className="relative flex min-h-screen w-full flex-col overflow-x-hidden pl-20 md:pl-24 pb-12"
        style={{ color: "#F4EDE4" }}
      >
        <main className="flex flex-1 flex-col justify-center max-w-[1400px] w-full mx-auto px-6 md:px-12 py-32 md:py-48">
          <div className="mb-20">
            <span
              className="text-[10px] tracking-[0.3em] font-bold uppercase mb-4 block"
              style={{ color: "rgba(244,237,228,0.5)" }}
            >
              Let's Connect
            </span>
            <h1 className="font-heading font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              Hello.
            </h1>
          </div>

          <div className="max-w-xl">
            <p
              className="text-lg md:text-xl leading-relaxed mb-12"
              style={{ color: "rgba(244,237,228,0.7)" }}
            >
              I am currently open for new opportunities and collaborations.
              Whether you have a project in mind or just want to say hi, I'll
              try my best to get back to you.
            </p>
          </div>
        </main>

        {/* Footer also needs hardcoded colors to match */}
        <div style={{ "--accent": "#F4EDE4", "--base": "#111111" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}