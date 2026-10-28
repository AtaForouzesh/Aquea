import { useQuery } from "@tanstack/react-query";
import { getDeal } from "../../Services/dealsApi";

export const useDeal = (id) => {
  const {
    isPending: isLoadingDeal,
    data: deal = {},
    error,
  } = useQuery({
    queryKey: ["deal", id],
    queryFn: () => getDeal(id),
  });
  return { isLoadingDeal, deal, error };
};
