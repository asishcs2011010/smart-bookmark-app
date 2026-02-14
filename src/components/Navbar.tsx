"use client"

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
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

  // Get user's first name only
  const getFirstName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0]
    }
    return user?.email?.split('@')[0] || 'User'
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/bookmarks", label: "Bookmarks" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="w-full border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-lg sm:text-xl font-bold bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent whitespace-nowrap">
          Smart Bookmark Manager
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="text-slate-400 hover:text-white transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200"></span>
            </a>
          ))}
        </div>

        {/* Desktop User Menu */}
        {!loading && user && (
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-slate-300">
              Hey, {getFirstName()}!
            </span>

            <button
              onClick={handleLogout}
              className="text-sm font-medium px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Logout
            </button>
          </div>
        )}

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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/50 bg-slate-900/95 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-3">
            {/* User Info */}
            {!loading && user && (
              <div className="pb-3 border-b border-slate-800/50">
                <span className="text-sm text-slate-300">
                  Hey, {getFirstName()}!
                </span>
              </div>
            )}

            {/* Navigation Links */}
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-slate-400 hover:text-white transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}

            {/* Logout Button */}
            {!loading && user && (
              <button
                onClick={handleLogout}
                className="w-full mt-2 text-sm font-medium px-4 py-2.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all duration-200"
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