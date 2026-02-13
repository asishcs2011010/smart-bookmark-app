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
      // Get session
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      if (!isSubscribed) return

      setSession(session)

      // Get actual user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.error('❌ No authenticated user')
        setLoading(false)
        return
      }

      if (!isSubscribed) return

      setUser(user)
      console.log('✅ User authenticated:', user.id)

      // Fetch recent bookmarks
      await fetchRecentBookmarks()

      if (!isSubscribed) return

      // Subscribe to realtime changes
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
              // Add new bookmark and keep only top 5
              setRecentBookmarks((current) => 
                [payload.new as Bookmark, ...current].slice(0, 5)
              )
            } else if (payload.eventType === 'DELETE') {
              // Remove deleted bookmark and refetch to get next one
              setRecentBookmarks((current) => 
                current.filter(b => b.id !== payload.old.id)
              )
              // Optionally refetch to fill the gap
              fetchRecentBookmarks()
            } else if (payload.eventType === 'UPDATE') {
              // Update existing bookmark
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

    // Cleanup
    return () => {
      isSubscribed = false
      if (channel) {
        console.log('🧹 Cleaning up home subscription')
        supabase.removeChannel(channel)
      }
    }
  }, [router])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this bookmark?")) return

    try {
      const { error: deleteError } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      // Realtime will handle state update
    } catch (err: any) {
      alert("Error deleting bookmark: " + err.message)
    }
  }

  // Prevent UI flicker
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-4xl mx-auto space-y-10 px-4">

        {/* User Info */}
        {user && (
          <div className="text-center">
            <p className="text-slate-400">
              Welcome,{" "}
              <span className="text-white font-medium">
                {user.user_metadata?.full_name || user.email}
              </span>
            </p>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Your Bookmarks,
            <br />
            Beautifully Organized
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Save, organize, and preview your favorite links
          </p>
        </div>

        {/* Add Bookmark Button */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/add-bookmark")}
            className="px-8 py-3.5 bg-linear-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Bookmark
          </button>
        </div>

        {/* Recent Bookmarks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Recent Bookmarks</h2>
            <button
              onClick={() => router.push("/bookmarks")}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View All →
            </button>
          </div>

          {recentBookmarks.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <p className="text-slate-400">No bookmarks yet. Add your first one!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {recentBookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="group p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => window.open(bookmark.url, '_blank')}
                    >
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {bookmark.title}
                      </h3>
                      <p className="text-sm text-slate-400 truncate">
                        {bookmark.url}
                      </p>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(bookmark.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      title="Delete bookmark"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Bookmarks Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => router.push("/bookmarks")}
            className="px-8 py-3.5 bg-slate-800 text-slate-200 font-semibold rounded-xl border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-200"
          >
            Go to All Bookmarks
          </button>
        </div>

      </div>
    </div>
  )
}