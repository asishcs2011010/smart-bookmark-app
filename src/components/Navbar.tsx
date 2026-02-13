export default function Navbar() {
  const isLoggedIn = true;

  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        
        <h1 className="text-lg font-semibold text-white">
          Smart Bookmark App
        </h1>

        <div className="flex gap-4 text-sm text-slate-400">
          <a href="/" className="hover:text-white transition">
            Home
          </a>
          <a href="/bookmarks" className="hover:text-white transition">
            Bookmarks
          </a>
          <a href="/about" className="hover:text-white transition">
            About
          </a>
        </div>

        <button className="text-sm px-3 py-1.5 rounded-md bg-white text-black hover:bg-slate-200 transition">
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}
