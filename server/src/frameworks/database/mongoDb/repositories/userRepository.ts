import { UserInterface } from "../../../../types/userInterface";
import User from "../models/userModel";

export const userRepositoryMongoDB = () => {
  const getUserByEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email });
    return user;
  };

  const addUser = async (user: {
    userName: string;
    email: string;
    phone: number;
    password?: string;
  }) => {
    return await User.create(user)
  }

  return {
    getUserByEmail,
    addUser,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;