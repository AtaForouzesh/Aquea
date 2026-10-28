import styled from "styled-components";
import EventItem from "./EventItem";
import Headings from "../../Components/Headings";

const StyledList = styled.ul`
  padding: 0;
  margin: 0px 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const EventsList = ({ events, isLoading }) => {
  if (isLoading) {
    return (
      <Headings
        as="h2"
        style={{
          color: "#efeabb",
          padding: "20px",
          fontSize: "20px",
        }}
      >
        Loading Events...
      </Headings>
    );
  }
  return (
    <StyledList>
      {events?.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </StyledList>
  );
};

export default EventsList;
