import Link from "next/link";
import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import { ArrowRight, Video, Zap, Scissors, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-800 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Video className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">ViralClip</span>
        </div>
        <nav className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal"><button className="text-sm font-medium hover:text-indigo-400 transition-colors">Sign In</button></SignInButton>
            <Link href="/sign-up" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
              Get Started
            </Link>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm font-medium hover:text-indigo-400 transition-colors">Dashboard</Link>
            <UserButton />
          </Show>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="px-6 py-24 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-8 animate-fade-in">
            <Zap className="w-3 h-3" />
            <span>AI-Powered Content Repurposing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Turn One Video into <br />
            <span className="text-indigo-500">10 Viral Clips</span> In Seconds
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            Stop spending hours editing. Upload your long-form content and let our AI find the best hooks, 
            auto-crop for vertical, and generate viral captions for TikTok, Reels, and Shorts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-indigo-500/25 flex items-center gap-2 group">
              Start Creating Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Social Proof / Features */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 text-left hover:border-slate-700 transition-colors group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-indigo-500 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Moment Hunter</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our AI analyzes your transcript to find the most engaging and viral-worthy moments automatically.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 text-left hover:border-slate-700 transition-colors group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Scissors className="text-indigo-500 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Auto-Crop</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                No more manual reframing. AI keeps you center-stage with intelligent face tracking and 9:16 cropping.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 text-left hover:border-slate-700 transition-colors group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-indigo-500 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Viral Captions</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Generate catchy hooks and animated captions that keep viewers watching until the very end.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 py-12 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} ViralClip AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
