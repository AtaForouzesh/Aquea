import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../Authentication/useAuth";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);
  if (isLoading) {
    return (
      <FullPage>
        <h2 style={{ color: "#efeabb" }}>Loading...</h2>
      </FullPage>
    );
  }

  if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
