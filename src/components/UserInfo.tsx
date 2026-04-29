"use client";

import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Sparkles, Crown, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function UserInfo({ 
  showDetails = true,
  layout = "header" 
}: { 
  showDetails?: boolean;
  layout?: "header" | "sidebar";
}) {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) return null;

  if (layout === "sidebar") {
    return (
      <div className="flex items-center gap-3 w-full group/profile">
        <div className="relative">
          {/* Subtle Glow behind Avatar */}
          <div className="absolute inset-[-2px] bg-indigo-500/20 rounded-full blur-sm opacity-0 group-hover/profile:opacity-100 transition-opacity" />
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 rounded-xl border border-white/10",
                userButtonTrigger: "focus:shadow-none focus:outline-none",
                userButtonPopoverCard: "bg-slate-950 border border-white/10 backdrop-blur-3xl",
              }
            }}
          />
        </div>
        
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white truncate uppercase italic tracking-tight">
              {user.firstName || user.username || "User"}
            </span>
            <div className="px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 text-[8px] font-black text-indigo-400 uppercase tracking-widest">
              PRO
            </div>
          </div>
          <span className="text-[10px] text-slate-500 font-medium truncate">
            {user.primaryEmailAddress?.emailAddress}
          </span>
        </div>

        <button className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group-hover/profile:translate-x-1">
           <Zap className="w-3.5 h-3.5 text-slate-400 group-hover/profile:text-indigo-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 group">
      {/* Credits/Status Indicator - Restored Sizes */}
      {showDetails && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex flex-col items-end gap-1"
        >
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Usage</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)] hover:bg-indigo-500/20 transition-colors cursor-help">
              <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
              <span className="text-[10px] font-black text-indigo-300 tracking-tighter">24 / 100</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
              <Crown className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-black text-amber-300 uppercase tracking-tighter">Pro Elite</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Divider - Thinner and more subtle */}
      {showDetails && <div className="h-6 w-[0.5px] bg-white/5 mx-0.5 hidden md:block" />}

      {/* User Profile Trigger */}
      <div className="relative group/user">
        {/* Kinetic Aura - Softer */}
        <div className="absolute inset-[-4px] bg-indigo-500 blur-[15px] opacity-0 group-hover/user:opacity-20 transition-all duration-700 group-hover/user:scale-110" />
        <div className="absolute inset-[-1px] bg-gradient-to-tr from-indigo-500/40 via-purple-500/40 to-pink-500/40 rounded-full opacity-40 group-hover/user:opacity-100 blur-[1px] transition-all duration-500" />
        
        {/* Profile Container - Fixed Centering & Size */}
        <div className="relative z-10 w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center border border-white/10 group-hover/user:border-white/20 transition-all overflow-hidden">
          {/* Internal Subtle Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
          
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8 rounded-full",
                userButtonTrigger: "focus:shadow-none focus:outline-none transition-transform",
                userButtonPopoverCard: "bg-slate-950 border border-white/10 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-[24px] p-1",
                userButtonPopoverActions: "bg-transparent p-2 space-y-0.5",
                userButtonPopoverActionButton: "hover:bg-indigo-500/10 transition-all py-2.5 rounded-xl border border-transparent hover:border-indigo-500/20 group",
                userButtonPopoverActionButtonText: "!text-white text-[10px] font-black uppercase tracking-[0.15em]",
                userButtonPopoverActionButtonIcon: "text-indigo-400 w-3.5 h-3.5 group-hover:text-indigo-300",
                userButtonPopoverFooter: "hidden", 
                userPreviewMainIdentifier: "!text-white font-black uppercase italic tracking-tighter text-lg",
                userPreviewSecondaryIdentifier: "!text-white/60 font-bold text-[10px] uppercase tracking-widest mt-0.5",
                avatarBox: "border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]",
              }
            }}
          >
             <UserButton.MenuItems>
                <UserButton.Action 
                  label="Quantum Credits" 
                  labelIcon={<Sparkles className="w-4 h-4 text-indigo-400" />} 
                  onClick={() => window.location.href = "/dashboard?tab=growth"}
                />
                <UserButton.Action 
                  label="Billing & Plan" 
                  labelIcon={<Crown className="w-4 h-4 text-amber-400" />} 
                  onClick={() => {}}
                />
             </UserButton.MenuItems>
          </UserButton>
        </div>

        {/* Hover Badge - Smaller */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-indigo-600 rounded-full flex items-center justify-center border border-slate-950 z-30 shadow-lg"
        >
          <Zap className="w-2 h-2 text-white fill-white" />
        </motion.div>
      </div>
    </div>
  );
}
