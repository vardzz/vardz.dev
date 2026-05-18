"use client";

import { useState } from "react";
import Footer from "@/components/custom/footer";

export default function ContactPage() {
  const [visitorEmail, setVisitorEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("Send Email");
  const [isSending, setIsSending] = useState(false);

  const handleTriggerEmail = async (e) => {
    e.preventDefault();
    
    if (!visitorEmail || !visitorEmail.includes("@")) {
      setEmailStatus("Please enter a valid email");
      setTimeout(() => setEmailStatus("Send Email"), 3000);
      return;
    }

    if (isSending || emailStatus === "Message Sent!") return;

    setIsSending(true);
    setEmailStatus("Sending...");

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_AWS_EMAIL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Portfolio Visitor",
          email: visitorEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailStatus("Message Sent!");
        setVisitorEmail(""); 
        setTimeout(() => setEmailStatus("Send Email"), 3000);
      } else if (response.status === 429) {
        // THIS IS NEW: Catches the Rate Limit from AWS DynamoDB
        setEmailStatus("Daily limit reached.");
        setTimeout(() => setEmailStatus("Send Email"), 3000);
      } else {
        setEmailStatus("Failed to send.");
        setTimeout(() => setEmailStatus("Send Email"), 3000);
      }
    } catch (error) {
      console.error("API Routing Error:", error);
      setEmailStatus("Network Error.");
      setTimeout(() => setEmailStatus("Send Email"), 3000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#111111] text-[#F4EDE4]">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24 pl-0 text-[#F4EDE4] md:pl-24 md:pb-0">
        <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-6 py-24 md:px-12 md:py-48">
          <div className="mb-8 md:mb-16">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#F4EDE4]/50">
              Let's Connect
            </span>
            <h1 className="font-heading font-display text-5xl font-black leading-[0.9] tracking-tighter break-words hyphens-auto md:text-8xl">
              Hello.
            </h1>
          </div>

          <div className="w-full max-w-xl">
            <p className="mb-8 text-lg leading-relaxed text-[#F4EDE4]/70 md:mb-16 md:text-xl">
              I am currently open for new opportunities and collaborations.
              Whether you have a project in mind or just want to say hi, I'll
              try my best to get back to you.
            </p>
            
            <form onSubmit={handleTriggerEmail} className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                disabled={isSending}
                required
                className="w-full appearance-none border-0 border-b border-[#333333] bg-transparent px-0 py-2 text-[#F4EDE4] shadow-none transition-colors focus:border-[#F4EDE4] focus:outline-none focus:ring-0 disabled:opacity-50 sm:w-80"
                style={{
                  WebkitBoxShadow: "0 0 0px 1000px #111111 inset",
                  WebkitTextFillColor: "#F4EDE4",
                }}
              />
              <button
                type="submit"
                disabled={isSending}
                className="cursor-pointer underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {emailStatus}
              </button>
            </form>
            
          </div>
        </main>

        <div style={{ "--accent": "#F4EDE4", "--base": "#111111" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}