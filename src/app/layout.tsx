import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HealthCheck - GitHub Repository Readiness Check",
  description: "Analyze GitHub repositories for contributor readiness, dependency overview, and best practices.",
  keywords: "GitHub, repository, health check, open source, contributor readiness",
  openGraph: {
    title: "HealthCheck - GitHub Repository Readiness Check",
    description: "Analyze GitHub repositories for contributor readiness, dependency overview, and best practices.",
    url: "https://healthcheck-mini.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://github.com/user-attachments/assets/950aeff6-8d64-46f7-bafd-d3008bb0698d",
        width: 1200,
        height: 630,
        alt: "HealthCheck App Preview",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
