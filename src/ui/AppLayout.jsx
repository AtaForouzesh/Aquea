import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;

  grid-template-columns: 20rem 1fr;
  grid-template-rows: 62px 1fr;

  grid-template-areas:
    "header header"
    "sidebar main";

  min-height: 100vh;
  margin: 0px;
`;

const StyledMain = styled.main`
  grid-area: main;
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledAppLayout>
  );
};

export default AppLayout;
