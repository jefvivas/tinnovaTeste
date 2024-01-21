import { useState } from "react";
import DeleteModal from "../../Components/Modal/DeleteModal";
import { useUser } from "../../Context/Users";
import {
  UserCardContainer,
  UserName,
  UserInfo,
  UserListContainer,
  DeleteButton,
  EditButton,
} from "./styles";
import { MdDelete, MdEdit } from "react-icons/md";
import { User } from "../../Interfaces/user";
import { deleteUser } from "../../Services/DeleteUser";
import EditModal from "../../Components/Modal/EditModal";
import Navbar from "../../Components/Navbar";

const UserList = () => {
  const { users, setUsers } = useUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser);
      const updatedUsers = users.filter(
        (existingUser) => existingUser.cpf !== selectedUser.cpf
      );
      setUsers(updatedUsers);

      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <>
      <Navbar />
      <UserListContainer>
        {users && (
          <>
            {users.map((user) => (
              <UserCardContainer key={user.cpf}>
                <DeleteButton onClick={() => handleDeleteClick(user)}>
                  <MdDelete />
                </DeleteButton>
                <EditButton onClick={() => handleEditClick(user)}>
                  <MdEdit />
                </EditButton>
                {isDeleteModalOpen &&
                  selectedUser &&
                  selectedUser.cpf === user.cpf && (
                    <DeleteModal
                      onCancel={handleCancelDelete}
                      onConfirm={handleConfirmDelete}
                    />
                  )}
                {isEditModalOpen &&
                  selectedUser &&
                  selectedUser.cpf === user.cpf && (
                    <EditModal
                      isOpen={isEditModalOpen}
                      user={selectedUser}
                      closeModal={toggleEditModal}
                    />
                  )}
                <UserName>{user.name}</UserName>
                <UserInfo>CPF: {user.cpf}</UserInfo>
                <UserInfo>Telefone: {user.phone}</UserInfo>
                <UserInfo>Email: {user.email}</UserInfo>
              </UserCardContainer>
            ))}
          </>
        )}
      </UserListContainer>
    </>
  );
};

export default UserList;
