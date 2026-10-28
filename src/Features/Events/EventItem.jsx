import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Headings from "../../Components/Headings";
import { getEventStatus } from "../../Utils/Helper";

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin: 0;
  background-color: #174441;
  border: 2px solid #558467;
  gap: 12px;
  border-radius: 8px;
  box-shadow: 0 0 6px 2px rgba(85, 132, 103, 0.7);
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 8px 3px rgba(85, 132, 103, 0.9);
  }
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

const ViewEventButton = styled.button`
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

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #efeabb;
`;

const EventItem = ({ event }) => {
  const navigate = useNavigate();
  const currentStatus = getEventStatus(event.start_time, event.end_time);

  return (
    <StyledListItem>
      <StyledItem>
        <Headings
          as="h2"
          style={{ color: "#efeabb", textTransform: "capitalize" }}
        >
          {event.title}
        </Headings>
        <StatusBadge status={currentStatus}>{currentStatus}</StatusBadge>
      </StyledItem>
      <StyledItem>
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
      </StyledItem>
      <StyledItem>
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
        <ViewEventButton
          onClick={() => {
            navigate(`/events/${event.id}`);
          }}
        >
          View Event Details
        </ViewEventButton>
      </StyledItem>
    </StyledListItem>
  );
};

export default EventItem;
