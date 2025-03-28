import { User, UserCreateDTO, UserUpdateDTO } from "../app/types/user";

const API_BASE_URL = "http://localhost:3001/api";

// Enhanced error handler
const handleResponse = async (response: Response) => {
  const text = await response.text();
  try {
    if (!response.ok) {
      const error = text
        ? JSON.parse(text)
        : { message: `HTTP Error ${response.status}` };
      throw new Error(
        error.message || `Request failed with status ${response.status}`
      );
    }
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Response parsing error:", error);
    throw new Error("Failed to process server response");
  }
};

export const userApi = {
  createUser: async (userData: UserCreateDTO): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Create User Error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create user"
      );
    }
  },

  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      return await handleResponse(response);
    } catch (error) {
      console.error("Get Users Error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch users"
      );
    }
  },

  // Fixed updateUser method
  updateUser: async (
    userId: string,
    userData: UserUpdateDTO
  ): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        // Removed colon prefix
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Update User Error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update user"
      );
    }
  },

  // Fixed deleteUser method
  deleteUser: async (userId: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        // Removed colon prefix
        method: "DELETE",
      });
      await handleResponse(response);
      return true;
    } catch (error) {
      console.error("Delete User Error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete user"
      );
    }
  },
};
