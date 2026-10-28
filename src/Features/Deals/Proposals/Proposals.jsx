import styled from "styled-components";
import Headings from "../../../Components/Headings";
import { useProposals } from "./useProposals";
import { useState } from "react";
import ProposalList from "./ProposalsList";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin: 12px 20px;
`;

const StatusButton = styled.button`
  background-color: ${(props) => (props.active ? "#558467" : "#1b4d49")};
  border: 1px solid #efeabb;
  border-radius: 6px;
  color: #efeabb;
  padding: 8px 20px;
  font-size: 22px;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: #558467;
  }
`;

const Proposals = () => {
  const [filter, setFilter] = useState("all");
  const { proposals, isLoadingProposals, error, proposalCount } =
    useProposals();

  if (isLoadingProposals)
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
        Loading Proposals...
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
  const filteredProposals = proposals.filter((proposal) => {
    if (filter === "all") return true;
    return proposal.status?.toLowerCase() === filter;
  });
  return (
    <>
      <StyledHeader>
        <Headings as="h1" style={{ color: "#efeabb" }}>
          My Proposals
        </Headings>
        <div
          style={{
            padding: "0px",
            margin: "0px",
            display: "flex",
            gap: "4px",
          }}
        >
          <StatusButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All ({proposalCount})
          </StatusButton>
          <StatusButton
            active={filter === "pending"}
            onClick={() => setFilter("pending")}
          >
            Pending
          </StatusButton>
          <StatusButton
            active={filter === "accepted"}
            onClick={() => {
              setFilter("accepted");
            }}
          >
            Accepted
          </StatusButton>
          <StatusButton
            active={filter === "rejected"}
            onClick={() => {
              setFilter("rejected");
            }}
          >
            Rejected
          </StatusButton>
        </div>
      </StyledHeader>
      <ProposalList proposals={filteredProposals} />
    </>
  );
};

export default Proposals;
