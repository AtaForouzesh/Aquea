import styled from "styled-components";
import Headings from "../../Components/Headings";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Users/useUser";

const StyledList = styled.li`
  padding: 0;
  margin: 0;
  background-color: #174441;
  border: 2px solid #558467;
  border-radius: 8px;
  box-shadow: 0 0 6px 2px rgba(85, 132, 103, 0.7);
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 8px 3px rgba(85, 132, 103, 0.9);
    /* animation: infinite movingList 2s linear; */
  }

  /* animation idea here as well */

  /* @keyframes movingList {
    0% {
      transform: translateY(0);
      box-shadow: 0 0 6px 2px rgba(85, 132, 103, 0.7);
    }
    25% {
      transform: translateY(-4px);
      box-shadow: 0 0 8px 2px rgba(85, 132, 103, 0.9);
    }
    50% {
      transform: translateY(0px);
      box-shadow: 0 0 6px 2px rgba(85, 132, 103, 0.7);
    }
    75% {
      transform: translateY(4px);
      box-shadow: 0 0 4px 2px rgba(85, 132, 103, 0.7);
    }
    100% {
      transform: translateY(0px);
      box-shadow: 0 0 6px 2px rgba(85, 132, 103, 0.7);
    }
  } */
`;
const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  padding: 0;
  max-width: 800px;
`;

const Button = styled.button`
  font-size: 20px;
  background-color: #558467;
  padding: 10px 16px;
  border: none;
  border-radius: 12px;
  color: #efeabb;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #3b5c47;
    cursor: pointer;
  }
`;

const DealsItem = ({ data }) => {
  const { user } = useUser();
  const isOwnDealer = user?.id === data?.dealer_id;
  const navigate = useNavigate();
  return (
    <StyledList>
      <div
        style={{
          display: "flex",
          padding: "8px 20px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          <Headings
            as="h2"
            style={{ color: "#efeabb", textTransform: "capitalize" }}
          >
            {data.title}
          </Headings>
          <StyledDescription>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "400",
                color: "#efeabb",
                maxWidth: "700px",
              }}
            >
              {data.description}
            </p>
          </StyledDescription>
        </div>
        <divs
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "flex-start",
            color: "#efeabb",
            fontSize: "20px",
          }}
        >
          <div>
            <span>Price Range: </span>
            <span>
              {data.min_price}$ - {data.max_price}$
            </span>
          </div>
          <div>
            <span>Required Skills: </span>
            <span>{data.skills?.join(", ")}</span>
          </div>
          <div>
            <span>Estimated Time: </span>
            <span>{data.expected_duration}</span>
          </div>
          {isOwnDealer ? (
            <Button
              onClick={() => {
                navigate(`/deals/${data.id}`);
              }}
              style={{ width: "430px" }}
            >
              View Details
            </Button>
          ) : (
            <Button
              onClick={() => {
                navigate(`/deals/${data.id}`);
              }}
            >
              View Details And Submit Proposal
            </Button>
          )}
        </divs>
      </div>
    </StyledList>
  );
};

export default DealsItem;
