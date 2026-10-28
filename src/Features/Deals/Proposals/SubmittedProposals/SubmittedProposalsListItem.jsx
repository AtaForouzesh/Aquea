import styled from "styled-components";
import { useUpdateProposalStatus } from "../useUpdateProposalStatus";
import Headings from "../../../../Components/Headings";
import { HiOutlinePaperClip } from "react-icons/hi";

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
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

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #558467;
`;

const StatusBadge = styled.div`
  background-color: ${(props) =>
    props.status === "rejected"
      ? "#4b1426"
      : props.status === "pending"
        ? "rgba(85, 126, 132, 0.3)"
        : "#558467"};
  font-size: 20px;
  font-weight: 400;
  color: ${(props) => (props.status === "pending" ? "#73c6d2" : "#efeabb")};
  border: ${(props) =>
    props.status === "pending" ? "1px solid #73c6d2" : "none"};
  box-shadow: ${(props) =>
    props.status === "pending" ? "0px 0px 4px 1px #73c6d2" : "none"};
  border-radius: 8px;
  padding: 6px 8px;
  margin: 10px 0px 6px 0px;
  text-align: center;
  text-transform: capitalize;
`;

const AttachmentLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #73c6d2;
  background-color: #174441;
  border: 1px solid #558467;
  margin: 10px 0px;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 20px;
  width: fit-content;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #efeabb;
    background-color: #1c4e4b;
    border-color: #73c6d2;
  }
`;

const AcceptButton = styled.button`
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

const RejectButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  color: #efeabb;
  background-color: #4b1426;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  transition: all 0.3s linear;
  &:hover {
    cursor: pointer;
    background-color: #3a0f1e;
  }
`;

const SubmittedProposalsListItem = ({ dealerProposal }) => {
  const { updateProposalStatus, isUpdatingProposalStatus } =
    useUpdateProposalStatus();

  const id = dealerProposal?.id;
  const profile = dealerProposal?.profiles;
  const deal = dealerProposal?.deals;

  const fullName = profile?.full_name;
  const avatar = profile?.avatar;
  const role = profile?.role;
  const title = deal?.title;
  const expectedDuration = deal?.expected_duration;
  const estimatedTime = dealerProposal?.estimated_time;
  const description = dealerProposal?.description;
  const fileUrl = dealerProposal?.file_url;
  const bidAmount = dealerProposal?.bid_amount;

  const status = dealerProposal?.status?.toLowerCase() || "pending";
  const isPending = status === "pending";
  const isAccepted = status === "accepted";
  const hasValidStatus = isAccepted || isPending;

  const formattedDate = new Date(dealerProposal.created_at).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "medium",
  });

  if (!hasValidStatus) {
    return null;
  }

  return (
    <StyledListItem>
      <StyledDiv>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar src={avatar} alt={fullName} />
          <Headings
            as="h2"
            style={{ color: "#efeabb", textTransform: "capitalize" }}
          >
            {fullName}
          </Headings>
          <Headings
            as="h3"
            style={{ color: "#efeabb", textTransform: "capitalize" }}
          >
            {role}
          </Headings>
        </div>
        <Headings
          as="h3"
          style={{ color: "#efeabb", textTransform: "capitalize" }}
        >
          Proposal for: {title}
        </Headings>
      </StyledDiv>
      <StyledDiv
        style={{
          border: "2px solid #558467",
          borderRadius: "8px",
          padding: "12px 20px",
          margin: "10px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Headings as="h3" style={{ color: "#efeabb" }}>
            Bid Price
          </Headings>
          <StyledDiv>
            <span style={{ color: "#efeabb", fontSize: "20px" }}>
              {bidAmount}$
            </span>
          </StyledDiv>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Headings as="h3" style={{ color: "#efeabb" }}>
            Expected Time
          </Headings>
          <StyledDiv>
            <span style={{ color: "#efeabb", fontSize: "20px" }}>
              {expectedDuration}
            </span>
          </StyledDiv>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Headings as="h3" style={{ color: "#efeabb" }}>
            Estimated Time
          </Headings>
          <StyledDiv>
            <span style={{ color: "#efeabb", fontSize: "20px" }}>
              {estimatedTime}
            </span>
          </StyledDiv>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Headings as="h3" style={{ color: "#efeabb" }}>
            Submitted Date
          </Headings>
          <StyledDiv>
            <span style={{ color: "#efeabb", fontSize: "20px" }}>
              {formattedDate}
            </span>
          </StyledDiv>
        </div>
      </StyledDiv>
      <div
        style={{
          fontSize: "18px",
          color: "#174441",
          backgroundColor: "#efeabb",
          border: "2px solid #558467",
          borderRadius: "8px",
          padding: "12px 20px",
          lineHeight: "1.5",
          wordBreak: "break-word",
        }}
      >
        {description}
      </div>
      {fileUrl && (
        <AttachmentLink href={fileUrl} target="_blank" rel="noreferrer">
          <HiOutlinePaperClip style={{ fontSize: "24px" }} />
          View Proposal File
        </AttachmentLink>
      )}
      {isPending ? (
        <StyledDiv>
          <StatusBadge status={status}>Status: {status}</StatusBadge>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <AcceptButton
              onClick={() => {
                updateProposalStatus({ proposalId: id, status: "accepted" });
              }}
              disabled={isUpdatingProposalStatus}
            >
              Accept
            </AcceptButton>
            <RejectButton
              onClick={() => {
                updateProposalStatus({ proposalId: id, status: "rejected" });
              }}
              disabled={isUpdatingProposalStatus}
            >
              Reject
            </RejectButton>
          </div>
        </StyledDiv>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <StatusBadge status={status}>Status: {status}</StatusBadge>
        </div>
      )}
    </StyledListItem>
  );
};

export default SubmittedProposalsListItem;
