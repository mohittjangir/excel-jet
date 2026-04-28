"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Bot, LayoutDashboard, History, Settings, Sparkles, 
  BrainCircuit, Target, Clock, MessageSquareQuote,
  Palette, BarChart3, Users, Film, Wand2, Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UploadZone from "@/components/UploadZone";
import StatsOverview from "@/components/dashboard/StatsOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentProjectsList from "@/components/dashboard/RecentProjectsList";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import SocialIntegrations from "@/components/dashboard/SocialIntegrations";
import TrendingTemplates from "@/components/dashboard/TrendingTemplates";
import ViralHooks from "@/components/dashboard/ViralHooks";
import AIVoiceSettings from "@/components/dashboard/AIVoiceSettings";
import AvatarSelection from "@/components/dashboard/AvatarSelection";
import BackgroundEffects from "@/components/BackgroundEffects";

// New Pro Suite Components
import BrandKitManager from "@/components/dashboard/BrandKitManager";
import CaptionPresets from "@/components/dashboard/CaptionPresets";
import MobilePreviewer from "@/components/dashboard/MobilePreviewer";
import ContentCalendar from "@/components/dashboard/ContentCalendar";
import OmnichannelTool from "@/components/dashboard/OmnichannelTool";
import TeamWorkspace from "@/components/dashboard/TeamWorkspace";
import BRollSuggester from "@/components/dashboard/BRollSuggester";

type TabType = 'overview' | 'creative' | 'growth' | 'collaboration' | 'production';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'creative', label: 'Creative', icon: Palette },
    { id: 'production', label: 'Production', icon: Film },
    { id: 'growth', label: 'Growth', icon: BarChart3 },
    { id: 'collaboration', label: 'Collab', icon: Users },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-16"
          >
            <StatsOverview />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-10 text-left"
                >
                  <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-500">
                    Create a new project
                  </h1>
                  <p className="text-slate-400 font-medium text-lg">Upload your video or start with a quick action.</p>
                </motion.div>

                <div className="space-y-10">
                  <UploadZone />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-3 shadow-lg">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Strategy</p>
                        <p className="text-sm font-bold text-slate-200">Informative</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-3 shadow-lg">
                      <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-pink-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Duration</p>
                        <p className="text-sm font-bold text-slate-200">60 Seconds</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-3 cursor-pointer group shadow-lg">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <MessageSquareQuote className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Tone</p>
                        <p className="text-sm font-bold text-slate-200">Professional</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <QuickActions />
              </div>

              <div className="xl:col-span-1">
                <ActivityFeed />
              </div>
            </div>

            <div className="pt-10 border-t border-slate-900/50">
              <div className="mb-10 text-left">
                <h3 className="text-3xl font-black tracking-tighter uppercase italic text-slate-100 flex items-center gap-3">
                  AI Brain <BrainCircuit className="w-8 h-8 text-indigo-400" />
                </h3>
                <p className="text-slate-400 font-medium text-lg mt-1">Foundational settings for your projects.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ViralHooks />
                <AIVoiceSettings />
                <AvatarSelection />
              </div>
            </div>

            <div className="pt-10 border-t border-slate-900/50">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-black tracking-tighter uppercase italic text-slate-100">
                  Recent Projects
                </h3>
                <Link href="/history" className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-all bg-indigo-500/5 px-4 py-2 rounded-full border border-indigo-500/10 hover:border-indigo-500/30 uppercase tracking-widest">
                  View all
                </Link>
              </div>
              
              <RecentProjectsList />
            </div>

            <TrendingTemplates />
          </motion.div>
        );
      case 'creative':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-1">
              <BrandKitManager />
            </div>
            <div className="lg:col-span-1">
              <CaptionPresets />
            </div>
            <div className="lg:col-span-1">
              <MobilePreviewer />
            </div>
          </motion.div>
        );
      case 'production':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-4xl mx-auto"
          >
            <BRollSuggester />
          </motion.div>
        );
      case 'growth':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start"
          >
            <ContentCalendar />
            <div className="space-y-8">
              <OmnichannelTool />
              <PerformanceChart />
            </div>
          </motion.div>
        );
      case 'collaboration':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto"
          >
            <TeamWorkspace />
            <div className="mt-8">
              <SocialIntegrations />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative flex min-h-screen text-slate-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden"
      >
        <BackgroundEffects />
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-900 flex flex-col p-6 hidden md:flex sticky top-0 h-screen bg-slate-950/50 backdrop-blur-xl z-50">
          <Link href="/" className="flex items-center gap-4 group mb-12">
            <div className="relative">
              <div className="absolute inset-[-8px] bg-indigo-500 blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700 animate-pulse" />
              <div className="absolute inset-[-2px] bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-2xl opacity-10 group-hover:opacity-40 animate-[spin_6s_linear_infinite]" />
              
              <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950 border border-white/20 shadow-xl">
                <div className="absolute inset-1 border border-indigo-500/20 rounded-xl animate-[spin_4s_linear_infinite]" />
                <div className="absolute inset-2 border border-purple-500/20 rounded-lg animate-[spin_3s_linear_infinite_reverse]" />
                <Cpu className="relative z-10 text-white w-5 h-5 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              </div>
            </div>
            
            <div className="flex flex-col relative group">
              <h2 className="text-2xl font-black tracking-tighter leading-none flex items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-white/60 uppercase italic">SAM</span>
                <span className="text-indigo-500">.</span>
              </h2>
              <span className="text-[7px] font-black tracking-[0.4em] text-slate-500 uppercase leading-none mt-1.5 group-hover:text-indigo-400 transition-colors">Neural OS</span>
            </div>
          </Link>

          <nav className="flex-1 space-y-3">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full group text-left ${activeTab === tab.id ? 'active' : ''}`}
              >
                <motion.div 
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all border ${
                    activeTab === tab.id 
                    ? 'bg-indigo-500/10 text-indigo-400 font-black border-indigo-500/20 shadow-inner' 
                    : 'text-slate-400 border-transparent hover:bg-slate-900/50 hover:text-slate-200 hover:border-slate-800'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'text-indigo-400' : ''}`} /> 
                  <span className="uppercase italic tracking-tighter text-sm">{tab.label}</span>
                </motion.div>
              </button>
            ))}
          </nav>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-auto pt-6 border-t border-slate-900"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-900/50 transition-all cursor-pointer group border border-transparent hover:border-slate-800">
              <UserButton />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Pro Plan</span>
                <span className="text-xs text-indigo-400 font-black hover:text-indigo-300 transition-colors tracking-tight">UPGRADE NOW</span>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="p-6 border-b border-slate-900 flex items-center justify-between bg-slate-950/60 backdrop-blur-2xl sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <motion.h2 
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-black tracking-tight uppercase italic text-slate-200"
              >
                {tabs.find(t => t.id === activeTab)?.label}
              </motion.h2>
            </div>
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black rounded-xl border border-indigo-400/30 flex items-center gap-2 shadow-xl shadow-indigo-500/20 cursor-default uppercase tracking-widest"
              >
                <Sparkles className="w-4 h-4" /> 24 Credits Left
              </motion.div>
            </div>
          </header>

          <div className="p-6 md:p-8 lg:p-12 mx-auto w-full max-w-7xl">
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>

            <div className="mt-20 pt-10 border-t border-slate-900/50 mb-20 text-center">
              <p className="text-slate-500 text-sm font-medium tracking-tight">SAM AI Pro Suite &copy; 2026. All rights reserved.</p>
            </div>
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
