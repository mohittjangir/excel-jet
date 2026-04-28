import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "SAM AI | Next-Gen Content Repurposer",
    template: "%s | SAM AI",
  },
  description: "SAM (Smart AI Media) turns long-form videos into viral clips for TikTok, Reels, and Shorts in one click. The ultimate AI editor for modern creators.",
  keywords: ["SAM AI", "AI video editor", "TikTok clips", "YouTube Shorts generator", "repurpose content", "auto captions", "Hormozi captions"],
  authors: [{ name: "SAM AI Team" }],
  creator: "SAM AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samai.app",
    title: "SAM AI | Go Viral on Autopilot",
    description: "Turn your podcasts and long-form videos into high-performing short form content instantly with SAM.",
    siteName: "SAM AI",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "SAM AI Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAM AI | AI Video Repurposing",
    description: "Turn 1 podcast into 15 viral clips in minutes with SAM.",
    images: ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200&h=630"],
    creator: "@sam_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
