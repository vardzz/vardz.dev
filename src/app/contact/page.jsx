"use client";

import { useState } from "react";
import Footer from "@/components/custom/footer";



export default function ContactPage() {
  const [emailStatus, setEmailStatus] = useState("vardejericho@gmail.com");
  const [isSending, setIsSending] = useState(false);

  const handleTriggerEmail = async () => {
    // Prevent double-clicking
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
          name: "Portfolio Quick-Link",
          message: "A visitor just clicked the instant email link on your contact page!",
        }),
      });

      if (response.ok) {
        setEmailStatus("Message Sent!");
        // Revert back to the email address after 3 seconds
        setTimeout(() => {
          setEmailStatus("vardejericho@gmail.com");
        }, 3000);
      } else {
        setEmailStatus("Failed to send.");
        setTimeout(() => setEmailStatus("vardejericho@gmail.com"), 3000);
      }
    } catch (error) {
      console.error("API Routing Error:", error);
      setEmailStatus("Network Error.");
      setTimeout(() => setEmailStatus("vardejericho@gmail.com"), 3000);
    } finally {
      setIsSending(false);
    }
  };

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
              className="text-lg md:text-xl leading-relaxed mb-8"
              style={{ color: "rgba(244,237,228,0.7)" }}
            >
              I am currently open for new opportunities and collaborations.
              Whether you have a project in mind or just want to say hi, I'll
              try my best to get back to you.
            </p>
            
            {/* The new interactive serverless trigger */}
            <p className="text-lg md:text-xl flex items-center gap-2">
              <span style={{ color: "rgba(244,237,228,0.7)" }}>email me:</span>
              <button
                onClick={handleTriggerEmail}
                disabled={isSending}
                className="underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                style={{ color: "#F4EDE4" }}
              >
                {emailStatus}
              </button>
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