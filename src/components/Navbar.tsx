"use client"

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import type { User } from "@supabase/supabase-js"

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setMobileMenuOpen(false)
    router.push("/login")
  }

  const getFirstName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0]
    }
    return user?.email?.split('@')[0] || 'User'
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/bookmarks", label: "All Bookmarks" },
    { href: "/about", label: "About" },
  ]

  return (
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
            <span className="text-base sm:text-lg font-semibold text-white hidden sm:block">
              Smart Bookmarks
            </span>
            <span className="text-base font-semibold text-white sm:hidden">
              Bookmarks
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            {!loading && user && (
              <>
                <span className="ml-4 text-sm text-slate-400">
                  {getFirstName()}
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 text-sm font-medium rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600 transition-all"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/50 bg-slate-900/95 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-2">
            
            {!loading && user && (
              <div className="pb-3 border-b border-slate-800/50 mb-2">
                <span className="text-sm text-slate-300">
                  Hey, {getFirstName()}!
                </span>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            {!loading && user && (
              <button
                onClick={handleLogout}
                className="w-full mt-2 py-2.5 px-4 text-sm font-medium rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-all"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}