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
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold text-white hover:text-blue-100 transition">
        📚 E-Learning
      </Link>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {!token ? (
          <>
            <Link
              to="/login"
              className="text-white hover:text-blue-100 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="text-white hover:text-blue-100 font-medium transition"
            >
              Dashboard
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-white hover:text-blue-100 font-medium transition bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
