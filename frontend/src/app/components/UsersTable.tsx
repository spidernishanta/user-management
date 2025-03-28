"use client";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import UserModal from "./UserModal";

export default function UsersTable({
  onRefresh,
  onUsersLoaded,
}: {
  onRefresh: () => void;
  onUsersLoaded: (hasUsers: boolean) => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const result = await response.json();

        // Ensure we're accessing the data array
        if (Array.isArray(result?.data)) {
          setUsers(result.data);
        } else {
          setUsers([]);
          console.error("Invalid response format:", result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [onRefresh, onUsersLoaded]);

  // Update user function
  const updateUser = async (userData: Partial<User>) => {
    if (!userData._id) {
      setError("Invalid user ID");
      return;
    }

    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      onRefresh();
      setEditingUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
    }
  };

  // Delete user function
  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      onRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full absolute border-4 border-t-blue-500 border-r-green-500 border-b-yellow-500 border-l-red-500 animate-spin"></div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 animate-pulse"></div>
          </div>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
            Loading users...
          </span>
        </div>
      </div>
    );

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table headers */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                {/* Table cells */}
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="px-4 py-2 text-gray-700 bg-blue-100 rounded-md hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="px-4 py-2 text-red-700 bg-gray-100 rounded-md hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No users found. Click "Add User" to create new users.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* User Modal */}
      {editingUser && (
        <UserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={() => {
            onRefresh();
            setEditingUser(null);
          }}
          onSubmit={updateUser}
        />
      )}
    </div>
  );
}
