import { User } from "../../Interfaces/user";
import { getUsersFromLocalStorage } from "../GetUsers";
import { toast } from "react-toastify";

export const editUser = (user: User): User => {
  try {
    const existingUsers = getUsersFromLocalStorage();

    const updatedUsers = existingUsers.map((existingUser) =>
      existingUser.cpf === user.cpf ? user : existingUser
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("Usuário editado com sucesso");

    return user;
  } catch (error: any) {
    console.error(error);
    return {} as User;
  }
};
