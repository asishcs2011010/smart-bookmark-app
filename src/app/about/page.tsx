"use client"

export default function About() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">
            About Smart Bookmark Manager
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Save, organize, and access your favorite links from anywhere
          </p>
        </div>

        {/* What is this */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What is this?</h2>
          <p className="text-slate-300 leading-relaxed">
            Smart Bookmark Manager is a modern web application that helps you organize and manage your bookmarks efficiently. 
            Sign in with your Google account, save your favorite websites with custom titles, and access them from any device. 
            Your bookmarks are private, secure, and sync in real-time across all your open tabs.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Tech Stack</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Frontend */}
            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Frontend</h3>
              <ul className="space-y-2 text-sm sm:text-base text-slate-300">
                <li>• Next.js 14 (App Router)</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>

            {/* Backend */}
            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Backend</h3>
              <ul className="space-y-2 text-sm sm:text-base text-slate-300">
                <li>• Supabase (PostgreSQL)</li>
                <li>• Supabase Auth (Google OAuth)</li>
                <li>• Supabase Realtime</li>
                <li>• Row Level Security (RLS)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Key Features</h2>
          <div className="grid gap-4">
            
            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">🔐 Secure Authentication</h3>
              <p className="text-sm sm:text-base text-slate-300">
                Sign in with Google OAuth - no passwords needed. Your data stays completely private.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">📚 Bookmark Management</h3>
              <p className="text-sm sm:text-base text-slate-300">
                Create, view, and delete bookmarks with ease. Custom titles, URL validation, and beautiful UI.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">🔒 Private & Secure</h3>
              <p className="text-sm sm:text-base text-slate-300">
                Row Level Security ensures complete data isolation - you can only see and manage your own bookmarks.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">⚡ Real-time Sync</h3>
              <p className="text-sm sm:text-base text-slate-300">
                Changes appear instantly across all tabs using Supabase Realtime. No page refresh needed!
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">✅ URL Validation</h3>
              <p className="text-sm sm:text-base text-slate-300">
                Smart validation with auto-https:// addition, format checking, and reachability verification.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">🎨 Modern UI</h3>
              <p className="text-sm sm:text-base text-slate-300">
                Clean, responsive dark mode design that works beautifully on all devices.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">🧪 Well Tested</h3>
              <p className="text-sm sm:text-base text-slate-300">
                24/24 automated tests passing with Jest and React Testing Library.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Challenges */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Technical Challenges Solved</h2>
          <div className="space-y-4">
            
            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Realtime Sync Across Tabs</h3>
              <p className="text-sm sm:text-base text-slate-300">
                Implemented proper authentication flow for Supabase Realtime with unique channel names and cleanup to prevent WebSocket connection issues.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Custom Delete Modal</h3>
              <p className="text-sm sm:text-base text-slate-300">
                Built a beautiful custom confirmation modal with glassmorphism design to replace ugly browser popups.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Google OAuth Integration</h3>
              <p className="text-sm sm:text-base text-slate-300">
                Configured proper callback URLs and authentication flow in Next.js App Router with Supabase.
              </p>
            </div>
          </div>
        </div>

        {/* Deployment */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Deployment</h2>
          <div className="p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Deployed on <span className="font-semibold text-white">Vercel</span> with automatic GitHub deployments. 
              Database hosted on <span className="font-semibold text-white">Supabase Cloud</span> with secure environment variables.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Links</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            
            <a 
              href="https://github.com/asishcs2011010/smart-bookmark-app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all text-center group"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <p className="text-sm sm:text-base font-semibold text-white">View on GitHub</p>
            </a>

            <a 
              href="https://smart-bookmark-app-iota-seven.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 p-4 sm:p-6 rounded-xl bg-linear-to-r from-blue-500 to-violet-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all text-center group"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <p className="text-sm sm:text-base font-semibold text-white">Live Demo</p>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 sm:pt-8 border-t border-slate-700 text-center">
          <p className="text-sm text-slate-400">
            Built with ❤️ by Asish Sashank Reddy Chinasani
          </p>
        </div>

      </div>
    </div>
  )
}