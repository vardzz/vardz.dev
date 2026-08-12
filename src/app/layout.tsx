import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

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
        <div className="min-h-screen transition-colors duration-300">
          <Navbar />
          <div className="pt-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

