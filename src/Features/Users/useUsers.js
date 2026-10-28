import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../Services/usersApi";

export const useUsers = ({ filterRole, sortBy }) => {
  const { isPending, data, error } = useQuery({
    queryKey: ["users", filterRole, sortBy],
    queryFn: () => getUsers({ filterRole, sortBy }),
  });
  return { isPending, data, error };
};
