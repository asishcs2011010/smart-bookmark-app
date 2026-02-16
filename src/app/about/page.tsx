"use client"

export default function About() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 sm:py-12">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 px-4">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">About Smart Bookmark Manager</h1>
          <p className="text-base sm:text-lg text-slate-400">
            Save, organize, and access your favorite links from anywhere
          </p>
        </div>

        {/* Project Overview */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">What is this?</h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Smart Bookmark Manager is a modern web application that helps you organize and manage your bookmarks efficiently. 
            Sign in with your Google account, save your favorite websites with custom titles, and access them from any device. 
            Your bookmarks are private, secure, and sync in real-time across all your open tabs.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
            
            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Frontend</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• Next.js 14 (App Router)</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Backend</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• Supabase (PostgreSQL)</li>
                <li>• Supabase Auth (Google OAuth)</li>
                <li>• Supabase Realtime</li>
                <li>• Row Level Security (RLS)</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Key Features</h2>
          <div className="space-y-2 sm:space-y-3">
            
            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">🔐 Secure Authentication</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Sign in with Google OAuth - no passwords needed. Your data stays completely private.
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">📚 Bookmark Management</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Create, view, and delete bookmarks with ease. Custom titles, URL validation, and beautiful UI.
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">🔒 Private & Secure</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Row Level Security ensures complete data isolation - you can only see and manage your own bookmarks.
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">⚡ Real-time Sync</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Changes appear instantly across all tabs using Supabase Realtime. No page refresh needed!
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">✅ URL Validation</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Smart validation with auto-https:// addition, format checking, and reachability verification.
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">🎨 Modern UI</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Clean, responsive dark mode design that works beautifully on all devices.
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">🧪 Well Tested</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                24/24 automated tests passing with Jest and React Testing Library.
              </p>
            </div>

          </div>
        </div>

        {/* Challenges Solved */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Technical Challenges Solved</h2>
          <div className="space-y-2 sm:space-y-3">
            
            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Realtime Sync Across Tabs</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Implemented proper authentication flow for Supabase Realtime with unique channel names and cleanup to prevent WebSocket connection issues.
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Custom Delete Modal</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Built a beautiful custom confirmation modal with glassmorphism design to replace ugly browser popups.
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Google OAuth Integration</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Configured proper callback URLs and authentication flow in Next.js App Router with Supabase.
              </p>
            </div>

          </div>
        </div>

        {/* Deployment */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Deployment</h2>
          <div className="p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Deployed on <span className="font-semibold text-white">Vercel</span> with automatic GitHub deployments. 
              Database hosted on <span className="font-semibold text-white">Supabase Cloud</span> with secure environment variables.
            </p>
          </div>
        </div>

        {/* GitHub & Live Demo */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Links</h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            
              href="https://github.com/asishcs2011010/smart-bookmark-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-3 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all text-center"
            <a>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span className="text-sm sm:text-base font-medium text-white">View on GitHub</span>
              </div>
            </a>
            
              href="https://smart-bookmark-app-iota-seven.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-3 sm:p-4 rounded-xl bg-linear-to-r from-blue-500 to-violet-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all text-center"
            <a>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-sm sm:text-base font-medium text-white">Live Demo</span>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 sm:pt-6 border-t border-slate-700">
          <p className="text-xs sm:text-sm text-slate-400 text-center">
            Built by Asish Sashank Reddy Chinasani • {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </div>
  )
}