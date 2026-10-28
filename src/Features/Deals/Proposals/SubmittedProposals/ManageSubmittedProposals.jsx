import styled from "styled-components";
import Headings from "../../../../Components/Headings";
import { useDealerProposals } from "../useDealerProposals";
import SubmittedProposalsList from "./SubmittedProposalsList";
import { useUser } from "../../../Users/useUser";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  margin: 12px 20px;
`;

const StyledButton = styled.button`
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

const ManageSubmittedProposals = () => {
  const { role, isLoading: isLoadingUser } = useUser();
  const isDealer = role === "dealer";
  const navigate = useNavigate();
  const { dealerProposals, isLoadingDealerProposals } = useDealerProposals();

  if (isLoadingDealerProposals || isLoadingUser) {
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
        Loading submitted proposals...
      </div>
    );
  }

  if (!isDealer) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          margin: "10px 20px",
          padding: "0px",
        }}
      >
        <StyledButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <HiArrowLeft />
          Go Back
        </StyledButton>
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
          You're not authenticated to have access to this page
        </div>
      </div>
    );
  }

  return (
    <>
      <StyledHeader>
        <Headings as="h1" style={{ color: "#efeabb" }}>
          Manage Submitted Proposals
        </Headings>
        <div
          style={{
            backgroundColor: "#4b1426",
            color: "#efeabb",
            padding: "10px 20px",
            borderRadius: "12px",
            fontSize: "20px",
          }}
        >
          Total Submitted Proposals: ({dealerProposals?.length})
        </div>
      </StyledHeader>
      <SubmittedProposalsList dealerProposals={dealerProposals} />
    </>
  );
};

export default ManageSubmittedProposals;
