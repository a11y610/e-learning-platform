import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function ResetPassword() {
  const [form, setForm] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/reset-password", {
        token: form.token,
        newPassword: form.newPassword,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-secondary-light/10 px-4">
      <div className="form-container max-w-md w-full">
        {success ? (
          <div className="text-center animate-slideIn">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-success mb-2">
              Password Reset
            </h1>
            <p className="text-text-light mb-6">
              Your password has been reset successfully. Redirecting to login...
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
                Reset Password
              </h1>
              <p className="text-text-light text-sm">
                Enter your token and new password
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="form-error animate-slideIn mb-6">
                <div className="flex items-start gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Token */}
              <div className="form-group">
                <label className="form-label">Reset Token</label>
                <input
                  type="text"
                  placeholder="Paste your reset token"
                  value={form.token}
                  onChange={(e) => setForm({ ...form, token: e.target.value })}
                  required
                  className="w-full font-mono text-sm"
                />
                <p className="text-xs text-text-light mt-1">
                  Copy from the previous step
                </p>
              </div>

              {/* New Password */}
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  required
                  className="w-full"
                />
                <p className="text-xs text-text-light mt-1">
                  Minimum 6 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full mt-6"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="spinner" style={{ width: "16px", height: "16px" }}></span>
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
              <p className="text-text-light text-sm">
                <Link
                  to="/forgot-password"
                  className="text-secondary font-semibold hover:text-secondary-dark"
                >
                  Request another token
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
