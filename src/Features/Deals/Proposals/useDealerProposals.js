import { useQuery } from "@tanstack/react-query";
import { getDealerProposals } from "../../../Services/proposalApi";

export const useDealerProposals = () => {
  const {
    data: dealerProposals,
    isLoading: isLoadingDealerProposals,
    error,
  } = useQuery({
    queryKey: ["dealer-proposals"],
    queryFn: () => getDealerProposals(),
  });
  return { dealerProposals, isLoadingDealerProposals, error };
};
