import { User } from "../../Interfaces/user";
import { getUsersFromLocalStorage } from "../GetUsers";
import { toast } from "react-toastify";

export const postUser = (user: User): User | null => {
  try {
    const existingUsers = getUsersFromLocalStorage();

    const isDuplicate = existingUsers.some(
      (existingUser) =>
        existingUser.cpf === user.cpf || existingUser.email === user.email
    );

    if (isDuplicate) {
      toast.error("CPF ou e-mail já cadastrados");

      return null;
    }

    const updatedUsers = [...existingUsers, user];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("Usuário cadastrado com sucesso");

    return user;
  } catch (error: any) {
    console.error(error);
    return {} as User;
  }
};
