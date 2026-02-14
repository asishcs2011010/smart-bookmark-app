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
              Welcome back,{" "}
              <span className="text-white font-medium">
                {user.user_metadata?.full_name || user.email}
              </span>
            </p>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-2">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs sm:text-sm text-blue-400 font-medium">Smart Bookmark Manager</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent leading-tight px-2">
            Save & Organize
            <br />
            Your Favorite Links
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            A modern bookmark manager with real-time sync, smart validation, and secure cloud storage
          </p>
        </div>

        {/* Quick Stats (Optional) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">
              {recentBookmarks.length}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Recent</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-violet-400 mb-1">⚡</div>
            <div className="text-xs sm:text-sm text-slate-400">Real-time Sync</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4 text-center col-span-2 sm:col-span-1">
            <div className="text-2xl sm:text-3xl font-bold text-pink-400 mb-1">🔒</div>
            <div className="text-xs sm:text-sm text-slate-400">Secure & Private</div>
          </div>
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
            Add New Bookmark
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
              <div className="mb-3">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <p className="text-slate-400 text-sm sm:text-base px-4 mb-2">No bookmarks yet</p>
              <p className="text-slate-500 text-xs sm:text-sm px-4">Start saving your favorite links!</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {recentBookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="group p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all duration-200 cursor-pointer active:scale-[0.98] hover:bg-slate-800/80"
                  onClick={() => window.open(bookmark.url, '_blank')}
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {bookmark.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 truncate" title={bookmark.url}>
                        {truncateUrl(bookmark.url)}
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Bookmarks Button */}
        {recentBookmarks.length > 0 && (
          <div className="flex justify-center pt-2 sm:pt-4 px-4">
            <button
              onClick={() => router.push("/bookmarks")}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-slate-800 text-slate-200 font-semibold rounded-xl border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-200 text-sm sm:text-base"
            >
              View All Bookmarks
            </button>
          </div>
        )}

      </div>
    </div>
  )
}