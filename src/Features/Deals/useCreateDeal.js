import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeal as createDealApi } from "../../Services/dealsApi";
import toast from "react-hot-toast";

export const useCreateDeal = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreatingDeal, mutate: createDeal } = useMutation({
    mutationFn: (newDealData) => createDealApi(newDealData),
    onSuccess: () => {
      toast.success("Deal created successfully");
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreatingDeal, createDeal };
};
