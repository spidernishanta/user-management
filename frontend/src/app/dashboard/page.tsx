"use client";
import { useState } from 'react';
import UserModal from '../components/UserModal';
import UsersTable from '../components/UsersTable';
import { User } from '../types/user';

export default function HomePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = async (userData: Partial<User>) => {
    try {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error instanceof Error ? error.message : 'Failed to create user');
      throw error;
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center">User Management</h1>
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add User
          </button>
          <button
            onClick={() => setShowUsersList(!showUsersList)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            {showUsersList ? 'Hide Users' : 'All Users'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {showUsersList && (
          <UsersTable 
            key={refreshKey} 
            onRefresh={() => setRefreshKey(prev => prev + 1)} 
          />
        )}

        {showAddModal && (
          <UserModal
            onClose={() => {
              setShowAddModal(false);
              setError(null);
            }}
            onSuccess={() => {
              setRefreshKey(prev => prev + 1);
              setShowAddModal(false);
              setShowUsersList(true);
              setError(null);
            }}
            onSubmit={handleAddUser}
          />
        )}
      </div>
    </main>
  );
}