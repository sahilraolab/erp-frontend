import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import UserForm from "./UserForm";

export default function Users() {
    const { can } = useAuth();
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        api.request("/admin/users").then(setUsers);
    }, []);

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Users</h1>

            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role?.name}</td>
                            <td>{u.isActive ? "Active" : "Disabled"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {can("admin.users.manage") && (
                <button
                    onClick={() => setShowForm(true)}
                    className="mt-4 bg-gray-900 text-white px-4 py-2 rounded"
                >
                    + Create User
                </button>
            )}

            {showForm && (
                <UserForm
                    user={editUser}
                    onClose={() => {
                        setShowForm(false);
                        setEditUser(null);
                    }}
                    onSaved={() => api.request("/admin/users").then(setUsers)}
                />
            )}
        </div>
    );
}
