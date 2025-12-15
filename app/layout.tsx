import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Website Generator - Create Websites from Text Prompts",
  description: "Generate complete, responsive websites instantly using AI. Simply describe your website and watch it come to life.",
  keywords: ["AI website builder", "website generator", "no-code", "AI design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
