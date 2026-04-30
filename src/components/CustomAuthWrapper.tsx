"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function CustomAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#6366f1", // indigo-500
          colorBackground: "#0F172A", // updated background
          colorInputBackground: "#1e293b", // slate-800
          colorInputText: "#ffffff",
          colorText: "#ffffff",
          colorTextSecondary: "#9CA3AF", // updated secondary text
          fontFamily: "var(--font-geist-sans), sans-serif",
          borderRadius: "1rem",
        },
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
        },
        elements: {
          card: "bg-[#020617]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_-15px_rgba(99,102,241,0.4)] rounded-[2rem]",
          headerTitle: "!text-transparent !bg-clip-text !bg-gradient-to-br !from-white !to-white/60 font-black text-3xl tracking-tighter drop-shadow-md",
          headerSubtitle: "!text-indigo-300/80 font-medium text-sm tracking-wide mt-1",
          socialButtonsBlockButton: "!text-white bg-slate-900/50 border border-white/5 hover:border-white/10 hover:bg-slate-800/80 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 rounded-2xl py-3.5",
          socialButtonsBlockButtonText: "!text-white font-bold tracking-wide",
          dividerLine: "bg-gradient-to-r from-transparent via-white/10 to-transparent",
          dividerText: "!text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]",
          formFieldLabel: "!text-slate-300 font-bold text-xs uppercase tracking-wider mb-2",
          formFieldInput: "!text-white bg-slate-900/50 border border-white/5 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 hover:border-white/10 transition-all duration-300 rounded-2xl py-3 px-4",
          formButtonPrimary: "!text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-black tracking-widest uppercase text-sm rounded-2xl py-4 shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",
          footerActionText: "!text-slate-400 font-medium",
          footerActionLink: "!text-indigo-400 hover:!text-indigo-300 font-black tracking-wide transition-colors",
          identityPreview: "bg-indigo-950/20 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.05)] rounded-2xl transition-all hover:border-indigo-500/40 py-4 px-5",
          identityPreviewText: "!text-indigo-50 font-bold tracking-wide",
          identityPreviewEditButtonIcon: "!text-indigo-400 hover:!text-indigo-300 hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]",
          formFieldAction: "!text-indigo-400 hover:!text-indigo-300 font-bold text-xs uppercase tracking-wider transition-colors",
          otpCodeFieldInput: "!text-white !text-2xl !font-black !bg-slate-800 !border-indigo-500/40 hover:!border-indigo-400 hover:!bg-slate-700/80 focus:!border-indigo-400 focus:!ring-4 focus:!ring-indigo-500/30 transition-all duration-300 rounded-2xl shadow-[0_0_15px_rgba(99,102,241,0.2)] h-14 w-12 flex items-center justify-center",
          modalBackdrop: "bg-slate-950/80 backdrop-blur-xl",
          userButtonPopoverCard: {
            backgroundColor: "#0F172A",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
            overflow: "hidden",
          },
          userButtonPopoverHeader: {
            backgroundColor: "#1E293B",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          },
          userButtonPopoverHeaderTitle: {
            color: "#FFFFFF",
            fontWeight: "700",
          },
          userButtonPopoverHeaderSubtitle: {
            color: "#9CA3AF",
          },
          userButtonPopoverActions: {
            backgroundColor: "#0F172A",
            padding: "8px",
          },
          userButtonPopoverActionButton: {
            borderRadius: "10px",
            padding: "10px 12px",
          },
          userButtonPopoverActionButtonText: {
            color: "#E6EAF2",
            fontSize: "13px",
            fontWeight: "500",
          },
          userButtonPopoverFooter: "hidden",        }
      }}
    >
      {children}
    </ClerkProvider>
  );
}
