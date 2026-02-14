"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { validateUrlFormat } from './validation'

export default function AddBookmarkPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [urlError, setUrlError] = useState("")
  const [isCheckingUrl, setIsCheckingUrl] = useState(false)

  const checkUrlReachability = async (urlToCheck: string): Promise<{ reachable: boolean; error: string }> => {
    try {
      setIsCheckingUrl(true)
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)

      try {
        await fetch(urlToCheck, { 
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal,
          cache: 'no-store'
        })
        
        clearTimeout(timeoutId)
        return { reachable: true, error: '' }
      } catch (fetchError: any) {
        clearTimeout(timeoutId)
        
        if (fetchError.name === 'AbortError') {
          return { reachable: false, error: 'URL is taking too long to respond (timeout after 8 seconds)' }
        }
        
        if (fetchError.message.includes('Failed to fetch')) {
          return { reachable: false, error: 'Unable to reach this URL. The site may be down or the URL is incorrect.' }
        }
        
        return { reachable: true, error: '' }
      }
    } catch (error) {
      return { reachable: false, error: 'Unable to verify URL reachability' }
    } finally {
      setIsCheckingUrl(false)
    }
  }

  const handleUrlBlur = async () => {
    if (!url.trim()) {
      setUrlError("")
      return
    }

    const validation = validateUrlFormat(url)
    
    if (!validation.isValid) {
      setUrlError(validation.error)
      return
    }

    setUrlError("")
    const result = await checkUrlReachability(validation.correctedUrl)
    
    if (!result.reachable) {
      setUrlError(result.error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setUrlError("")
    setLoading(true)

    try {
      const validation = validateUrlFormat(url)
      
      if (!validation.isValid) {
        setUrlError(validation.error)
        setLoading(false)
        return
      }

      const finalUrl = validation.correctedUrl

      const reachabilityResult = await checkUrlReachability(finalUrl)
      
      if (!reachabilityResult.reachable) {
        setUrlError(reachabilityResult.error)
        setError("Cannot add bookmark: " + reachabilityResult.error)
        setLoading(false)
        return
      }

      const { data, error: supabaseError } = await supabase
        .from('bookmarks')
        .insert({ title: title.trim(), url: finalUrl })
        .select()
        .single()

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      router.push("/bookmarks")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-6 sm:py-12">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => router.back()}
            className="text-slate-400 hover:text-white transition-colors mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Add Bookmark</h1>
          <p className="text-slate-400 text-sm sm:text-base">Save a new link to your collection</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Website"
              required
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
            />
          </div>

          {/* URL Input */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-slate-300 mb-2">
              URL
            </label>
            <div className="relative">
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  setUrlError("")
                }}
                onBlur={handleUrlBlur}
                placeholder="example.com or https://example.com"
                required
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800 border ${
                  urlError ? 'border-red-500' : 'border-slate-700'
                } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${
                  urlError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } focus:border-transparent transition-all text-sm sm:text-base`}
              />
              {isCheckingUrl && (
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            {urlError ? (
              <p className="text-xs sm:text-sm text-red-400 mt-1 flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="wrap-break-word">{urlError}</span>
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                ✓ You can enter with or without https:// - we'll auto-add it
              </p>
            )}
          </div>

          {error && (
            <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-xs sm:text-sm text-red-400 wrap-break-word">{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <button
              type="submit"
              disabled={loading || isCheckingUrl}
              className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-2 sm:order-1"
            >
              {loading ? "Adding..." : isCheckingUrl ? "Validating..." : "Add Bookmark"}
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-800 text-slate-200 font-semibold rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors disabled:opacity-50 text-sm sm:text-base order-1 sm:order-2"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}