"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function ContentCalendar() {
  const [monthOffset, setMonthOffset] = useState(0);

  const months = ["October 2026", "November 2026", "December 2026"];
  const currentMonthName = months[Math.abs(monthOffset) % months.length];

  const daysByMonth: Record<number, any[]> = {
    0: [
      { day: 'Mon', date: 24, status: 'scheduled', platform: 'Receiving' },
      { day: 'Tue', date: 25, status: 'posted', platform: 'Dispatch' },
      { day: 'Wed', date: 26, status: 'scheduled', platform: 'Audit' },
      { day: 'Thu', date: 27, status: 'empty' },
      { day: 'Fri', date: 28, status: 'scheduled', platform: 'Receiving' },
      { day: 'Sat', date: 29, status: 'empty' },
      { day: 'Sun', date: 30, status: 'empty' },
    ],
    1: [
      { day: 'Mon', date: 1, status: 'scheduled', platform: 'Audit' },
      { day: 'Tue', date: 2, status: 'scheduled', platform: 'Receiving' },
      { day: 'Wed', date: 3, status: 'empty' },
      { day: 'Thu', date: 4, status: 'posted', platform: 'Dispatch' },
      { day: 'Fri', date: 5, status: 'scheduled', platform: 'Receiving' },
      { day: 'Sat', date: 6, status: 'empty' },
      { day: 'Sun', date: 7, status: 'empty' },
    ]
  };

  const days = daysByMonth[Math.abs(monthOffset) % 2];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
            Dispatch & Receiving Schedule <CalendarIcon className="w-5 h-5 text-[#0077C8]" />
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">Manage warehouse dock schedules.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMonthOffset(prev => prev - 1)}
            className="p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-slate-100 text-[#0F172A] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-[#0F172A] px-2 min-w-[100px] text-center">{currentMonthName}</span>
          <button 
            onClick={() => setMonthOffset(prev => prev + 1)}
            className="p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-slate-100 text-[#0F172A] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 flex-1">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase text-center">{d.day}</span>
            <div 
              className={`aspect-square rounded-lg border flex flex-col items-center justify-center p-2 text-center transition-all ${
                d.status === 'empty' 
                  ? 'bg-[#F8FAFC] border-[#E2E8F0]' 
                  : d.status === 'posted'
                    ? 'bg-[#16A34A]/10 border-[#16A34A]/30'
                    : 'bg-[#0F172A] text-white border-[#0F172A]'
              }`}
            >
              <span className={`text-xs font-extrabold ${d.status === 'scheduled' ? 'text-white' : 'text-[#0F172A]'}`}>{d.date}</span>
              
              {d.status !== 'empty' && (
                <span className={`text-[8px] font-bold uppercase tracking-wider mt-1 truncate max-w-full ${d.status === 'scheduled' ? 'text-slate-200' : 'text-[#16A34A]'}`}>
                  {d.platform}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
