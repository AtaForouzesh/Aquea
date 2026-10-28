import styled from "styled-components";

const StyledConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #174441;
  border: 1px solid #558467;
  box-shadow: 0 0 8px 1px #558467;

  width: 400px;
  height: 120px;
  padding: 20px;
  border-radius: 8px;

  & p {
    color: #efeabb;
    font-size: 20px;
    font-weight: 500;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const StyledDeleteButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  color: #efeabb;
  background-color: #4b1426;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  transition: all 0.3s linear;
  &:hover {
    cursor: pointer;
    background-color: #3a0f1e;
  }
`;

const StyledCancelButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  color: #efeabb;
  background-color: #558467;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  transition: all 0.3s linear;

  &:hover {
    cursor: pointer;
    background-color: #446852;
  }
`;

const ConfirmDelete = ({ onConfirm, onCloseModal, disabled }) => {
  return (
    <StyledConfirmDelete>
      <p>Are you sure you want to delete this user?</p>
      <StyledDiv>
        <StyledCancelButton onClick={onCloseModal} disabled={disabled}>
          Cancel
        </StyledCancelButton>
        <StyledDeleteButton
          onClick={() => {
            onConfirm();
            onCloseModal?.();
          }}
          disabled={disabled}
        >
          Delete
        </StyledDeleteButton>
      </StyledDiv>
    </StyledConfirmDelete>
  );
};

export default ConfirmDelete;
