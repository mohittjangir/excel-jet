import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Video, LayoutDashboard, History, Settings, Plus, Sparkles } from "lucide-react";
import UploadZone from "@/components/UploadZone";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-900 flex flex-col p-6 hidden md:flex">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Video className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">ViralClip</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 transition-colors">
            <History className="w-5 h-5" /> History
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-900">
          <div className="flex items-center gap-3 px-4">
            <UserButton />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-400">Pro Plan</span>
              <span className="text-xs text-indigo-500 font-bold underline cursor-pointer">Upgrade</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="p-6 border-b border-slate-900 flex items-center justify-between">
          <h2 className="text-xl font-bold">New Project</h2>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/20 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> 24 Credits Left
            </div>
          </div>
        </header>

        <div className="p-8 md:p-12 max-w-5xl mx-auto w-full">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold mb-4 tracking-tight">What are we creating today?</h1>
            <p className="text-slate-400">Upload your video and watch our AI work its magic.</p>
          </div>

          <UploadZone />

          <div className="mt-24">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-500" /> Recent Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for empty state */}
              <div className="aspect-video rounded-3xl border-2 border-dashed border-slate-900 flex items-center justify-center text-slate-600 italic text-sm">
                No projects yet. Start by uploading above!
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
