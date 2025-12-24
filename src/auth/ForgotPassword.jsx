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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-lg font-semibold mb-4">Forgot Password</h1>

        {done ? (
          <p className="text-sm text-green-600">
            If the email exists, reset instructions were sent.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="w-full bg-gray-900 text-white py-2 rounded">
              Send reset link
            </button>
          </>
        )}

        <Link to="/login" className="block text-sm mt-4 text-gray-600">
          Back to login
        </Link>
      </form>
    </div>
  );
}
