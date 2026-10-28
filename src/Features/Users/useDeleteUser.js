import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as apiDeleteUser } from "../../Services/usersApi";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: apiDeleteUser,
    onSuccess: () => {
      toast.success("User Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteUser };
};
