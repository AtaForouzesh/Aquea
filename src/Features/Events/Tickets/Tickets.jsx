import styled from "styled-components";
import { useTickets } from "./useTickets";
import Headings from "../../../Components/Headings";
import TicketList from "./TicketList";

const StyledHeader = styled.div`
  margin: 12px 20px;
  padding: 0px;
`;
const Tickets = () => {
  const { tickets, isLoadingTickets, error } = useTickets();
  if (isLoadingTickets)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          color: "#efeabb",
          fontSize: "28px",
          textAlign: "center",
        }}
      >
        Loading Tickets...
      </div>
    );
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#efeabb",
          fontSize: "24px",
        }}
      >
        {error.message}
      </div>
    );
  }
  return (
    <>
      <StyledHeader>
        <Headings as="h1" style={{ color: "#efeabb" }}>
          My Tickets
        </Headings>
      </StyledHeader>
      <TicketList tickets={tickets} />
    </>
  );
};

export default Tickets;
