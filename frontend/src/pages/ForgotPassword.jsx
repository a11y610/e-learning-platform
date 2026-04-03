import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Show token
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
            <p className="text-gray-600 text-sm mb-4 text-center">
              Enter your email to receive a password reset token
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleRequestToken}>
              <input
                type="email"
                className="w-full p-2 mb-4 border rounded"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Requesting..." : "Request Reset Token"}
              </button>
            </form>

            <p className="text-center text-sm mt-4">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Back to Login
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Reset Token</h2>
            <p className="text-gray-600 text-sm mb-4">
              Your reset token has been generated. Copy it below and go to the reset password page.
            </p>

            <div className="bg-gray-100 p-3 rounded mb-4 break-all text-sm font-mono">
              {token}
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(token)}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-2"
            >
              Copy Token
            </button>

            <Link
              to="/reset-password"
              className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center"
            >
              Go to Reset Password
            </Link>

            <p className="text-center text-xs text-gray-500 mt-4">
              ⏱️ Token expires in 10 minutes
            </p>
          </>
        )}
      </div>
    </div>
  );
}
