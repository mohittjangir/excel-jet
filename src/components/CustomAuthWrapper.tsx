"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function CustomAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#4f46e5", // indigo-600
          colorBackground: "#020617", // slate-950
          colorInputBackground: "#0f172a", // slate-900
          colorInputText: "#f8fafc", // slate-50
          colorText: "#f8fafc",
          colorTextSecondary: "#94a3b8", // slate-400
          fontFamily: "var(--font-geist-sans), sans-serif",
          borderRadius: "1rem",
        },
        elements: {
          card: "bg-slate-950 border border-white/10 shadow-2xl backdrop-blur-3xl",
          headerTitle: "font-black text-2xl uppercase italic tracking-tight text-white",
          headerSubtitle: "font-medium text-slate-400",
          formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 font-bold tracking-wide uppercase shadow-xl shadow-indigo-600/20 transition-all",
          formFieldInput: "border-white/10 bg-slate-900 focus:border-indigo-500/50 focus:ring-indigo-500/50 transition-all",
          formFieldLabel: "text-slate-300 font-bold text-xs uppercase tracking-widest",
          footerActionLink: "text-indigo-400 hover:text-indigo-300 font-bold",
          identityPreview: "bg-slate-900 border border-white/5",
          identityPreviewText: "text-white",
          socialButtonsBlockButton: "border-white/10 hover:bg-slate-900 text-white font-semibold transition-all",
          dividerLine: "bg-white/10",
          dividerText: "text-slate-500 font-bold uppercase tracking-widest text-[10px]",
        }
      }}
    >
      {children}
    </ClerkProvider>
  );
}
