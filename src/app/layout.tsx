import CustomAuthWrapper from "@/components/CustomAuthWrapper";
import { defaultMetadata } from "./metadata";
import ScrollOptimizer from "@/components/ScrollOptimizer";
import "./globals.css";

const geistSans = { variable: "--font-geist-sans" };
const geistMono = { variable: "--font-geist-mono" };

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} selection:bg-[#16A3A3]/20`}>
      <body className="antialiased min-h-screen bg-[#F5F7FA] text-[#1F2937] overflow-x-hidden">
        <ScrollOptimizer />
        <CustomAuthWrapper>
          <div className="relative flex min-h-screen flex-col isolate bg-[#F5F7FA] text-[#1F2937]">
             {children}
          </div>
        </CustomAuthWrapper>
      </body>
    </html>
  );
}
