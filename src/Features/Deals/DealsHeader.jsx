import styled from "styled-components";
import Headings from "../../Components/Headings";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Users/useUser";
import { useProposals } from "./Proposals/useProposals";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0px;
  margin-right: 22px;
  margin-left: 20px;
`;
const Button = styled.button`
  background-color: #558467;
  border: none;
  outline: none;
  color: #efeabb;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #3b5c47;
    cursor: pointer;
  }
`;
const ProposalsButton = styled.button`
  background-color: #4b1426;
  color: #efeabb;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: #3a0f1e;
  }
`;
const DealsHeader = () => {
  const { role, isLoading } = useUser();
  const { proposalCount } = useProposals();

  const isDealer = role === "dealer";
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <Headings as="h1" style={{ color: "#efeabb" }}>
        Deals
      </Headings>
      <div style={{ display: "flex", gap: "10px" }}>
        {!isLoading && isDealer && (
          <Button
            onClick={() => {
              navigate("/deals/new");
            }}
          >
            Post New Deal
          </Button>
        )}
        <ProposalsButton
          onClick={() => {
            navigate("/proposals");
          }}
        >
          My Proposals ({proposalCount})
        </ProposalsButton>
      </div>
    </HeaderContainer>
  );
};

export default DealsHeader;
