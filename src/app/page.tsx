"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import type { RealtimeChannel } from "@supabase/supabase-js"

interface Bookmark {
  id: string
  title: string
  url: string
  created_at: string
  user_id: string
}

export default function HomePage() {
  const router = useRouter()
  const [recentBookmarks, setRecentBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  const fetchRecentBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (data) setRecentBookmarks(data as Bookmark[])
  }

  useEffect(() => {
    let channel: RealtimeChannel | null = null
    let isSubscribed = true

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      if (!isSubscribed) return

      setSession(session)

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.error('❌ No authenticated user')
        setLoading(false)
        return
      }

      if (!isSubscribed) return

      setUser(user)
      console.log('✅ User authenticated:', user.id)

      await fetchRecentBookmarks()

      if (!isSubscribed) return

      channel = supabase
        .channel('home-bookmarks-' + Date.now())
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookmarks'
          },
          (payload) => {
            console.log('🔥 Home realtime event:', payload.eventType)
            
            if (payload.eventType === 'INSERT') {
              setRecentBookmarks((current) => 
                [payload.new as Bookmark, ...current].slice(0, 5)
              )
            } else if (payload.eventType === 'DELETE') {
              setRecentBookmarks((current) => 
                current.filter(b => b.id !== payload.old.id)
              )
              fetchRecentBookmarks()
            } else if (payload.eventType === 'UPDATE') {
              setRecentBookmarks((current) =>
                current.map(b => b.id === payload.new.id ? payload.new as Bookmark : b)
              )
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('📡 Home realtime connected')
          }
        })

      setLoading(false)
    }

    checkUser()

    return () => {
      isSubscribed = false
      if (channel) {
        console.log('🧹 Cleaning up home subscription')
        supabase.removeChannel(channel)
      }
    }
  }, [router])

  const truncateUrl = (url: string, maxLength: number = 50) => {
    if (url.length <= maxLength) return url
    return url.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-6 sm:py-12">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10 px-4">

        {/* User Info */}
        {user && (
          <div className="text-center">
            <p className="text-slate-400 text-sm sm:text-base">
              Welcome,{" "}
              <span className="text-white font-medium">
                {user.user_metadata?.full_name || user.email}
              </span>
            </p>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent leading-tight px-2">
            Your Bookmarks,
            <br />
            Beautifully Organized
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Save, organize, and preview your favorite links
          </p>
        </div>

        {/* Add Bookmark Button */}
        <div className="flex justify-center px-4">
          <button
            onClick={() => router.push("/add-bookmark")}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-linear-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Bookmark
          </button>
        </div>

        {/* Recent Bookmarks Section */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Recent Bookmarks</h2>
            <button
              onClick={() => router.push("/bookmarks")}
              className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap"
            >
              View All →
            </button>
          </div>

          {recentBookmarks.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <p className="text-slate-400 text-sm sm:text-base px-4">No bookmarks yet. Add your first one!</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {recentBookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="group p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  onClick={() => window.open(bookmark.url, '_blank')}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1 line-clamp-2">
                    {bookmark.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 truncate" title={bookmark.url}>
                    {truncateUrl(bookmark.url)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Bookmarks Button */}
        <div className="flex justify-center pt-2 sm:pt-4 px-4">
          <button
            onClick={() => router.push("/bookmarks")}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-slate-800 text-slate-200 font-semibold rounded-xl border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-200 text-sm sm:text-base"
          >
            Go to All Bookmarks
          </button>
        </div>

      </div>
    </div>
  )
}