import styled from "styled-components";
import ProposalListItem from "./ProposalsListItem";

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0px 20px;
  padding: 0px;
  list-style: none;
`;

const ProposalList = ({ proposals }) => {
  return (
    <StyledList>
      {proposals.length === 0 ? (
        <div style={{ color: "#efeabb", textAlign: "center", padding: "2rem" }}>
          No proposals found.
        </div>
      ) : (
        proposals.map((proposal) => (
          <ProposalListItem key={proposal.id} proposal={proposal} />
        ))
      )}
    </StyledList>
  );
};

export default ProposalList;
