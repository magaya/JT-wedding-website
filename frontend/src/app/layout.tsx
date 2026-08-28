import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joseph & Thea | Wedding Invitation | September 3, 2027",
  description: "Joseph and Thea are getting married at Kampala Baptist church in Uganda and would be honoured to have you celebrate with them.",
  keywords: ["Wedding", "Joseph and Thea", "Kampala Baptist Church", "Uganda Wedding", "RSVP"],
  openGraph: {
    title: "Joseph & Thea | Wedding Celebration",
    description: "Counting the days to the most special day of our lives. Join us on September 3, 2027.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <body className="bg-[#FAF7F2] text-[#2C2723] font-sans antialiased min-h-screen selection:bg-[#D4AF37]/30 selection:text-[#1A1816]">
        {children}
      </body>
    </html>
  );
}
