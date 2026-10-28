import styled from "styled-components";
import Headings from "../../Components/Headings";
import SubmitProposalForm from "./Proposals/SubmitProposalForm";
import { useDeal } from "./useDeal";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../ui/Modal";
import { HiArrowLeft } from "react-icons/hi2";
import { useCheckProposal } from "./Proposals/useCheckProposal";
import CommentsSection from "../Comments/CommentsSection";
import { useUser } from "../Users/useUser";

const DealContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 0px;
  padding: 4px 6px;
  border: none;
`;
const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 12px;
  padding: 8px 20px;
  background-color: #174441;
  border: 2px solid #558467;
  box-shadow: 0px 0px 8px 1px #558467;
  border-radius: 8px;
`;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 800px;
  margin: 0;
  padding: 0;
`;

const ArrowButton = styled.button`
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

const Button = styled.button`
  background-color: #558467;
  font-size: 20px;
  background-color: #558467;
  padding: 10px 16px;
  border: none;
  border-radius: 12px;
  color: #efeabb;
  width: 340px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #3b5c47;
    cursor: pointer;
  }
`;

const Deal = () => {
  const { id } = useParams();
  const { deal, isLoadingDeal } = useDeal(id);
  const { hasSubmittedProposal, isCheckingProposal } = useCheckProposal(id);
  const { user } = useUser();
  const isOwnDealer = user?.id === deal?.dealer_id;

  const navigate = useNavigate();

  if (isLoadingDeal || isCheckingProposal) {
    return (
      <p
        style={{
          color: "#efeabb",
          fontSize: "28px",
          textAlign: "center",
        }}
      >
        Loading deal details...
      </p>
    );
  }

  if (!deal) {
    return <p style={{ color: "#efeabb", padding: "16px" }}>Deal not found.</p>;
  }
  return (
    <DealContainer>
      <div
        style={{
          margin: "8px 12px",
        }}
      >
        <ArrowButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <HiArrowLeft />
          <span
            style={{ fontSize: "20px", margin: "auto 0px" }}
          >{`\t Go Back`}</span>
        </ArrowButton>
      </div>
      <DetailsContainer>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Headings as="h2" style={{ color: "#efeabb" }}>
            {deal.title}
          </Headings>
          <StyledDescription>
            <p
              style={{ fontSize: "20px", fontWeight: "400", color: "#efeabb" }}
            >
              {deal.description}
            </p>
          </StyledDescription>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "12px",
            fontSize: "20px",
            color: "#efeabb",
          }}
        >
          <div>
            <span>Status: </span>
            <span>{deal.status}</span>
          </div>
          <div>
            <span>Price Range: </span>
            <span>
              {deal.min_price}$ - {deal.max_price}$
            </span>
          </div>
          <div>
            <span>Required Skills: </span>
            <span>{deal.skills?.join(", ")}</span>
          </div>
          <div>
            <span>Estimated Time: </span>
            <span>{deal.expected_duration}</span>
          </div>
          {isOwnDealer ? (
            <Button
              style={{
                backgroundColor: "#4b1426",
                cursor: "not-allowed",
                fontSize: "20px",
                width: "430px",
              }}
              disabled
            >
              You can't submit a proposal to your own deal
            </Button>
          ) : !hasSubmittedProposal ? (
            <Modal>
              <Modal.Open opens="proposal-form">
                <Button>Submit Proposal</Button>
              </Modal.Open>
              <Modal.Window name="proposal-form">
                <SubmitProposalForm dealId={id} />
              </Modal.Window>
            </Modal>
          ) : (
            <Button
              onClick={() => {
                navigate("/proposals");
              }}
            >
              Already Submitted (View)
            </Button>
          )}
        </div>
      </DetailsContainer>
      <CommentsSection dealId={id} />
    </DealContainer>
  );
};

export default Deal;
