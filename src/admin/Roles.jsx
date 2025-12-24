import { useEffect, useState } from "react";
import { api } from "../lib/api";
import RoleForm from "./RoleForm";
import RolePermissions from "./RolePermissions";

export default function Roles() {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const loadRoles = () => {
        api.request("/admin/roles").then(setRoles);
    };

    useEffect(() => {
        loadRoles();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Roles</h1>
                    <p className="text-gray-600 text-sm mt-1">Define roles and manage permissions</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200"
                >
                    + Create Role
                </button>
            </div>

            <div className="grid gap-4">
                {roles.map(role => (
                    <div
                        key={role.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {role.permissions.length} permission{role.permissions.length !== 1 ? 's' : ''} assigned
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedRole(role)}
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                            >
                                Manage Permissions
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <RoleForm
                        onClose={() => setShowForm(false)}
                        onSaved={() => {
                            setShowForm(false);
                            loadRoles();
                        }}
                    />
                </div>
            )}

            {selectedRole && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <RolePermissions
                        role={selectedRole}
                        onClose={() => setSelectedRole(null)}
                        onSaved={() => {
                            setSelectedRole(null);
                            loadRoles();
                        }}
                    />
                </div>
            )}
        </div>
    );
}
