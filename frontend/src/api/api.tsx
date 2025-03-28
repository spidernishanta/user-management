import { User, UserCreateDTO, UserUpdateDTO } from "../app/types/user";

const API_BASE_URL = "http://localhost:3001/api";

const handleResponse = async (response: Response) => {
  const text = await response.text();
  try {
    if (!response.ok) {
      const error = text
        ? JSON.parse(text)
        : { message: `HTTP Error ${response.status}` };
      throw new Error(
        error.message || `request failed with status ${response.status}`
      );
    }
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("response parsing error:", error);
    throw new Error("failed to process server response");
  }
};

export const userApi = {
  //create user api
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
      console.error("create user error:", error);
      throw new Error(
        error instanceof Error ? error.message : "failed to create user"
      );
    }
  },

  //get all users api

  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      return await handleResponse(response);
    } catch (error) {
      console.error("get users error:", error);
      throw new Error(
        error instanceof Error ? error.message : "failed to fetch users"
      );
    }
  },

  //update user api
  updateUser: async (
    userId: string,
    userData: UserUpdateDTO
  ): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("update user error:", error);
      throw new Error(
        error instanceof Error ? error.message : "failed to update user"
      );
    }
  },

  // delete user api
  deleteUser: async (userId: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "DELETE",
      });
      await handleResponse(response);
      return true;
    } catch (error) {
      console.error("delete user error:", error);
      throw new Error(
        error instanceof Error ? error.message : "failed to delete user"
      );
    }
  },
};
