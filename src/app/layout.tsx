import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import { ChatProvider } from "../components/layout/ChatProvider";
import ClientLayoutWrapper from "../components/layout/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "Vardz — Cloud & Software Engineer",
  description: "Portfolio of Jericho Varde, a passionate Software Engineer & Cloud Enthusiast.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ChatProvider>
          <ClientLayoutWrapper>
            <div className="min-h-screen transition-colors duration-300 w-full relative">
              <Navbar />
              <div className="pt-6 w-full">
                {children}
              </div>
            </div>
          </ClientLayoutWrapper>
        </ChatProvider>
      </body>
    </html>
  );
}

