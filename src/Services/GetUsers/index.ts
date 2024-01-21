import { User } from "../../Interfaces/user";

export const getUsersFromLocalStorage = (): User[] => {
  const storedUsersString = localStorage.getItem("users");
  return storedUsersString ? JSON.parse(storedUsersString) : [];
};
