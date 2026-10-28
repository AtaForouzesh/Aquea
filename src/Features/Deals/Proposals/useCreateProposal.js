import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProposal as createProposalApi } from "../../../Services/proposalApi";
import toast from "react-hot-toast";
export const useCreateProposal = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreatingProposal, mutate: createProposal } = useMutation(
    {
      mutationFn: ({ dealId, description, file, bidAmount, estimatedTime }) =>
        createProposalApi({
          dealId,
          description,
          file,
          bidAmount,
          estimatedTime,
        }),
      onSuccess: () => {
        toast.success("Proposal Successfully Created");
        queryClient.invalidateQueries({ queryKey: ["deal"] });
        queryClient.invalidateQueries({ queryKey: ["proposals"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    },
  );
  return { isCreatingProposal, createProposal };
};
