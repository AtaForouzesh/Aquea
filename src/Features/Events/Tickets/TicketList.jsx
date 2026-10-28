import styled from "styled-components";
import TicketListItem from "./TicketListItem";

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0px 20px;
  padding: 0px;
  list-style: none;
`;

const TicketList = ({ tickets }) => {
  return (
    <StyledList>
      {tickets.map((ticket) => (
        <TicketListItem ticket={ticket} key={ticket.id} />
      ))}
    </StyledList>
  );
};

export default TicketList;
