import { useState } from "react";
import {
  ModalOverlay,
  ErrorMessage,
  InputField,
  EditForm,
  ErrorMessageWrapper,
} from "./styles";
import RequestButton from "../../../Components/RequestButton";
import { User } from "../../../Interfaces/user";
import {
  isNameValid,
  isEmailValid,
  isPhoneValid,
} from "../../../Utils/Validators";
import { useUser } from "../../../Context/Users";
import { editUser } from "../../../Services/EditUser";
import { formatPhone } from "../../../Utils/Formatters";

interface EditModalProps {
  user: User;
  isOpen: boolean;
  closeModal: () => void;
}

const EditModal = ({ user, isOpen, closeModal }: EditModalProps) => {
  const [formData, setFormData] = useState<User>(user);
  const [isLoading, setIsLoading] = useState(false);

  const { setUsers } = useUser();

  const isEnabled = (userData: User): boolean => {
    if (!userData.email || !userData.name || !userData.phone) return false;

    if (
      !isEmailValid(userData.email) ||
      !isNameValid(userData.name) ||
      !isPhoneValid(userData.phone)
    )
      return false;
    return true;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditUser = (user: User) => {
    if (!isEnabled(user)) return;
    editUser(user);
    closeModal();
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleEdit = (e: any) => {
    e.preventDefault();

    if (!isEnabled(formData)) return;

    setIsLoading(true);

    setTimeout(() => {
      handleEditUser(formData);
      setUsers((existingUsers) =>
        existingUsers.map((user) =>
          user.cpf === formData.cpf ? formData : user
        )
      );
      setIsLoading(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <EditForm onSubmit={handleEdit}>
        <InputField
          type="text"
          name="name"
          placeholder="Nome Completo (sem abreviações)"
          value={formData.name}
          onChange={handleInputChange}
          isValid={isNameValid(formData.name)}
        />
        {!isNameValid(formData.name) && (
          <ErrorMessageWrapper>
            <ErrorMessage>Nome deve ter 3 ou mais caracteres</ErrorMessage>
          </ErrorMessageWrapper>
        )}
        <InputField
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          isValid={isEmailValid(formData.email)}
        />
        {!isEmailValid(formData.email) && (
          <ErrorMessageWrapper>
            <ErrorMessage>Email inválido</ErrorMessage>
          </ErrorMessageWrapper>
        )}
        <InputField
          type="text"
          name="phone"
          placeholder="Telefone"
          value={formatPhone(formData.phone)}
          onChange={handleInputChange}
          isValid={isPhoneValid(formData.phone)}
        />
        {!isPhoneValid(formData.phone) && (
          <ErrorMessageWrapper>
            <ErrorMessage>Telefone deve ter 10 ou 11 números</ErrorMessage>
          </ErrorMessageWrapper>
        )}
        <RequestButton
          type="submit"
          isLoading={isLoading}
          text="Cadastrar"
          isEnabled={isEnabled(formData)}
        />
      </EditForm>
    </ModalOverlay>
  );
};

export default EditModal;
