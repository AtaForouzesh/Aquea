import { useQuery } from "@tanstack/react-query";
import { checkUserProposal } from "../../../Services/proposalApi";

export const useCheckProposal = (dealId) => {
  const {
    data: hasSubmittedProposal,
    isPending: isCheckingProposal,
    error,
  } = useQuery({
    queryKey: ["proposals", dealId],
    queryFn: () => checkUserProposal(dealId),
    enabled: Boolean(dealId),
  });
  return { hasSubmittedProposal, isCheckingProposal, error };
};
