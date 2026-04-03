import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Get verification token from localStorage or location state
  const verificationToken = localStorage.getItem("verificationToken") || location.state?.verificationToken;

  useEffect(() => {
    // Check if user has verification token
    if (!verificationToken) {
      setError("No verification token found. Please start from forgot password.");
      setTimeout(() => navigate("/forgot-password"), 2000);
    }
  }, [verificationToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/reset-password", {
        token: verificationToken,
        newPassword
      });

      // Clear verification token
      localStorage.removeItem("verificationToken");

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  if (error && !verificationToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-secondary-light/10">
        <div className="form-container max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-lg text-error mb-4">{error}</p>
          <p className="text-text-light">Redirecting to password reset request...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-secondary-light/10 px-4">
      <div className="form-container max-w-md w-full">
        {success ? (
          <div className="text-center animate-slideIn">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-success mb-2">
              Password Reset Successful
            </h1>
            <p className="text-text-light mb-6">
              Your password has been reset. You can now login with your new password.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-text-light">
                <span className="inline-block animate-bounce mr-2">•</span>
                <span className="inline-block animate-bounce mr-2">•</span>
                <span className="inline-block animate-bounce">•</span>
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🔑</div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Create New Password
              </h1>
              <p className="text-text-light text-sm">
                Enter a strong password for your account
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="form-error animate-slideIn mb-6">
                <div className="flex items-start gap-2">
                  <span className="text-xl">⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light hover:text-primary transition"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <p className="text-xs text-text-light mt-2">
                  Minimum 6 characters. Use uppercase, numbers, and symbols for strength
                </p>
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light hover:text-primary transition"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !newPassword || !confirmPassword}
                className="btn btn-primary w-full mt-6"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="spinner" style={{ width: "16px", height: "16px" }}></span>
                    Resetting Password...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
              <p className="text-text-light text-sm">
                <a
                  href="/login"
                  className="text-secondary font-semibold hover:text-secondary-dark"
                >
                  Back to login
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
