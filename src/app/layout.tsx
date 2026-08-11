import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vardz | Cloud Enthusiast",
  description: "Portfolio of Jericho Varde, a passionate Software Engineer & Cloud Enthusiast.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

