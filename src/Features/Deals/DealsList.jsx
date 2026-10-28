import styled from "styled-components";
import DealsListItem from "./DealsListItem";
import DealsItem from "./DealsItem";

const StyledList = styled.div`
  padding: 0;
  margin: 0px auto;
  border-radius: 4px;
  width: 1560px;
`;

const DealsList = ({ deals }) => {
  return (
    <StyledList>
      <DealsListItem
        data={deals}
        render={(deal) => <DealsItem data={deal} key={deal.id} />}
      />
    </StyledList>
  );
};

export default DealsList;
