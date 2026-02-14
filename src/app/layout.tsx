import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

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
        {/* Navbar */}
        <nav className="bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="p-1.5 sm:p-2 bg-linear-to-r from-blue-500 to-violet-500 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <span className="text-base sm:text-lg font-semibold text-white hidden xs:block">
                  Smart Bookmarks
                </span>
                <span className="text-base sm:text-lg font-semibold text-white xs:hidden">
                  Bookmarks
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  href="/"
                  className="px-2 sm:px-3 py-1.5 sm:py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all text-xs sm:text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/bookmarks"
                  className="px-2 sm:px-3 py-1.5 sm:py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all text-xs sm:text-sm font-medium"
                >
                  All
                </Link>
                <Link
                  href="/about"
                  className="px-2 sm:px-3 py-1.5 sm:py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all text-xs sm:text-sm font-medium hidden sm:block"
                >
                  About
                </Link>
                <Link
                  href="/add-bookmark"
                  className="ml-1 sm:ml-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all text-xs sm:text-sm font-medium"
                >
                  + Add
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  )
}