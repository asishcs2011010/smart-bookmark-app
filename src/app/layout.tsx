import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Smart Bookmark Manager",
  description: "Save, organize, and access your favorite links",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 min-h-screen`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Analytics />
      </body>
    </html>
  )
}