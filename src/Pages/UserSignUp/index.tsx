import { useState } from "react";
import {
  InputField,
  LoginContainer,
  LoginForm,
  ErrorMessage,
  ErrorMessageWrapper,
} from "./styles";
import RequestButton from "../../Components/RequestButton";
import { postUser } from "../../Services/PostUser";
import {
  isCpfValid,
  isEmailValid,
  isNameValid,
  isPhoneValid,
} from "../../Utils/Validators";
import { formatCpf, formatPhone } from "../../Utils/Formatters";
import { useUser } from "../../Context/Users";
import { User } from "../../Interfaces/user";
import Navbar from "../../Components/Navbar";

const UserSignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { setUsers } = useUser();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = (user: User) => {
    if (!isEnabled(user)) return;
    const createdUser = postUser(user);
    if (!createdUser) return;
    setUserData({
      name: "",
      email: "",
      cpf: "",
      phone: "",
    });
    setUsers((existingUsers) => [...existingUsers, userData]);
  };

  const isEnabled = (userData: User): boolean => {
    if (!userData.cpf || !userData.email || !userData.name || !userData.phone)
      return false;

    if (
      !isCpfValid(userData.cpf) ||
      !isEmailValid(userData.email) ||
      !isNameValid(userData.name) ||
      !isPhoneValid(userData.phone)
    )
      return false;
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEnabled(userData)) return;

    setIsLoading(true);

    setTimeout(() => {
      handleSignUp(userData);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit}>
          <h2>Cadastrar Usuário</h2>
          <InputField
            type="text"
            name="name"
            placeholder="Nome Completo (sem abreviações)"
            value={userData.name}
            onChange={handleInputChange}
            isValid={isNameValid(userData.name)}
          />
          {!isNameValid(userData.name) && (
            <ErrorMessageWrapper>
              <ErrorMessage>Nome deve ter 3 ou mais caracteres</ErrorMessage>
            </ErrorMessageWrapper>
          )}
          <InputField
            type="text"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleInputChange}
            isValid={isEmailValid(userData.email)}
          />
          {!isEmailValid(userData.email) && (
            <ErrorMessageWrapper>
              <ErrorMessage>Email inválido</ErrorMessage>
            </ErrorMessageWrapper>
          )}
          <InputField
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formatCpf(userData.cpf)}
            onChange={handleInputChange}
            isValid={isCpfValid(userData.cpf)}
          />
          {!isCpfValid(userData.cpf) && (
            <ErrorMessageWrapper>
              <ErrorMessage>CPF inválido</ErrorMessage>
            </ErrorMessageWrapper>
          )}

          <InputField
            type="text"
            name="phone"
            placeholder="Telefone"
            value={formatPhone(userData.phone)}
            onChange={handleInputChange}
            isValid={isPhoneValid(userData.phone)}
          />
          {!isPhoneValid(userData.phone) && (
            <ErrorMessageWrapper>
              <ErrorMessage>Telefone deve ter 10 ou 11 números</ErrorMessage>
            </ErrorMessageWrapper>
          )}
          <RequestButton
            type="submit"
            isLoading={isLoading}
            text="Cadastrar"
            isEnabled={isEnabled(userData)}
          />
        </LoginForm>
      </LoginContainer>
    </>
  );
};

export default UserSignUp;
