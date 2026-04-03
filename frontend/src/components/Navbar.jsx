import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    if (token) {
      api.get("/auth/me").then((res) => setUser(res.data)).catch(() => setUser(null));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-xl font-bold text-primary dark:text-neutral-100 hover:text-secondary dark:hover:text-secondary transition-colors"
        >
          <span className="text-2xl">📚</span>
          <span className="tracking-tight">E-Learning</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-secondary dark:hover:text-secondary transition-colors px-3 py-1.5"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary text-sm px-4 py-2"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-secondary dark:hover:text-secondary transition-colors hidden sm:inline-block px-3 py-1.5"
              >
                Explore
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-secondary dark:hover:text-secondary transition-colors hidden sm:inline-block px-3 py-1.5"
              >
                Dashboard
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-warning text-white rounded-base text-sm font-semibold hover:bg-orange-600 transition-colors"
                >
                  ⚙️ Admin
                </Link>
              )}

              {/* User name */}
              <span className="text-sm text-neutral-500 dark:text-neutral-400 hidden sm:inline font-medium">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="btn btn-danger text-sm px-4 py-2"
              >
                Logout
              </button>
            </>
          )}

          {/* Dark / Light mode toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="ml-1 p-2 rounded-base text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
