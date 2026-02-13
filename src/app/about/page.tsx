"use client"

export default function About() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-3xl mx-auto space-y-8 px-4">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">About This Project</h1>
          <p className="text-lg text-slate-400">
            A take-home assignment showcasing full-stack development skills
          </p>
        </div>

        {/* Project Overview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Project Overview</h2>
          <p className="text-slate-300 leading-relaxed">
            This is a Smart Bookmark Manager that allows users to save, organize, and manage their favorite links. 
            Built as a take-home assignment, it demonstrates modern web development practices with authentication, 
            database operations, and real-time updates.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Frontend</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Next.js 14 (App Router)</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Backend</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Supabase (PostgreSQL)</li>
                <li>• Supabase Auth (Google OAuth)</li>
                <li>• Supabase Realtime</li>
                <li>• Row Level Security (RLS)</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Features Implemented */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Features Implemented</h2>
          <div className="space-y-3">
            
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">🔐 Authentication</h3>
              <p className="text-sm text-slate-300">
                Google OAuth integration with Supabase Auth. Users can sign in/out securely without password management.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">📚 Bookmark Management</h3>
              <p className="text-sm text-slate-300">
                Create, read, update, and delete bookmarks. Each bookmark includes title, URL, and metadata.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">🔒 Private & Secure</h3>
              <p className="text-sm text-slate-300">
                Row Level Security ensures users can only access their own bookmarks. Data is completely isolated per user.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">⚡ Real-time Updates</h3>
              <p className="text-sm text-slate-300">
                Changes sync instantly across multiple tabs without page refresh using Supabase Realtime subscriptions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">🎨 Modern UI/UX</h3>
              <p className="text-sm text-slate-300">
                Clean, responsive dark mode interface built with Tailwind CSS. Smooth animations and intuitive interactions.
              </p>
            </div>

          </div>
        </div>

        {/* Challenges & Solutions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Challenges & Solutions</h2>
          <div className="space-y-3">
            
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base font-semibold text-white mb-1">Challenge: Authentication Flow</h3>
              <p className="text-sm text-slate-300">
                <span className="text-slate-400">Solution:</span> Implemented Google OAuth with proper callback handling and session management. 
                Used middleware to protect routes and redirect unauthenticated users.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base font-semibold text-white mb-1">Challenge: Real-time Data Sync</h3>
              <p className="text-sm text-slate-300">
                <span className="text-slate-400">Solution:</span> Leveraged Supabase Realtime to subscribe to database changes. 
                Ensured proper cleanup of subscriptions to prevent memory leaks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base font-semibold text-white mb-1">Challenge: Type Safety</h3>
              <p className="text-sm text-slate-300">
                <span className="text-slate-400">Solution:</span> Used TypeScript interfaces for all data models. 
                Created proper type definitions for Supabase responses to catch errors at compile time.
              </p>
            </div>

          </div>
        </div>

        {/* Deployment */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Deployment</h2>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <p className="text-sm text-slate-300 leading-relaxed">
              Application deployed on <span className="font-semibold text-white">Vercel</span> with automatic CI/CD. 
              Database hosted on <span className="font-semibold text-white">Supabase Cloud</span> with proper environment 
              variables and secure authentication callbacks configured.
            </p>
          </div>
        </div>

        {/* Future Improvements */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Future Improvements</h2>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Add tags and categories for better organization</li>
              <li>• Implement full-text search functionality</li>
              <li>• Add bookmark import/export features</li>
              <li>• Create browser extension for quick saving</li>
              <li>• Add link preview with metadata scraping</li>
              <li>• Implement sharing and collaboration features</li>
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-6 border-t border-slate-700">
          <p className="text-sm text-slate-400 text-center">
            Built with ❤️ as a take-home assignment • {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </div>
  )
}