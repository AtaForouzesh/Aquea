import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../Users/useUser";
import { getProposals } from "../../../Services/proposalApi";
export const useProposals = () => {
  const { user } = useUser();
  const userId = user?.id;
  const {
    data: proposals = [],
    isLoading: isLoadingProposals,
    error,
  } = useQuery({
    queryKey: ["proposals", userId],
    queryFn: () => getProposals(),
    enabled: !!userId,
  });
  return {
    proposals,
    isLoadingProposals,
    error,
    proposalCount: proposals.length,
  };
};
