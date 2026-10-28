import styled from "styled-components";
import Headings from "../../Components/Headings";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Users/useUser";
import { useTickets } from "./Tickets/useTickets";

const StyledHeader = styled.div`
  margin: 12px 20px;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button`
  background-color: #558467;
  border: none;
  outline: none;
  color: #efeabb;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #3b5c47;
    cursor: pointer;
  }
`;
const EventsButton = styled.button`
  background-color: #4b1426;
  border: none;
  outline: none;
  color: #efeabb;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #3a0f1e;
    cursor: pointer;
  }
`;

const EventsHeader = () => {
  const navigate = useNavigate();
  const { role, isLoading } = useUser();
  const isHost = role === "host";
  const { ticketsLength } = useTickets();

  return (
    <StyledHeader>
      <Headings as="h1" style={{ color: "#efeabb" }}>
        Events
      </Headings>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {!isLoading && isHost && (
          <Button
            onClick={() => {
              navigate("/events/new");
            }}
          >
            Create Event
          </Button>
        )}
        <EventsButton onClick={() => navigate("/tickets")}>
          Bought Tickets ({ticketsLength})
        </EventsButton>
      </div>
    </StyledHeader>
  );
};

export default EventsHeader;
