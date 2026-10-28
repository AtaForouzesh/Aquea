import { HiPencil, HiTrash } from "react-icons/hi";
import styled from "styled-components";
import { useDeleteUser } from "./useDeleteUser";
import CreateUserForm from "./CreateUserForm";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Avatar = styled.img`
  display: block;
  width: 4rem;
  aspect-ratio: 3/ 3;
  object-fit: cover;
  border-radius: 50%;
  transform: scale(1.5) translateX(-8px);
  justify-self: center;
`;
const FullName = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #efeabb;
  font-family: "Sono";
  text-transform: capitalize;
  text-align: center;
`;
const Email = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: #efeabb;
  font-family: "Sono";
  white-space: nowrap;
  text-align: center;
`;
const Phone = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: #efeabb;
  font-family: "Sono";
  text-align: center;
`;
const Role = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #efeabb;
  font-family: "Sono";
  text-transform: capitalize;
  text-align: center;
`;
const StyledButtonsDiv = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const UsersRow = ({ user }) => {
  const { id: userId, full_name, email, phone, role, avatar } = user;
  const { isDeleting, deleteUser } = useDeleteUser();

  return (
    <Table.Row>
      <Avatar src={avatar} alt={full_name} />
      <FullName>{full_name}</FullName>
      <Email>{email}</Email>
      <Phone>{phone}</Phone>
      <Role>{role}</Role>
      <StyledButtonsDiv>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={userId} />
              <Menus.List id={userId}>
                <Menus.Button icon={<HiPencil />}>
                  <Modal.Open opens="edit">
                    <span>Edit</span>
                  </Modal.Open>
                </Menus.Button>
                <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                  <Modal.Open opens="delete">
                    <span>Delete</span>
                  </Modal.Open>
                </Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </Menus>
          <Modal.Window name="edit">
            <CreateUserForm userToEdit={user} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              onConfirm={() => deleteUser(userId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </StyledButtonsDiv>
    </Table.Row>
  );
};

export default UsersRow;
