import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "Excel Jet | Warehouse Management System",
    template: "%s | Excel Jet WMS",
  },
  description: "Excel Jet Warehouse Management System (WMS) for real-time inventory tracking, stock in/out operations, logistics analytics, and warehouse automation.",
  keywords: ["Excel Jet", "Warehouse Management System", "WMS", "Inventory Tracking", "Logistics Software", "Stock Management", "Warehouse Analytics"],
  authors: [{ name: "Excel Jet Systems Team" }],
  creator: "Excel Jet WMS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://exceljetwms.com",
    title: "Excel Jet | Warehouse Management System",
    description: "Streamline inventory, optimize stock movements, and gain real-time warehouse intelligence with Excel Jet WMS.",
    siteName: "Excel Jet WMS",
    images: [
      {
        url: "/excel-jet-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Excel Jet Warehouse Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel Jet | Warehouse Management System",
    description: "Enterprise WMS for inventory tracking and logistics automation.",
    images: ["/excel-jet-logo.jpg"],
    creator: "@exceljet_wms",
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
