import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../lib/api";

export default function Profile() {
  const { user, logout } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  if (!user) return null;

  const changePassword = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (newPassword !== confirmPassword) {
      setMsg({ type: "error", text: "Passwords do not match" });
      return;
    }

    try {
      setLoading(true);
      await api.request("/admin/me/password", {
        method: "PUT",
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      setMsg({ type: "success", text: "Password updated successfully" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      {/* PROFILE INFO */}
      <div>
        <h1 className="text-xl font-semibold mb-4">My Profile</h1>

        <div className="bg-white p-6 rounded shadow space-y-3">
          <div>
            <span className="text-gray-500 text-sm">Name</span>
            <div className="font-medium">{user.name}</div>
          </div>

          <div>
            <span className="text-gray-500 text-sm">Email</span>
            <div className="font-medium">{user.email}</div>
          </div>

          <div>
            <span className="text-gray-500 text-sm">Role</span>
            <div className="font-medium">{user.role}</div>
          </div>

          <div>
            <span className="text-gray-500 text-sm">Permissions</span>
            <div className="text-sm text-gray-700">
              {user.permissions.length} assigned
            </div>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Change Password</h2>

        <form
          onSubmit={changePassword}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          {msg && (
            <div
              className={`text-sm ${
                msg.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {msg.text}
            </div>
          )}

          <input
            type="password"
            placeholder="Current password"
            className="w-full border p-2 rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="New password"
            className="w-full border p-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="bg-gray-900 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
