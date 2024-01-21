import { User } from "../../Interfaces/user";
import { getUsersFromLocalStorage } from "../GetUsers";
import { toast } from "react-toastify";

export const deleteUser = (user: User): User => {
  try {
    const existingUsers = getUsersFromLocalStorage();

    const userToDelete = existingUsers.filter(
      (existingUser) => existingUser.cpf === user.cpf
    );

    if (!userToDelete.length) {
      toast.error("Usuário não existe");

      return {} as User;
    }

    const updatedUsers = existingUsers.filter(
      (existingUser) => existingUser.cpf !== user.cpf
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("Usuário removido com sucesso");

    return user;
  } catch (error: any) {
    console.error(error);
    return {} as User;
  }
};
