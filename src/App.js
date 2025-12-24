import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";

import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";

import AppLayout from "./layouts/AppLayout";
import Profile from "./pages/Profile";
import Users from "./admin/Users";
import Roles from "./admin/Roles";
import AuditLogs from "./admin/AuditLogs";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

          {/* PRIVATE */}
          <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Profile />} />

            <Route path="admin/users" element={<Users />} />
            <Route path="admin/roles" element={<Roles />} />
            <Route path="admin/audit" element={<AuditLogs />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
