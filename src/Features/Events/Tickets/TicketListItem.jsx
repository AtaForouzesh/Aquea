import styled from "styled-components";
import { getEventStatus } from "../../../Utils/Helper";
import Headings from "../../../Components/Headings";
import { useDeleteTicket } from "./useDeleteTicket";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";

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

const Button = styled.button`
  background-color: #4b1426;
  font-size: 20px;
  padding: 10px 16px;
  border: none;
  border-radius: 12px;
  color: #efeabb;
  width: 340px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #3a0f1e;
    cursor: pointer;
  }
`;

const TicketListItem = ({ ticket }) => {
  const event = ticket.events;
  const title = event?.title;
  const description = event?.description;
  const location = event?.location;
  const startTime = event?.start_time;
  const endTime = event?.end_time;
  const currentStatus = getEventStatus(startTime, endTime);

  const { deleteTicket, isDeletingTicket } = useDeleteTicket();

  return (
    <StyledListItem>
      <StyledDiv>
        <Headings
          as="h2"
          style={{ color: "#efeabb", textTransform: "capitalize" }}
        >
          {title}
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
          {location}
        </span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: "400",
            color: "#efeabb",
            maxWidth: "1200px",
          }}
        >
          {new Date(startTime).toLocaleString([], {
            dateStyle: "full",
            timeStyle: "medium",
          })}
          {" - "}
          {new Date(endTime).toLocaleString([], {
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
          {description}
        </span>
        <Modal>
          <Modal.Open opens="delete">
            <Button>Remove Ticket</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              onConfirm={() => {
                deleteTicket(ticket.id);
              }}
              disabled={isDeletingTicket}
            />
          </Modal.Window>
        </Modal>
      </StyledDiv>
    </StyledListItem>
  );
};

export default TicketListItem;
