import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../../../../the-wild-oasis/src/hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledToggle = styled.button`
  font-size: 20px;
  color: #efeabb;
  background-color: inherit;
  border: 2px solid #558467;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #17433f;
    cursor: pointer;
  }
  & svg {
    width: 30px;
    height: 30px;
    color: #efeabb;
  }
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  background-color: #174441;
  border: 1px solid #558467;
  color: #efeabb;
  border-radius: 12px;
  list-style: none;
  top: ${(props) => props.position.y}px;
  right: ${(props) => props.position.x}px;
`;

const StyledButton = styled.button`
  font-size: 20px;
  color: #efeabb;
  background-color: inherit;
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #558467;
    cursor: pointer;
  }
`;

const menusContext = createContext();
const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => {
    setOpenId("");
  };
  const open = setOpenId;
  return (
    <menusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </menusContext.Provider>
  );
};

const Menu = StyledMenu;

const Toggle = ({ id }) => {
  const { openId, open, close, setPosition } = useContext(menusContext);
  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height,
    });
    openId !== id || openId === "" ? open(id) : close();
  };
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ id, children }) => {
  const { openId, close, position } = useContext(menusContext);
  const ref = useOutsideClick(close);
  if (openId !== id) {
    return null;
  }

  return (
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>
  );
};
const Button = ({ children, icon, disabled }) => {
  return (
    <li>
      <StyledButton disabled={disabled}>
        {icon}
        {children}
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
