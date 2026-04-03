import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleRequestToken = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setToken(res.data.token);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Error requesting reset token");
    } finally {
      setLoading(false);
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-secondary-light/10 px-4">
      <div className="form-container max-w-md w-full">
        {step === 1 ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🔐</div>
              <h1 className="text-3xl font-bold text-primary mb-2">Forgot Password?</h1>
              <p className="text-text-light text-sm">
                No worries! We'll help you reset it.
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
            <form onSubmit={handleRequestToken} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <p className="text-xs text-text-light mt-1">
                  We'll send you a reset token to this email
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="spinner" style={{ width: "16px", height: "16px" }}></span>
                    Requesting Token...
                  </span>
                ) : (
                  "Request Reset Token"
                )}
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
              <p className="text-text-light text-sm">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-secondary font-semibold hover:text-secondary-dark"
                >
                  Back to login
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Token Display */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">✅</div>
              <h1 className="text-3xl font-bold text-success mb-2">Token Generated</h1>
              <p className="text-text-light text-sm">
                Copy your reset token below
              </p>
            </div>

            {/* Token Box */}
            <div className="bg-neutral-50 border-2 border-neutral-200 rounded-base p-4 mb-6">
              <p className="text-xs text-text-light mb-2 font-semibold">
                RESET TOKEN (expires in 10 minutes)
              </p>
              <div className="bg-white rounded p-3 font-mono text-sm text-primary break-all border border-neutral-300">
                {token}
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={copyToken}
              className="btn btn-secondary w-full mb-3"
            >
              {copied ? "✅ Copied!" : "📋 Copy Token"}
            </button>

            {/* Next Button */}
            <Link
              to="/reset-password"
              className="block text-center btn btn-primary w-full"
            >
              Go to Reset Password →
            </Link>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-base">
              <p className="text-sm text-primary font-semibold mb-2">💡 Next Steps:</p>
              <ol className="text-xs text-text-light space-y-1 ml-4">
                <li>1. Copy your reset token</li>
                <li>2. Go to "Reset Password" page</li>
                <li>3. Paste token and set new password</li>
              </ol>
            </div>

            {/* Back Link */}
            <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
              <p className="text-text-light text-sm">
                <Link
                  to="/login"
                  className="text-secondary font-semibold hover:text-secondary-dark"
                >
                  Back to login
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
