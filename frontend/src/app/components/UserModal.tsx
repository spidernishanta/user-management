"use client";
import { useEffect, useState } from "react";
import { User } from "../types/user";

type UserModalProps = {
  user?: User | null;
  onClose: () => void;
  onSuccess: () => void;
  onSubmit: (userData: Partial<User>) => Promise<void>;
};

export default function UserModal({
  user: initialData,
  onClose,
  onSuccess,
  onSubmit,
}: UserModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    age: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // initialize form with user data
  useEffect(() => {
    if (initialData) {
      setFormData({
        _id: initialData._id,
        name: initialData.name,
        email: initialData.email,
        age: initialData.age,
      });
    } else {
      setFormData({ name: "", email: "", age: undefined });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const submissionData = {
        ...formData,
      };

      await onSubmit(submissionData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "failed to save user. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? "Edit User" : "Add New User"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.age?.toString() || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  age: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              disabled={isSubmitting}
            />
          </div>

          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : initialData
                ? "Update User"
                : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
