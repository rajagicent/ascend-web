import "./globals.css"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "Ascend Fitness App",
  description: "Fitness App",
  keywords: ["nextjs", "react", "seo", "web development"],
  authors: [{ name: "Agicent" }],
  creator: "Agicent",

  openGraph: {
    title: "Ascend",
    description: "Your website description",
    url: "https://yourdomain.com",
    siteName: "Your Website Name",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OG Image",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Your Website Name",
    description: "Your website description",
    images: ["https://yourdomain.com/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased")}>
      <body>{children}</body>
    </html>
  )
}
