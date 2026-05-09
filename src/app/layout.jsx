import localFont from "next/font/local";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/custom/Provider";
import Sidebar from "@/components/custom/sidebar";
import Template from "./template";

// 1. Setup Melodrama as a local font
const melodrama = localFont({
  src: "./fonts/Melodrama-Variable.ttf", // Make sure this matches your downloaded file name!
  variable: "--font-melodrama",
  display: "swap",
});

// 2. Setup Nunito from Google Fonts
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Ensure both the generated classNames and variables are applied to html

export const metadata = {
  title: "Vardz | Cloud Enthusiast",
  description: "Portfolio of Jericho Varde, a passionate Software Engineer & Cloud Enthusiast.",
  icons: {
    icon: "/assets/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    // 3. Inject BOTH font variables and generated classNames into the HTML tag
    <html
      lang="en"
      suppressHydrationWarning
      className={`${melodrama.variable} ${melodrama.className || ''} ${nunito.variable} ${nunito.className || ''}`}
    >
      <body className="antialiased bg-base text-accent min-h-screen font-sans">
        <Provider>
          <Sidebar />
          <Template>{children}</Template>
        </Provider>
      </body>
    </html>
  );
}