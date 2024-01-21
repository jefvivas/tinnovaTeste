import axios, { AxiosResponse } from "axios";
import { User } from "../../Interfaces/user";

const url = "https://private-9d65b3-tinnova.apiary-mock.com/users";

export const GetInitialUserList = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axios.get(url);

    const users = response.data;
    localStorage.setItem("users", JSON.stringify(users));

    return users;
  } catch (error: any) {
    console.error(error);
    return [];
  }
};
