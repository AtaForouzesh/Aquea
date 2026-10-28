import styled from "styled-components";

const Input = styled.input`
  font-size: 20px;
  outline: none;
  border: 2px solid #558467;
  background-color: #efeabb;
  color: #174441;
  border-radius: 8px;
  padding: 6px 8px;
  transition: all 0.3s linear;
  &:hover {
    border: 2px solid #2cb35f;
  }
  &:focus {
    border: 2px solid #2cb35f;
  }
`;

export default Input;
