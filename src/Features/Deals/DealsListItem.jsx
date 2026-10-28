import styled from "styled-components";

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const DealsListItem = ({ data, render }) => {
  return <StyledList>{data.map(render)}</StyledList>;
};

export default DealsListItem;
