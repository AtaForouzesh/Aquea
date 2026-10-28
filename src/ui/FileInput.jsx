import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 20px;
  border-radius: 8px;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 12px 20px;
    margin-right: 20px;
    border-radius: 8px;
    border: none;
    color: #efeabb;
    background-color: #558467;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #3b5c47;
      cursor: pointer;
    }
  }
`;

export default FileInput;
