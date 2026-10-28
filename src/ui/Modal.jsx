import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClicks } from "../hooks/useOutsideClicks";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.3);
`;
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease-in-out;
`;
const Button = styled.button`
  background-color: transparent;
  color: #efeabb;
  background-color: #4b1426;
  position: absolute;
  top: 22px;
  right: 22px;
  font-size: 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #3a0f1e;
  }
`;

const modalContext = createContext();
const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");
  const close = () => {
    setOpenName("");
  };
  const open = setOpenName;
  return (
    <modalContext.Provider value={{ open, close, openName }}>
      {children}
    </modalContext.Provider>
  );
};
const Open = ({ children, opens: opensWindowName }) => {
  const { open } = useContext(modalContext);
  return cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
    },
  });
};
const Window = ({ children, name }) => {
  const { openName, close } = useContext(modalContext);
  const ref = useOutsideClicks(close);
  if (name !== openName) {
    return null;
  }
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {cloneElement(children, { onCloseModal: close })}
      </StyledModal>
    </Overlay>,
    document.body,
  );
};
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
