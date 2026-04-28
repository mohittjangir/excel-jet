"use client";

import { motion } from "framer-motion";
import { Star, Quote, Play } from "lucide-react";

export default function Testimonials() {
  const featuredReviews = [
    {
      name: "Alex Rivera",
      role: "YouTube Creator (2M+ Subs)",
      content: "SAM AI cut my editing time by 90%. What used to take hours now happens in seconds. The Hormozi captions are spot on!",
      avatar: "https://i.pravatar.cc/150?u=alex",
      rating: 5,
      videoMetrics: "2.4M Views"
    },
    {
      name: "Sarah Chen",
      role: "E-commerce Founder",
      content: "I didn't believe AI could find the viral hooks so accurately. My TikTok views tripled in the first week of using this.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      rating: 5,
      videoMetrics: "850K Views"
    },
    {
      name: "Jordan Smith",
      role: "Content Agency CEO",
      content: "The Team Workspace feature is a game changer. We manage 20+ clients effortlessly now. Absolute best in the market.",
      avatar: "https://i.pravatar.cc/150?u=jordan",
      rating: 5,
      videoMetrics: "1.2M Views"
    }
  ];

  // Duplicate for infinite scroll effect
  const marqueeItems = [
    ...featuredReviews,
    {
      name: "Mia T.",
      role: "TikToker",
      content: "Obsessed with the dynamic zoom features!",
      avatar: "https://i.pravatar.cc/150?u=mia",
      rating: 5,
      videoMetrics: "500K Views"
    },
    {
      name: "David K.",
      role: "Podcast Host",
      content: "Turns our 2hr pods into 15 perfect shorts.",
      avatar: "https://i.pravatar.cc/150?u=david",
      rating: 5,
      videoMetrics: "3M Views"
    }
  ];
  
  // Double the array to ensure seamless loop
  const duplicatedMarquee = [...marqueeItems, ...marqueeItems];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full -z-10" />

      <div className="container mx-auto px-6 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
          >
            <Star className="w-3 h-3" />
            <span>Wall of Love</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none"
          >
            Trusted by <span className="text-indigo-500">Industry</span> <br />Leaders
          </motion.h2>
          <p className="text-slate-400 text-lg font-medium">Join 5,000+ creators dominating the social algorithms with AI.</p>
        </div>
      </div>

      {/* Infinite Marquee Scroll */}
      <div className="relative w-full overflow-hidden mb-32 flex">
        {/* Left/Right Fade Overlays */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent z-10" />

        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="flex gap-8 whitespace-nowrap px-4"
        >
          {duplicatedMarquee.map((t, i) => (
            <div 
              key={i}
              className="w-[400px] shrink-0 p-8 rounded-[32px] bg-slate-900/40 border border-white/5 backdrop-blur-md relative group hover:border-indigo-500/30 transition-all shadow-xl flex flex-col"
            >
              <div className="flex gap-1.5 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-500 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                ))}
              </div>
              <p className="text-slate-300 font-medium text-lg leading-relaxed mb-8 italic whitespace-normal flex-1">
                &quot;{t.content}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-indigo-500/20 object-cover" />
                <div>
                  <h4 className="font-black text-white uppercase italic tracking-tight text-md leading-none mb-1">{t.name}</h4>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] leading-none">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Cards (Featured Reviews) */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredReviews.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="relative p-1 rounded-[48px] bg-gradient-to-b from-white/10 to-transparent shadow-2xl shadow-black/50 group cursor-pointer"
            >
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-[48px]" />
              <div className="h-full bg-slate-950/80 backdrop-blur-xl p-10 rounded-[46px] border border-white/5 group-hover:border-indigo-500/30 transition-all flex flex-col relative z-10">
                <Quote className="absolute top-10 right-10 w-16 h-16 text-white/5 group-hover:text-indigo-500/10 transition-colors" />
                
                <div className="mb-8 relative rounded-2xl overflow-hidden group-hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all">
                   <div className="aspect-video bg-slate-800 relative">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 mix-blend-overlay" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 text-white fill-white ml-1" />
                        </div>
                     </div>
                     <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-white flex items-center gap-1">
                        <Play className="w-3 h-3" /> {t.videoMetrics}
                     </div>
                   </div>
                </div>

                <p className="text-slate-200 font-bold text-xl leading-relaxed mb-10 italic flex-1">
                  &quot;{t.content}&quot;
                </p>
                
                <div className="flex items-center gap-5 mt-auto pt-6 border-t border-white/10">
                  <div className="relative">
                    <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-indigo-500/20 object-cover" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 text-white fill-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase italic tracking-tight text-lg leading-none mb-1">{t.name}</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] leading-none">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
