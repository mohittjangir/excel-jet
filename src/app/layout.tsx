import CustomAuthWrapper from "@/components/CustomAuthWrapper";
import { defaultMetadata } from "./metadata";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollOptimizer from "@/components/ScrollOptimizer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} selection:bg-indigo-500/30`}>
      <body className="antialiased min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
        <ScrollOptimizer />
        <CustomAuthWrapper>
          <div className="relative flex min-h-screen flex-col isolate">
             {children}
          </div>
        </CustomAuthWrapper>
      </body>
    </html>
  );
}
