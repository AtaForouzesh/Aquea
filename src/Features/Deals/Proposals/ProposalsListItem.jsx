import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Headings from "../../../Components/Headings";

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin: 0;
  background-color: #174441;
  border: 2px solid #558467;
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
    props.$status === "rejected"
      ? "#4b1426"
      : props.$status === "pending"
        ? "rgba(85, 126, 132, 0.3)"
        : "#558467"};
  font-size: 20px;
  font-weight: 400;
  color: ${(props) => (props.$status === "pending" ? "#73c6d2" : "#efeabb")};
  border: ${(props) =>
    props.$status === "pending" ? "1px solid #73c6d2" : "none"};
  box-shadow: ${(props) =>
    props.$status === "pending" ? "0px 0px 4px 1px #73c6d2" : "none"};
  border-radius: 8px;
  padding: 6px 8px;
  margin: 10px 0px 6px 0px;
  width: 80px;
  text-align: center;
  text-transform: capitalize;
`;

const ViewDealButton = styled.button`
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

const ProposalListItem = ({ proposal }) => {
  const navigate = useNavigate();

  const proposalCreateDate = new Date(proposal.created_at).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "medium",
  });
  const deal = proposal.deals;
  const dealTitle = deal?.title || "Deal Title Unavailable";
  const dealId = proposal.deal_id;
  const status = proposal.status?.toLowerCase() || "pending";

  return (
    <StyledListItem>
      <div>
        <Headings
          as="h2"
          style={{ color: "#efeabb", textTransform: "capitalize" }}
        >
          {dealTitle}
        </Headings>
        <div>
          <span style={{ color: "#efeabb", fontSize: "20px" }}>
            Submitted on: {proposalCreateDate}
          </span>
          <StatusBadge $status={status}>{status}</StatusBadge>
        </div>
      </div>
      <div>
        <ViewDealButton
          onClick={() => {
            navigate(`/deals/${dealId}`);
          }}
        >
          View Deal Details
        </ViewDealButton>
      </div>
    </StyledListItem>
  );
};

export default ProposalListItem;
