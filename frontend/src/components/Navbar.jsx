import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-secondary transition"
        >
          <span className="text-3xl">📚</span>
          <span>E-Learning</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-primary hover:text-secondary font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary text-sm"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-primary hover:text-secondary font-medium transition hidden sm:inline-block"
              >
                Explore
              </Link>
              <Link
                to="/dashboard"
                className="text-primary hover:text-secondary font-medium transition hidden sm:inline-block"
              >
                Dashboard
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-warning text-white rounded-base font-semibold hover:bg-orange-600 transition"
                >
                  ⚙️ Admin Panel
                </Link>
              )}

              {/* User Menu */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-light hidden sm:inline">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
