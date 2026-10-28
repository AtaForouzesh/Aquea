import { updateProposalStatus as updateProposalStatusApi } from "../../../Services/proposalApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateProposalStatus = () => {
  const queryClient = useQueryClient();
  const { isPending: isUpdatingProposalStatus, mutate: updateProposalStatus } =
    useMutation({
      mutationFn: ({ proposalId, status }) =>
        updateProposalStatusApi({ proposalId, status }),
      onSuccess: () => {
        toast.success("Proposal status updated successfully");
        queryClient.invalidateQueries({ queryKey: ["dealer-proposals"] });
        queryClient.invalidateQueries({ queryKey: ["deals"] });
        queryClient.invalidateQueries({ queryKey: ["proposals"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  return { isUpdatingProposalStatus, updateProposalStatus };
};
