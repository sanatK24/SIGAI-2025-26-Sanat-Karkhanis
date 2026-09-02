import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import LayoutWrapper from "@/components/LayoutWrapper";
import ScrollToTopOnPageChange from "./ScrollToTopOnPageChange";

export const metadata: Metadata = {
  title: "RAIT ACM SIGAI",
  description: "RAIT ACM Special Interest Group on Artificial Intelligence",
  icons: {
    icon: "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1767465246/sigai-logo_bjlgul.webp",
    apple: "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1767465246/sigai-logo_bjlgul.webp",
    shortcut: "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1767465246/sigai-logo_bjlgul.webp"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <ScrollToTopOnPageChange />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
