import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/custom/Provider";

const playfairDisplay = Playfair_Display({
  variable: "--font-stardom",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-satoshi",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Vardz | Cloud Enthusiast",
  description: "Portfolio of Jericho Varde, a passionate Software Engineer & Cloud Enthusiast.",
  icons: {
    icon: "/assets/icon.png",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="antialiased bg-base text-accent min-h-screen">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
