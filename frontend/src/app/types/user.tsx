export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreateDTO = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UserUpdateDTO = Partial<UserCreateDTO>;
