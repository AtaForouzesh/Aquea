import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditUser } from "../../Services/usersApi";
import toast from "react-hot-toast";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createUser } = useMutation({
    mutationFn: (newUserData) => createEditUser(newUserData),
    onSuccess: () => {
      toast.success("User Successfully Created");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreating, createUser };
};
