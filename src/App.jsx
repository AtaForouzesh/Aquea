import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Deals from "./Pages/Dealers";
import Users from "./Pages/Users";
import Events from "./Pages/Events";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./Pages/PageNotFound";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/Signup";
import ProtectedRoute from "./ui/ProtectedRoute";
import Deal from "./Features/Deals/Deal";
import CreateDeal from "./Features/Deals/CreateDeal";
import Proposals from "./Features/Deals/Proposals/Proposals";
import Event from "./Features/Events/Event";
import CreateEvent from "./Features/Events/CreateEvent";
import Tickets from "./Features/Events/Tickets/Tickets";
import ManageSubmittedProposals from "./Features/Deals/Proposals/SubmittedProposals/manageSubmittedProposals";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="deals" element={<Deals />} />
            <Route path="deals/:id" element={<Deal />} />
            <Route path="deals/new" element={<CreateDeal />} />
            <Route path="proposals" element={<Proposals />} />
            <Route
              path="manage-proposals"
              element={<ManageSubmittedProposals />}
            />
            <Route path="users" element={<Users />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<Event />} />
            <Route path="events/new" element={<CreateEvent />} />
            <Route path="tickets" element={<Tickets />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#dbdbdbff",
            color: "#696969",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
