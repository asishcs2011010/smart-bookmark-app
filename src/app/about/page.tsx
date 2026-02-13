"use client"

export default function About() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-3xl mx-auto space-y-8 px-4">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">About Smart Bookmark Manager</h1>
          <p className="text-lg text-slate-400">
            Save, organize, and access your favorite links from anywhere
          </p>
        </div>

        {/* Project Overview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">What is this?</h2>
          <p className="text-slate-300 leading-relaxed">
            Smart Bookmark Manager is a modern web application that helps you organize and manage your bookmarks efficiently. 
            Sign in with your Google account, save your favorite websites with custom titles, and access them from any device. 
            Your bookmarks are private, secure, and sync in real-time across all your open tabs.
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
          <h2 className="text-2xl font-semibold text-white">Key Features</h2>
          <div className="space-y-3">
            
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">🔐 Secure Authentication</h3>
              <p className="text-sm text-slate-300">
                Sign in effortlessly with your Google account. No passwords to remember, and your data stays private to you.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">📚 Easy Bookmark Management</h3>
              <p className="text-sm text-slate-300">
                Add bookmarks with custom titles and URLs. View all your saved links in one beautiful dashboard. Delete bookmarks with a sleek confirmation modal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">🔒 Complete Privacy</h3>
              <p className="text-sm text-slate-300">
                Your bookmarks are yours alone. Advanced Row Level Security ensures you can only see and manage your own bookmarks - no one else can access them.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">⚡ Real-time Sync</h3>
              <p className="text-sm text-slate-300">
                Add or delete a bookmark in one tab and watch it instantly appear or disappear in all your other tabs. No page refresh needed!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">🎨 Modern, Clean Design</h3>
              <p className="text-sm text-slate-300">
                Beautiful dark mode interface with smooth animations, responsive layout that works on all devices, and an intuitive user experience.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">✨ Enhanced User Experience</h3>
              <p className="text-sm text-slate-300">
                Custom delete confirmation modal (no ugly browser popups), quick access to recent bookmarks on the home page, and one-click opening of bookmarked links.
              </p>
            </div>

          </div>
        </div>

        {/* Challenges & Solutions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Challenges We Solved</h2>
          <div className="space-y-3">
            
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base font-semibold text-white mb-1">Challenge: Realtime Not Working Across Tabs</h3>
              <p className="text-sm text-slate-300">
                <span className="text-slate-400">Problem:</span> Initially, realtime subscriptions were enabled in the database, but changes in one tab weren't appearing in another tab.
                <br/><br/>
                <span className="text-slate-400">Solution:</span> The issue was with Row Level Security policies. The RLS policies were checking for user ownership, but the realtime subscription wasn't properly authenticated. We fixed this by ensuring the Supabase client was created with proper session management using <code className="bg-slate-900 px-1 rounded">createBrowserClient</code>, and we added authentication verification before setting up realtime subscriptions. We also added unique channel names using timestamps to prevent conflicts.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base font-semibold text-white mb-1">Challenge: WebSocket Connection Closing Repeatedly</h3>
              <p className="text-sm text-slate-300">
                <span className="text-slate-400">Problem:</span> Realtime worked initially but then the WebSocket connection kept closing and timing out, showing "CLOSED" and "TIMED_OUT" status messages.
                <br/><br/>
                <span className="text-slate-400">Solution:</span> The useEffect was creating new subscriptions on every re-render. We implemented proper cleanup with an <code className="bg-slate-900 px-1 rounded">isSubscribed</code> flag to prevent race conditions and ensured the channel was only created once by using an empty dependency array. We also added proper cleanup in the return function to remove channels when components unmount.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base font-semibold text-white mb-1">Challenge: Ugly Browser Delete Confirmation</h3>
              <p className="text-sm text-slate-300">
                <span className="text-slate-400">Problem:</span> The default browser <code className="bg-slate-900 px-1 rounded">confirm()</code> popup looked outdated and didn't match our app's modern design.
                <br/><br/>
                <span className="text-slate-400">Solution:</span> Built a custom delete confirmation modal with a beautiful glassmorphism design, warning icon, and smooth animations. Used React state to manage modal visibility and the bookmark ID to delete, creating a much better user experience that matches our app's aesthetic.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-base font-semibold text-white mb-1">Challenge: Google OAuth Callback Configuration</h3>
              <p className="text-sm text-slate-300">
                <span className="text-slate-400">Problem:</span> Setting up Google OAuth required proper callback URLs and handling the authentication flow in Next.js App Router.
                <br/><br/>
                <span className="text-slate-400">Solution:</span> Configured Supabase with the correct site URL and redirect URLs. Created an auth callback route at <code className="bg-slate-900 px-1 rounded">/auth/callback</code> to handle the OAuth response and exchange the code for a session. Used middleware to protect routes and redirect unauthenticated users to the login page.
              </p>
            </div>

          </div>
        </div>

        {/* Deployment */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Deployment</h2>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <p className="text-sm text-slate-300 leading-relaxed">
              Application is deployed on <span className="font-semibold text-white">Vercel</span> with automatic deployments from GitHub. 
              The database is hosted on <span className="font-semibold text-white">Supabase Cloud</span> with environment 
              variables securely configured and authentication callbacks properly set up for production.
            </p>
          </div>
        </div>

        {/* Future Improvements */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Potential Future Features</h2>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Tags and folders for organizing bookmarks into categories</li>
              <li>• Search functionality to quickly find bookmarks by title or URL</li>
              <li>• Bookmark import from browser bookmarks (Chrome, Firefox, etc.)</li>
              <li>• Browser extension for one-click bookmark saving</li>
              <li>• Automatic link preview with website metadata and favicons</li>
              <li>• Sharing bookmarks or creating public collections</li>
              <li>• Dark/light mode toggle</li>
              <li>• Bulk operations (delete multiple, move to folders)</li>
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-6 border-t border-slate-700">
          <p className="text-sm text-slate-400 text-center">
            Smart Bookmark Manager • {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </div>
  )
}