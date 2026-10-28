import styled from "styled-components";
import Headings from "../Components/Headings";
import { useUser } from "../Features/Users/useUser";
import { FaTicketAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProposals } from "../Features/Deals/Proposals/useProposals";
import { useTickets } from "../Features/Events/Tickets/useTickets";
import { VscGitPullRequestDone } from "react-icons/vsc";
import { useEvents } from "../Features/Events/useEvents";
import { useDeals } from "../Features/Deals/useDeals";
import { getEventStatus } from "../Utils/Helper";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #174441;
  border: 2px solid #558467;
  box-shadow: 0 0 8px 2px #558467;
  margin: 12px 20px;
  padding: 10px 20px;
  border-radius: 12px;
`;
const FeaturesDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #174441;
  border: 2px solid #558467;
  box-shadow: 0 0 8px 2px #558467;
  border-radius: 12px;
  gap: 20px;
  margin: 12px 20px;
  padding: 10px 20px;
`;

const FeatureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 0px;
  padding: 0px;
`;
const FeaturesCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0px;
  padding: 10px 20px;
  background-color: #174441;
  border: 2px solid #558467;
  box-shadow: 0px 0px 8px 1px #558467;
  border-radius: 8px;
  transition: all 0.4s ease-in-out;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 8px 2px rgba(85, 132, 103, 0.9);
  }
`;

const FeaturesButton = styled.button`
  background-color: #558467;
  border: none;
  outline: none;
  color: #efeabb;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #446852;
    cursor: pointer;
  }
`;

const EventsFeature = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #558467;
  background-color: #174441;
  box-shadow: 0 0 6px 2px #558467;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 30px 20px;
  gap: 10px;
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
  font-size: 24px;
  font-weight: 500;
  border-radius: 8px;
  padding: 6px 8px;
  margin: 10px 0px 6px 0px;
  text-align: center;
  width: 100px;
  text-transform: capitalize;
`;

const DealsFeature = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #558467;
  background-color: #174441;
  box-shadow: 0 0 6px 2px #558467;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 30px 20px;
  gap: 10px;
`;

const Dashboard = () => {
  const { user } = useUser();
  const { proposalCount } = useProposals();
  const { ticketsLength } = useTickets();
  const { events, isLoadingEvents } = useEvents();
  const { deals, isLoadingDeals } = useDeals();

  const navigate = useNavigate();

  const filteredEvents = events
    ?.filter((event) => {
      const status = getEventStatus(event.start_time, event.end_time);
      return status === "live" || status === "upcoming";
    })
    .slice(0, 3);

  const recentDeals = deals?.slice(0, 3);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "100px",
          margin: "10px 60px",
          padding: "0px",
        }}
      >
        <HeaderContainer>
          <Headings
            as="h1"
            style={{ color: "#efeabb", textTransform: "capitalize" }}
          >
            Welcome Back {user?.user_metadata.full_name} Happy to see you again!
          </Headings>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              margin: "20px 0px",
            }}
          >
            <FeaturesButton
              onClick={() => {
                navigate("/events");
              }}
            >
              Explore Events
            </FeaturesButton>
            <FeaturesButton
              onClick={() => {
                navigate("/deals");
              }}
            >
              Explore Deals
            </FeaturesButton>
          </div>
        </HeaderContainer>

        <FeaturesDiv>
          <Headings as="h2" style={{ color: "#efeabb" }}>
            Your Stats Summary:
          </Headings>

          <FeatureContainer>
            <FeaturesCard>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ color: "#efeabb", fontSize: "24px" }}>
                  <FaTicketAlt />
                </span>
                <Headings as="h2" style={{ color: "#efeabb" }}>
                  Owned Tickets
                </Headings>
              </div>
              <span style={{ color: "#efeabb", fontSize: "24px" }}>
                {ticketsLength}
              </span>
              <FeaturesButton
                onClick={() => {
                  navigate("/tickets");
                }}
              >
                View Tickets
              </FeaturesButton>
            </FeaturesCard>

            <FeaturesCard>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ color: "#efeabb", fontSize: "24px" }}>
                  <VscGitPullRequestDone />
                </span>
                <Headings as="h2" style={{ color: "#efeabb" }}>
                  Submitted Proposals
                </Headings>
              </div>
              <span style={{ color: "#efeabb", fontSize: "24px" }}>
                {proposalCount}
              </span>
              <FeaturesButton
                onClick={() => {
                  navigate("/proposals");
                }}
              >
                View Proposals
              </FeaturesButton>
            </FeaturesCard>
          </FeatureContainer>
        </FeaturesDiv>
      </div>
      {isLoadingEvents ? (
        <p style={{ padding: "20px", color: "#efeabb", fontSize: "24px" }}>
          Loading Events...
        </p>
      ) : (
        <EventsFeature>
          <Headings as="h2" style={{ color: "#efeabb" }}>
            Featured Events:
          </Headings>
          {filteredEvents?.map((event) => {
            const status = getEventStatus(event.start_time, event.end_time);
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Headings
                  as="h2"
                  style={{ color: "#efeabb", textTransform: "capitalize" }}
                >
                  {event?.title}
                </Headings>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <FeaturesButton
                    onClick={() => {
                      navigate(`/events/${event.id}`);
                    }}
                  >
                    View Event Details
                  </FeaturesButton>
                  <StatusBadge status={status}>{status}</StatusBadge>
                </div>
              </div>
            );
          })}
        </EventsFeature>
      )}
      {isLoadingDeals ? (
        <p style={{ padding: "20px", color: "#efeabb", fontSize: "24px" }}>
          {" "}
          Loading Deals...
        </p>
      ) : (
        <DealsFeature>
          <Headings as="h2" style={{ color: "#efeabb" }}>
            Featured Deals:
          </Headings>
          {recentDeals?.map((deal) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Headings
                as="h2"
                style={{ color: "#efeabb", textTransform: "capitalize" }}
              >
                {deal?.title}
              </Headings>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <FeaturesButton
                  onClick={() => {
                    navigate(`/deals/${deal.id}`);
                  }}
                >
                  View deal Details
                </FeaturesButton>
              </div>
            </div>
          ))}
        </DealsFeature>
      )}
    </>
  );
};

export default Dashboard;
