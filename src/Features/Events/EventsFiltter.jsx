import styled from "styled-components";
import Input from "../../ui/Input";
import Headings from "../../Components/Headings";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  margin: 0px 20px 40px;
  background-color: #174441;
  border: 2px solid #558467;
  box-shadow: 0 0 6px 2px rgba(85, 132, 103, 0.9);
  border-radius: 8px;
`;

const StatusButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  background-color: ${(props) =>
    props.status === "live"
      ? "#4b715a"
      : props.status === "upcoming"
        ? "rgba(85, 126, 132, 0.3)"
        : props.status === "all"
          ? "rgba(28, 134, 150, 0.505)"
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
        : props.status === "all"
          ? "1px solid #73c6d2"
          : "1px solid #4b1426"};
  box-shadow: ${(props) =>
    props.status === "live"
      ? "0px 0px 4px 1px #558467"
      : props.status === "upcoming"
        ? "0px 0px 4px 1px #73c6d2"
        : props.status === "all"
          ? "0px 0px 4px 1px #73c6d2"
          : "0px 0px 4px 1px #4b1426"};
  border-radius: 8px;
  padding: 6px 8px;
  margin: 0px;
  text-align: center;
  text-transform: capitalize;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.status === "live"
        ? "#558467"
        : props.status === "upcoming"
          ? "rgba(85, 126, 132, 0.5)"
          : props.status === "all"
            ? "rgba(32, 155, 174, 0.701)"
            : "#691c36"};
  }
`;
const EventsFilter = ({
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <FilterContainer>
      <Headings as="h2" style={{ color: "#efeabb" }}>
        Filter Events
      </Headings>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Input
          text="Search Event"
          placeholder="Search event by title, location, or description..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          style={{ width: "500px" }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <StatusButton
            status="all"
            active={filterStatus === "all"}
            onClick={() => {
              setFilterStatus("all");
            }}
          >
            All
          </StatusButton>
          <StatusButton
            status="live"
            active={filterStatus === "live"}
            onClick={() => {
              setFilterStatus("live");
            }}
          >
            Live
          </StatusButton>
          <StatusButton
            status="upcoming"
            active={filterStatus === "upcoming"}
            onClick={() => {
              setFilterStatus("upcoming");
            }}
          >
            Upcoming
          </StatusButton>
          <StatusButton
            status="closed"
            active={filterStatus === "closed"}
            onClick={() => {
              setFilterStatus("closed");
            }}
          >
            Closed
          </StatusButton>
        </div>
      </div>
    </FilterContainer>
  );
};

export default EventsFilter;
