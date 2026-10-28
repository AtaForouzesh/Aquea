import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 1rem;
  height: 30px;
  width: 300px;
  border: 1px solid grey;
  border-radius: 20px;
  padding: 5px;
  margin-right: 24px;
  transition: all 0.4s linear;
  background-color: #efeabb;
  color: #17433f;
  &::placeholder {
    color: #17433f;
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border: 1px solid #4b1426;
    width: 400px;
    height: 36px;
  }
  &:hover {
    outline: none;
    border: 1px solid #4b1426;
  }
`;
const Search = () => {
  return <StyledInput type="text" placeholder="Search..." />;
};

export default Search;
