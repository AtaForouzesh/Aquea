import styled from "styled-components";

const Button = styled.button`
  margin-left: 5rem;
  margin-bottom: 1.2rem;
  width: 80%;
  background-color: #392fff;
  color: #09b1e4;
  padding: 1.2rem 0.8rem;
  transition: all 0.3s ease-in-out;
  border: none;
  border-radius: 12px;
  font-size: 1.4rem;
  font-weight: 500;
  &:hover {
    background-color: #09b1e4;
    color: #392fff;
    cursor: pointer;
  }
`;
export default Button;
