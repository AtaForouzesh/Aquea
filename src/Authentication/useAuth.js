import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  loginApi,
  logoutApi,
  signupApi,
} from "../Services/authApi";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isLogging, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Login Successful");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isLogging, login };
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isSigningUp, mutate: signup } = useMutation({
    mutationFn: ({ full_name, email, password }) =>
      signupApi({ full_name, email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Signup Successful");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isSigningUp, signup };
};

export const useUser = () => {
  const { isPending: isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
};
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("Logout Successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isLoggingOut, logout };
};
