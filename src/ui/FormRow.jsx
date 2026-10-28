import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1.2fr 0.64fr;
  gap: 36px;
  padding: 20px 0px;
  align-items: center;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #f1e99e;
  }
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }
`;

const Label = styled.label`
  font-size: 24px;
  font-weight: 500;
  color: #efeabb;
`;

const Error = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: #ff0f0f;
`;

const FormRow = ({ label, error, children }) => {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}:</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
