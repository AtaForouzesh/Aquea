import styled from "styled-components";
import Headings from "../Components/Headings";
import UsersTable from "../Features/Users/UsersTable";
import { useUser } from "../Features/Users/useUser";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  margin: 0px;
  font-size: 24px;
  background-color: #558467;
  color: #efeabb;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #466d55;
    cursor: pointer;
  }
  & svg {
    font-size: 24px;
  }
`;

const Users = () => {
  const { role, isLoading } = useUser();
  const isAdmin = role === "admin";
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          color: "#efeabb",
          fontSize: "28px",
          textAlign: "center",
        }}
      >
        Loading user details...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          margin: "10px 20px",
          padding: "0px",
        }}
      >
        <StyledButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <HiArrowLeft />
          Go Back
        </StyledButton>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            color: "#efeabb",
            fontSize: "28px",
            textAlign: "center",
          }}
        >
          You're not authenticated to have access to this page
        </div>
      </div>
    );
  }
  return (
    <>
      <Headings as="h1" style={{ margin: "30px 18px", color: "#efeabb" }}>
        Users
      </Headings>
      <UsersTable />
    </>
  );
};

export default Users;
