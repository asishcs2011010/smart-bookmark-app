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
}

export default function BookmarksPage() {
  const router = useRouter()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [bookmarkToDelete, setBookmarkToDelete] = useState<string | null>(null)

  const fetchBookmarks = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setBookmarks(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let channel: RealtimeChannel | null = null
    let isSubscribed = true

    const setupRealtimeSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.error('❌ No authenticated user')
        setLoading(false)
        return
      }
      
      if (!isSubscribed) return
      
      console.log('✅ User authenticated:', user.id)
      
      await fetchBookmarks()
      
      if (!isSubscribed) return
      
      channel = supabase
        .channel('bookmarks-changes-' + Date.now())
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookmarks'
          },
          (payload) => {
            console.log('🔥 Realtime event:', payload.eventType)
            
            if (payload.eventType === 'INSERT') {
              setBookmarks((current) => [payload.new as Bookmark, ...current])
            } else if (payload.eventType === 'DELETE') {
              setBookmarks((current) => current.filter(b => b.id !== payload.old.id))
            } else if (payload.eventType === 'UPDATE') {
              setBookmarks((current) =>
                current.map(b => b.id === payload.new.id ? payload.new as Bookmark : b)
              )
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('📡 Realtime connected')
          } else if (status === 'CLOSED') {
            console.log('📡 Realtime closed')
          } else if (status === 'CHANNEL_ERROR') {
            console.error('📡 Realtime error')
          }
        })
    }

    setupRealtimeSubscription()

    return () => {
      isSubscribed = false
      if (channel) {
        console.log('🧹 Cleaning up subscription')
        supabase.removeChannel(channel)
      }
    }
  }, [])

  const handleDelete = async (id: string) => {
    setBookmarkToDelete(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!bookmarkToDelete) return

    try {
      const { error: deleteError } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmarkToDelete)

      if (deleteError) throw deleteError

      setDeleteModalOpen(false)
      setBookmarkToDelete(null)
    } catch (err: any) {
      alert("Error deleting bookmark: " + err.message)
      setDeleteModalOpen(false)
      setBookmarkToDelete(null)
    }
  }

  const cancelDelete = () => {
    setDeleteModalOpen(false)
    setBookmarkToDelete(null)
  }

  // Function to truncate URL
  const truncateUrl = (url: string, maxLength: number = 60) => {
    if (url.length <= maxLength) return url
    return url.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading bookmarks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Bookmarks</h1>
            <p className="text-slate-400">
              {bookmarks.length} {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'} saved
            </p>
          </div>
          
          <button
            onClick={() => router.push("/add-bookmark")}
            className="px-6 py-3 bg-linear-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Bookmark
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Bookmarks List */}
        {bookmarks.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <p className="text-slate-400 text-lg mb-4">No bookmarks yet</p>
            <p className="text-slate-500 text-sm mb-6">Start saving your favorite links</p>
            <button
              onClick={() => router.push("/add-bookmark")}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Bookmark
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="group p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {bookmark.title}
                    </h3>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors block"
                      onClick={(e) => e.stopPropagation()}
                      title={bookmark.url}
                    >
                      {truncateUrl(bookmark.url)}
                    </a>
                    <p className="text-xs text-slate-500 mt-3">
                      Added on {new Date(bookmark.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                      title="Open link"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    
                    <button
                      onClick={() => handleDelete(bookmark.id)}
                      className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Delete bookmark"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Delete Bookmark?</h3>
                <p className="text-slate-400 text-sm">
                  Are you sure you want to delete this bookmark? This action cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={cancelDelete}
                className="px-4 py-2.5 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}