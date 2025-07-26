"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getAllUsers, updateUserRole, deleteUserById } from "@/lib/actions/admin.actions";
import { Models } from "node-appwrite";

type UserDocument = Models.Document & {
  fullName?: string;
  email?: string;
  role?: string;
};

type User = {
  $id: string;
  fullName: string;
  email: string;
  role: string;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res: UserDocument[] = await getAllUsers();

      if (res) {
        const formattedUsers: User[] = res.map((doc) => ({
          $id: doc.$id,
          fullName: doc.fullName ?? "Unknown",
          email: doc.email ?? "unknown@example.com",
          role: doc.role ?? "user",
        }));
        setUsers(formattedUsers);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    await updateUserRole(userId, newRole);
    setUsers((prev) =>
      prev.map((u) => (u.$id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleDelete = async (userId: string) => {
    await deleteUserById(userId);
    setUsers((prev) => prev.filter((u) => u.$id !== userId));
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-2xl font-semibold text-[#FA7275]">Admin Dashboard</div>

      {/* Uncomment this Card if needed
      <Card className="bg-pink-100 shadow-md p-6 rounded-2xl">
        <CardContent className="flex flex-col items-center space-y-2">
          <div className="text-5xl font-bold text-[#FA7275]">.02%</div>
          <div className="text-gray-600">Space used</div>
          <div className="text-sm text-gray-500">Available: 317.0 KB / 2GB</div>
        </CardContent>
      </Card>
      */}

      <div>
        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.$id}
              className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="font-medium">{user.fullName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.$id, e.target.value)}
                  className="rounded-md border px-2 py-1"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                </select>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(user.$id)}>
                  <Trash2 className="w-4 h-4 text-[#FA7275]" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
