"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function AddBookmarkPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [urlError, setUrlError] = useState("")
  const [isCheckingUrl, setIsCheckingUrl] = useState(false)

  // Validate URL format
  const validateUrlFormat = (inputUrl: string): { isValid: boolean; correctedUrl: string; error: string } => {
    if (!inputUrl.trim()) {
      return { isValid: false, correctedUrl: "", error: "URL is required" }
    }

    let urlToValidate = inputUrl.trim()

    // Auto-add https:// if no protocol
    if (!urlToValidate.startsWith('http://') && !urlToValidate.startsWith('https://')) {
      urlToValidate = 'https://' + urlToValidate
    }

    // Check if it's a valid URL format
    try {
      const urlObj = new URL(urlToValidate)
      
      // Must have a valid protocol
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return { isValid: false, correctedUrl: "", error: "URL must use http:// or https://" }
      }

      // Must have a hostname
      if (!urlObj.hostname || urlObj.hostname === '') {
        return { isValid: false, correctedUrl: "", error: "Invalid URL format" }
      }

      // Check for valid domain format (at least one dot or localhost)
      if (!urlObj.hostname.includes('.') && urlObj.hostname !== 'localhost') {
        return { isValid: false, correctedUrl: "", error: "Invalid domain name. Example: google.com" }
      }

      return { isValid: true, correctedUrl: urlToValidate, error: "" }
    } catch (e) {
      return { isValid: false, correctedUrl: "", error: "Invalid URL format. Example: google.com or https://google.com" }
    }
  }

  // Check if URL is reachable
  const checkUrlReachability = async (urlToCheck: string): Promise<boolean> => {
    try {
      setIsCheckingUrl(true)
      
      // Use a simple fetch with no-cors mode to check if URL exists
      // This won't work for all sites due to CORS, but it's a basic check
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      try {
        await fetch(urlToCheck, { 
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal
        })
        clearTimeout(timeoutId)
        return true
      } catch (fetchError) {
        clearTimeout(timeoutId)
        // If CORS blocks us, we'll assume the URL might still be valid
        // This is a limitation of client-side checking
        return true
      }
    } catch (error) {
      return false
    } finally {
      setIsCheckingUrl(false)
    }
  }

  // Validate URL on blur
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

    // URL format is valid, now check if it's reachable
    setUrlError("")
    const isReachable = await checkUrlReachability(validation.correctedUrl)
    
    if (!isReachable) {
      setUrlError("Warning: Unable to verify if this URL is reachable")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setUrlError("")
    setLoading(true)

    try {
      // Validate URL format
      const validation = validateUrlFormat(url)
      
      if (!validation.isValid) {
        setUrlError(validation.error)
        setLoading(false)
        return
      }

      const finalUrl = validation.correctedUrl

      // Check if URL is reachable
      const isReachable = await checkUrlReachability(finalUrl)
      
      if (!isReachable) {
        const confirmSave = confirm("Warning: Unable to verify if this URL is reachable. Do you want to save it anyway?")
        if (!confirmSave) {
          setLoading(false)
          return
        }
      }

      // Direct Supabase call
      const { data, error: supabaseError } = await supabase
        .from('bookmarks')
        .insert({ title: title.trim(), url: finalUrl })
        .select()
        .single()

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      // Success - redirect to bookmarks
      router.push("/bookmarks")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-slate-400 hover:text-white transition-colors mb-4 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <h1 className="text-4xl font-bold text-white mb-2">Add Bookmark</h1>
          <p className="text-slate-400">Save a new link to your collection</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
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
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  setUrlError("") // Clear error when typing
                }}
                onBlur={handleUrlBlur}
                placeholder="example.com or https://example.com"
                required
                className={`w-full px-4 py-3 bg-slate-800 border ${
                  urlError ? 'border-red-500' : 'border-slate-700'
                } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${
                  urlError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } focus:border-transparent transition-all`}
              />
              {isCheckingUrl && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            {urlError ? (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {urlError}
              </p>
            ) : (
              <p className="text-xs text-slate-500 mt-1">
                ✓ You can enter with or without https:// - we'll auto-add it
              </p>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || isCheckingUrl}
              className="flex-1 px-6 py-3 bg-linear-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : isCheckingUrl ? "Validating..." : "Add Bookmark"}
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="px-6 py-3 bg-slate-800 text-slate-200 font-semibold rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}