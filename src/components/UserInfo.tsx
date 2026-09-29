"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User as UserIcon, LogIn, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function UserInfo({
  showDetails = true,
  layout = "header"
}: {
  showDetails?: boolean;
  layout?: "header" | "sidebar";
}) {
  const { user, logout, openLoginModal } = useAuth();

  if (!user) {
    return (
      <button
        onClick={openLoginModal}
        className="px-4 py-2 bg-[#0077C8] hover:bg-[#0066B0] text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
      >
        <LogIn className="w-4 h-4" /> Sign In
      </button>
    );
  }

  if (layout === "sidebar") {
    return (
      <div className="flex items-center justify-between gap-3 w-full p-2 rounded-xl bg-[#1E293B] border border-[#0077C8]/40">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#0077C8] text-white flex items-center justify-center font-bold text-xs shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col min-w-0 text-left">
            <span className="text-xs font-bold text-white truncate">{user.name}</span>
            <span className="text-[9px] font-bold text-[#00A3E0] uppercase tracking-wider">
              {user.role} OPERATOR
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          title="Sign Out"
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-3 text-left"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0077C8]/10 border border-[#0077C8]/20 text-[#0077C8]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0077C8]" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{user.role} Active</span>
          </div>
        </motion.div>
      )}

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
        <div className="w-7 h-7 rounded-lg bg-[#0077C8] text-white flex items-center justify-center font-bold text-xs shrink-0">
          {user.name.charAt(0)}
        </div>
        <div className="flex flex-col text-left hidden sm:flex">
          <span className="text-xs font-bold text-[#0F172A] leading-none">{user.name}</span>
          <span className="text-[9px] font-semibold text-[#64748B] leading-none mt-0.5">{user.email}</span>
        </div>

        <button
          onClick={logout}
          title="Sign Out"
          className="ml-2 p-1.5 rounded-lg text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
