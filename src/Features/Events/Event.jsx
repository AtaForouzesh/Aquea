import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEvent } from "./useEvent";
import { HiArrowLeft } from "react-icons/hi";
import Headings from "../../Components/Headings";
import { getEventStatus } from "../../Utils/Helper";
import { useCheckTicket } from "./Tickets/useCheckTicket";
import { useCreateTicket } from "./Tickets/useCreateTicket";
import CommentsSection from "../Comments/CommentsSection";

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 0px;
  padding: 4px 6px;
  border: none;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0px 12px;
  padding: 8px 20px;
  background-color: #174441;
  border: 2px solid #558467;
  box-shadow: 0 0 8px 1px rgba(85, 132, 103, 0.9);
  border-radius: 8px;
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #efeabb;
`;

const StatusBadge = styled.div`
  background-color: ${(props) =>
    props.status === "live"
      ? "#558467"
      : props.status === "upcoming"
        ? "rgba(85, 126, 132, 0.3)"
        : "#4b1426"};
  color: ${(props) =>
    props.status === "live"
      ? "#efeabb"
      : props.status === "upcoming"
        ? "#73c6d2"
        : "#efeabb"};
  border: ${(props) =>
    props.status === "live"
      ? "1px solid #558467"
      : props.status === "upcoming"
        ? "1px solid #73c6d2"
        : "1px solid #4b1426"};
  box-shadow: ${(props) =>
    props.status === "live"
      ? "0px 0px 4px 1px #558467"
      : props.status === "upcoming"
        ? "0px 0px 4px 1px #73c6d2"
        : "0px 0px 4px 1px #4b1426"};
  font-size: 20px;
  font-weight: 500;
  border-radius: 8px;
  padding: 6px 8px;
  margin: 10px 0px 6px 0px;
  width: 80px;
  text-align: center;
  text-transform: capitalize;
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  margin: 0px;
  font-size: 24px;
  background-color: #558467;
  color: #efeabb;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #466d55;
    cursor: pointer;
  }
  & svg {
    font-size: 24px;
  }
`;

const Button = styled.button`
  background-color: #558467;
  font-size: 20px;
  padding: 10px 16px;
  border: none;
  border-radius: 12px;
  color: #efeabb;
  width: 340px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #3b5c47;
    cursor: pointer;
  }
`;

const Event = () => {
  const { id } = useParams();
  const { event, isLoadingEvent } = useEvent(id);
  const navigate = useNavigate();
  const { hasBoughtTicket, isCheckingTicket } = useCheckTicket(id);
  const { createTicket, isCreatingTicket } = useCreateTicket();

  if (isLoadingEvent || isCheckingTicket) {
    return (
      <p
        style={{
          color: "#efeabb",
          fontSize: "28px",
          textAlign: "center",
        }}
      >
        Loading event details...
      </p>
    );
  }

  const currentStatus = getEventStatus(event.start_time, event.end_time);

  return (
    <EventContainer>
      <div style={{ margin: "8px 12px" }}>
        <ArrowButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <HiArrowLeft />
          <span
            style={{ fontSize: "20px", margin: "auto 0px" }}
          >{`\t Go Back`}</span>
        </ArrowButton>
      </div>
      <DetailsContainer>
        <StyledDiv>
          <Headings as="h2" style={{ color: "#efeabb" }}>
            {event.title}
          </Headings>
          <StatusBadge status={currentStatus}>{currentStatus}</StatusBadge>
        </StyledDiv>
        <StyledDiv>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#efeabb",
              maxWidth: "1200px",
            }}
          >
            {event.location}
          </span>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#efeabb",
              maxWidth: "1200px",
            }}
          >
            {new Date(event.start_time).toLocaleString([], {
              dateStyle: "full",
              timeStyle: "medium",
            })}
            {" - "}
            {new Date(event.end_time).toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "medium",
            })}
          </span>
        </StyledDiv>
        <StyledDiv>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#efeabb",
              maxWidth: "700px",
            }}
          >
            {event.description}
          </span>
          {hasBoughtTicket ? (
            <Button
              onClick={() => {
                navigate("/tickets");
              }}
            >
              Already Bought Ticket (view)
            </Button>
          ) : currentStatus === "closed" ? (
            <Button
              style={{
                backgroundColor: "#4b1426",
                cursor: "not-allowed",
                opacity: "0.9",
              }}
              disabled
            >
              Event Ended
            </Button>
          ) : (
            <Button
              onClick={() => {
                createTicket(event.id);
              }}
            >
              {isCreatingTicket ? "Buying Ticket..." : "Buy Ticket"}
            </Button>
          )}
        </StyledDiv>
      </DetailsContainer>
      <CommentsSection eventId={id} />
    </EventContainer>
  );
};

export default Event;
