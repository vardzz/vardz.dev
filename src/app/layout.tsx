import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import { ChatProvider } from "../components/layout/ChatProvider";
import ClientLayoutWrapper from "../components/layout/ClientLayoutWrapper";
import { TypingTestModal } from "../components/typing-test/TypingTestModal";
import OnboardingAnimation from "../components/layout/OnboardingAnimation";
import JsonLd from "../components/seo/JsonLd";

const siteUrl = 'https://vardz.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vardz — Cloud & Software Engineer",
    template: "%s | Vardz",
  },
  description: "Portfolio of Jericho Varde, a passionate Software Engineer & Cloud Enthusiast specializing in full-stack web applications, cloud architecture, and AI systems.",
  applicationName: "Vardz Portfolio",
  authors: [{ name: "Jericho Varde", url: siteUrl }],
  creator: "Jericho Varde",
  publisher: "Jericho Varde",
  keywords: [
    "Jericho Varde",
    "Vardz",
    "Software Engineer",
    "Cloud Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "AWS",
    "AI Systems",
    "Web Developer Philippines",
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Vardz — Cloud & Software Engineer",
    description: "Portfolio of Jericho Varde, a passionate Software Engineer & Cloud Enthusiast specializing in full-stack web applications, cloud architecture, and AI systems.",
    siteName: "Vardz",
    images: [
      {
        url: "/assets/Vardz-dark.png",
        width: 1200,
        height: 630,
        alt: "Jericho Varde — Cloud & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vardz — Cloud & Software Engineer",
    description: "Portfolio of Jericho Varde, a passionate Software Engineer & Cloud Enthusiast.",
    creator: "@vardzz",
    images: ["/assets/Vardz-dark.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
      </head>
      <body>
        <JsonLd />
        <OnboardingAnimation />
        <ChatProvider>
          <ClientLayoutWrapper>
            <div className="min-h-screen transition-colors duration-300 w-full relative">
              <Navbar />
              <div className="pt-6 w-full">
                {children}
              </div>
              <TypingTestModal />
            </div>
          </ClientLayoutWrapper>
        </ChatProvider>
      </body>
    </html>
  );
}

