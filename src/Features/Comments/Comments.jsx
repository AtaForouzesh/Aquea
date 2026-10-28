import Headings from "../../Components/Headings";
import CommentsList from "./CommentsList";
import { useComments } from "./useComments";

const Comments = ({ dealId, eventId }) => {
  const { comments, isLoadingComments } = useComments({ dealId, eventId });
  if (isLoadingComments)
    return (
      <Headings
        as="h2"
        style={{
          color: "#efeabb",
          padding: "20px",
          fontSize: "20px",
        }}
      >
        Loading Comments...
      </Headings>
    );
  return <CommentsList comments={comments} />;
};

export default Comments;
