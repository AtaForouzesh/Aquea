import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDeal as updateDealApi } from "../../Services/dealsApi";
import toast from "react-hot-toast";

export const useUpdateDeal = () => {
  const queryClient = useQueryClient();
  const { isPending: isUpdatingDeal, mutate: updateDeal } = useMutation({
    mutationFn: ({ id, updateDealData }) =>
      updateDealApi({ id, updateDealData }),
    onSuccess: () => {
      toast.success("Deal Successfully Updated");
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdatingDeal, updateDeal };
};
