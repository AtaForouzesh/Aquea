import styled from "styled-components";
import Search from "./Search";
import Headings from "./Headings";
import { useLogout, useUser } from "../Authentication/useAuth";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";

const StyledHeader = styled.header`
  padding: 11px 9px;
  border-bottom: 1px solid #a7b170;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: #17433f;
  grid-area: header;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin: 0px;
  color: #efeabb;
  z-index: 0;
`;

const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 500;
  font-size: 24px;
  color: "#374151" & img {
    display: block;
    width: 64px;
    aspect-ratio: 3/ 3;
    object-fit: cover;
    object-position: center;
    outline: 2px solid #e5e7eb;
    border-radius: 50%;
    transform: scale(1.5) translateX(-8px);
  }
`;
const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0px 0px;
  margin: 0;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
  & svg {
    width: 36px;
    height: 36px;
    color: #4b1426;
  }
`;

const Header = () => {
  const { user } = useUser();
  const { isLoggingOut, logout } = useLogout();
  const full_name = user?.user_metadata?.full_name || "User";
  const avatar = user?.user_metadata?.avatar;
  return (
    <StyledHeader>
      <Headings as="h1">AQUEA</Headings>
      <Search />
      <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
        <UserAvatar>
          {avatar ? (
            <img src={avatar} alt={full_name} />
          ) : (
            <HiOutlineUser style={{ width: "2.4rem", height: "2.4rem" }} />
          )}
          <spand style={{ textTransform: "capitalize" }}>{full_name}</spand>
        </UserAvatar>
        <ButtonIcon disabled={isLoggingOut} onClick={() => logout()}>
          <HiOutlineLogout />
        </ButtonIcon>
      </div>
    </StyledHeader>
  );
};

export default Header;
