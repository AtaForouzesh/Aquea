import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../Services/commentsApi";

export const useComments = ({ dealId, eventId }) => {
  const {
    data: comments = [],
    error,
    isLoading: isLoadingComments,
  } = useQuery({
    queryKey: ["comments", { dealId, eventId }],
    queryFn: () => getComments({ dealId, eventId }),
    enabled: Boolean(dealId || eventId),
  });
  return { comments, error, isLoadingComments, commentsCount: comments.length };
};
