"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, X, KeyRound, AlertCircle, Shield, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";

export default function SimpleLoginModal() {
  const router = useRouter();
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"ADMIN" | "STAFF">("ADMIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = login(email, password, selectedRole);
    if (!res.success) {
      setError(res.error || "Failed to sign in");
    } else {
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    }
  };

  const handleFillCredentials = (fillEmail: string, fillPass: string, role: "ADMIN" | "STAFF") => {
    setEmail(fillEmail);
    setPassword(fillPass);
    setSelectedRole(role);
    setError("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#172033] border border-[#2A364F] rounded-2xl p-8 max-w-md w-full text-white shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={closeLoginModal}
            className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Sign In</h2>
            <p className="text-sm text-slate-400">Access your warehouse portal</p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-semibold text-red-400 flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* 1. Login Role Selection (Radio Buttons) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Select Login Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Admin Radio Option */}
                <label
                  onClick={() => setSelectedRole("ADMIN")}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all select-none ${
                    selectedRole === "ADMIN"
                      ? "bg-[#0077C8]/20 border-[#0077C8] text-white shadow-md ring-1 ring-[#0077C8]/50"
                      : "bg-[#1E293B]/60 border-[#334155] text-slate-400 hover:border-slate-500 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className={`w-4 h-4 ${selectedRole === "ADMIN" ? "text-[#0077C8]" : "text-slate-400"}`} />
                    <span className="text-xs font-bold">Admin Login</span>
                  </div>
                  <input
                    type="radio"
                    name="loginRole"
                    value="ADMIN"
                    checked={selectedRole === "ADMIN"}
                    onChange={() => setSelectedRole("ADMIN")}
                    className="w-4 h-4 accent-[#0077C8] cursor-pointer"
                  />
                </label>

                {/* Staff Radio Option */}
                <label
                  onClick={() => setSelectedRole("STAFF")}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all select-none ${
                    selectedRole === "STAFF"
                      ? "bg-[#16A34A]/20 border-[#16A34A] text-white shadow-md ring-1 ring-[#16A34A]/50"
                      : "bg-[#1E293B]/60 border-[#334155] text-slate-400 hover:border-slate-500 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className={`w-4 h-4 ${selectedRole === "STAFF" ? "text-[#16A34A]" : "text-slate-400"}`} />
                    <span className="text-xs font-bold">Staff Login</span>
                  </div>
                  <input
                    type="radio"
                    name="loginRole"
                    value="STAFF"
                    checked={selectedRole === "STAFF"}
                    onChange={() => setSelectedRole("STAFF")}
                    className="w-4 h-4 accent-[#16A34A] cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === "ADMIN" ? "admin@warehouse.com" : "rahul@warehouse.com"}
                className="w-full bg-[#1E293B]/80 border border-[#334155] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1E293B]/80 border border-[#334155] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-[#4F46E5]/25 active:scale-[0.99]"
            >
              Sign In as {selectedRole === "ADMIN" ? "Admin" : "Staff"}
            </button>
          </form>

          {/* Development Credentials Box */}
          <div className="mt-6 p-4 bg-[#1E293B]/40 border border-[#334155] rounded-xl text-left">
            <div className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <span>🔑</span> Development Credentials
            </div>
            <div className="space-y-1.5 text-xs text-slate-400 font-mono">
              <div 
                onClick={() => handleFillCredentials("admin@warehouse.com", "Admin@123456", "ADMIN")}
                className="hover:bg-[#1E293B] p-2 rounded-lg cursor-pointer transition-colors flex items-center justify-between border border-transparent hover:border-[#0077C8]/40"
              >
                <span><strong className="text-slate-300 font-sans">Admin:</strong> admin@warehouse.com / Admin@123456</span>
                <span className="text-[10px] text-[#0077C8] font-sans font-bold">Auto-fill Admin</span>
              </div>
              <div 
                onClick={() => handleFillCredentials("rahul@warehouse.com", "Staff@123456", "STAFF")}
                className="hover:bg-[#1E293B] p-2 rounded-lg cursor-pointer transition-colors flex items-center justify-between border border-transparent hover:border-[#16A34A]/40"
              >
                <span><strong className="text-slate-300 font-sans">Staff:</strong> rahul@warehouse.com / Staff@123456</span>
                <span className="text-[10px] text-[#16A34A] font-sans font-bold">Auto-fill Staff</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
