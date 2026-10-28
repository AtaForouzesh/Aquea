import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment as createCommentApi } from "../../Services/commentsApi";
import toast from "react-hot-toast";

export const useCreateComment = ({ eventId, dealId }) => {
  const queryClient = useQueryClient();
  const { isPending: isCreatingComment, mutate: createComment } = useMutation({
    mutationFn: ({ content }) => createCommentApi({ content, dealId, eventId }),
    onSuccess: () => {
      toast.success("Comment Created Successfully");
      queryClient.invalidateQueries(["comments", { dealId, eventId }]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isCreatingComment, createComment };
};
