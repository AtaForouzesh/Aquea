import styled from "styled-components";
import CommentsListItem from "./CommentsListItem";

const StyledList = styled.ul`
  padding: 0;
  margin: 0px 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CommentsList = ({ comments }) => {
  return (
    <StyledList>
      {comments?.map((comment) => (
        <CommentsListItem comment={comment} key={comment.id} />
      ))}
    </StyledList>
  );
};

export default CommentsList;
