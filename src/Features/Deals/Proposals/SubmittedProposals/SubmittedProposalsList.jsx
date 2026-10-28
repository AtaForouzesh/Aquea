import styled from "styled-components";
import SubmittedProposalsListItem from "./SubmittedProposalsListItem";

const StyledList = styled.ul`
  padding: 0;
  margin: 0px 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SubmittedProposalsList = ({ dealerProposals }) => {
  if (!dealerProposals?.length) {
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
        No Submitted Proposals Found!
      </div>
    );
  }
  return (
    <StyledList>
      {dealerProposals?.map((dealerProposal) => (
        <SubmittedProposalsListItem
          key={dealerProposal.id}
          dealerProposal={dealerProposal}
        />
      ))}
    </StyledList>
  );
};

export default SubmittedProposalsList;
