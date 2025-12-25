import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";

import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";

import AppLayout from "./layouts/AppLayout";
import Profile from "./pages/Profile";

// Admin
import Users from "./admin/Users";
import Roles from "./admin/Roles";
import AuditLogs from "./admin/AuditLogs";

// Masters
import CompanyList from "./masters/CompanyList";
import BranchList from "./masters/BranchList";
import ProjectList from "./masters/ProjectList";
import DepartmentList from "./masters/DepartmentList";
import UOMList from "./masters/UOMList";
import CostCenterList from "./masters/CostCenterList";
import MaterialList from "./masters/MaterialList";
import SupplierList from "./masters/SupplierList";
import TaxList from "./masters/TaxList";

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

            {/* ADMIN */}
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/roles" element={<Roles />} />
            <Route path="admin/audit" element={<AuditLogs />} />

            {/* MASTERS */}
            <Route path="masters/companies" element={<CompanyList />} />
            <Route path="masters/branches" element={<BranchList />} />
            <Route path="masters/projects" element={<ProjectList />} />
            <Route path="masters/departments" element={<DepartmentList />} />
            <Route path="masters/uoms" element={<UOMList />} />
            <Route path="masters/cost-centers" element={<CostCenterList />} />
            <Route path="masters/materials" element={<MaterialList />} />
            <Route path="masters/suppliers" element={<SupplierList />} />
            <Route path="masters/taxes" element={<TaxList />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
