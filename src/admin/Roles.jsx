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
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Roles</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gray-900 text-white px-4 py-2 rounded"
                >
                    + Create Role
                </button>
            </div>

            {roles.map(role => (
                <div
                    key={role.id}
                    className="bg-white p-4 rounded shadow flex justify-between"
                >
                    <div>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-sm text-gray-500">
                            {role.permissions.length} permissions
                        </div>
                    </div>

                    <button
                        onClick={() => setSelectedRole(role)}
                        className="text-blue-600 text-sm"
                    >
                        Manage Permissions
                    </button>
                </div>
            ))}

            {showForm && (
                <RoleForm
                    onClose={() => setShowForm(false)}
                    onSaved={() => {
                        setShowForm(false);
                        loadRoles();
                    }}
                />
            )}

            {selectedRole && (
                <RolePermissions
                    role={selectedRole}
                    onClose={() => setSelectedRole(null)}
                    onSaved={() => {
                        setSelectedRole(null);
                        loadRoles();
                    }}
                />
            )}
        </div>
    );
}
