import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IoHome } from "react-icons/io5";
import { FaBookBookmark } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { useUser } from "../Features/Users/useUser";
import { SiNginxproxymanager } from "react-icons/si";

const StyledSidebar = styled.aside`
  grid-area: sidebar;
  padding: 0 0.6rem;
  margin: 0px;
  background-color: #558467;
`;
const StyledNavlist = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  padding: 0px;
`;
const StyledNavlink = styled(NavLink)`
  text-decoration: none;

  display: flex;
  gap: 12px;
  align-items: center;

  color: #efeabb;
  font-size: 28px;
  font-weight: 500;
  padding: 12px 20px;
  transition: all 0.3s ease-in-out;

  &:hover,
  &.active {
    background-color: #4b1426;
    border-radius: 8px;
  }
`;
const Sidebar = () => {
  const { role } = useUser();
  const isDealer = role === "dealer";
  return (
    <StyledSidebar>
      <nav>
        <StyledNavlist>
          <li>
            <StyledNavlink to="/dashboard">
              <IoHome />
              <span>Dashboard</span>
            </StyledNavlink>
          </li>

          <li>
            <StyledNavlink to="/deals">
              <FaBookBookmark />
              <span>Deals</span>
            </StyledNavlink>
          </li>

          <li>
            <StyledNavlink to="/users">
              <FaUsers />
              <span>Users</span>
            </StyledNavlink>
          </li>

          <li>
            <StyledNavlink to="/events">
              <MdEmojiEvents />
              <span>Events</span>
            </StyledNavlink>
          </li>

          {isDealer && (
            <li>
              <StyledNavlink to="/manage-proposals">
                <SiNginxproxymanager />
                <span>Manage Proposals</span>
              </StyledNavlink>
            </li>
          )}
        </StyledNavlist>
      </nav>
    </StyledSidebar>
  );
};

export default Sidebar;
