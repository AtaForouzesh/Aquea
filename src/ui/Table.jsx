import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 2px solid #558467;
  box-shadow: 0px 0px 8px 1px #558467;
  margin: 20px;
  font-size: 20px;
  border-radius: 8px;
  overflow: hidden;
`;
const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  align-items: center;
`;
const TableHeader = styled(CommonRow)`
  padding: 24px 36px;
  background-color: #174441;
  border-bottom: 1px solid #efeabb;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #efeabb;
  & > div {
    &:not(:last-child) {
      border-right: 2px solid #e5e7eb;
    }
  }
`;
const StyledRow = styled(CommonRow)`
  padding: 24px;
  margin: 0 20px;

  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`;

const StyledBody = styled.div`
  margin: 6px 0;
`;

const Empty = styled.p`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin: 36px;
`;

const tableContext = createContext();
const Table = ({ children, columns }) => {
  return (
    <tableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </tableContext.Provider>
  );
};

const Header = ({ children }) => {
  const { columns } = useContext(tableContext);
  return (
    <TableHeader role="row" columns={columns}>
      {children}
    </TableHeader>
  );
};

const Row = ({ children }) => {
  const { columns } = useContext(tableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
};

const Body = ({ data, render }) => {
  if (!data.length) {
    return <Empty>No data to display at the moment</Empty>;
  }
  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
