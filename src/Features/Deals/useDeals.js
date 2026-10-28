import { useQuery } from "@tanstack/react-query";
import { getDeals } from "../../Services/dealsApi";

export const useDeals = ({ minPrice, maxPrice, selectedSkills } = {}) => {
  const {
    isPending: isLoadingDeals,
    data: deals = [],
    error,
  } = useQuery({
    queryKey: ["deals", { minPrice, maxPrice, selectedSkills }],
    queryFn: () => getDeals({ minPrice, maxPrice, selectedSkills }),
  });
  return { isLoadingDeals, deals, error };
};
