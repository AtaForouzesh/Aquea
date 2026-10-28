import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditUser } from "../../Services/usersApi";
import toast from "react-hot-toast";

export const useEditUser = () => {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editUser } = useMutation({
    mutationFn: ({ newUserData, id }) => createEditUser(newUserData, id),
    onSuccess: () => {
      toast.success("User Successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, editUser };
};
