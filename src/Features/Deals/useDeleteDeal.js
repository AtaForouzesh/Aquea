import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDeal as deleteDealApi } from "../../Services/dealsApi";
import toast from "react-hot-toast";

export const useDeleteDeal = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeletingDeal, mutate: deleteDeal } = useMutation({
    mutationFn: (id) => deleteDealApi(id),
    onSuccess: () => {
      toast.success("Deal Successfully Deleted");
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeletingDeal, deleteDeal };
};
