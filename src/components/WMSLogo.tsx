import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
}

export default function WMSLogo({ variant = "dark", size = "md", showSubtitle = true }: LogoProps) {
  const imageSizes = {
    sm: 28,
    md: 38,
    lg: 48,
  };

  const titleSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const isLight = variant === "light";

  return (
    <div className="flex items-center gap-3 select-none shrink-0">
      <div className={`relative flex items-center justify-center p-1 rounded-lg ${isLight ? "bg-white shadow-sm" : ""}`}>
        <Image
          src="/excel-jet-logo.jpg"
          alt="Excel Jet Warehouse Management System Logo"
          width={imageSizes[size]}
          height={imageSizes[size]}
          className="object-contain rounded-md"
        />
      </div>

      <div className="flex flex-col text-left leading-none">
        <div className="flex items-center gap-1">
          <span className={`font-black tracking-tight ${titleSizes[size]} ${isLight ? 'text-white' : 'text-[#0F172A]'}`}>
            EXCEL<span className="text-[#0077C8]">JET</span>
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-[7.5px] font-extrabold uppercase tracking-wider mt-0.5 whitespace-nowrap ${isLight ? 'text-slate-300' : 'text-[#475569]'}`}>
            Warehouse Management System
          </span>
        )}
      </div>
    </div>
  );
}
