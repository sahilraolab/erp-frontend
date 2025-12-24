import { useState } from "react";
import { api } from "../lib/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    await api.request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    setDone(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Reset Password</h1>
            <p className="text-gray-300 text-sm mt-1">Enter your email to receive reset instructions</p>
          </div>

          <form onSubmit={submit} className="px-8 py-6 space-y-5">
            {done ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                If the email exists, reset instructions were sent.
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-md transition-colors duration-200">
                  Send Reset Link
                </button>
              </>
            )}

            <div className="text-center pt-2">
              <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 transition">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
