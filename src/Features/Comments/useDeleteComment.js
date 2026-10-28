import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment as deleteCommentApi } from "../../Services/commentsApi";
import toast from "react-hot-toast";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeletingComment, mutate: deleteComment } = useMutation({
    mutationFn: (commentId) => deleteCommentApi(commentId),
    onSuccess: () => {
      toast.success("Comment Deleted Successfully");
      queryClient.invalidateQueries(["comments"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeletingComment, deleteComment };
};
