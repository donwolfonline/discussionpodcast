import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: "Discussions Podcast | Let's Make Some Impact",
  description:
    "Discussions is a career & life advice podcast hosted by Lama Alhamawi. Join the conversation on career growth, life purpose, and making an impact.",
  keywords: ["podcast", "career advice", "life advice", "Lama Alhamawi", "Discussions"],
  openGraph: {
    title: "Discussions Podcast | Let's Make Some Impact",
    description: "Career & Life Advice Podcast hosted by Lama Alhamawi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
