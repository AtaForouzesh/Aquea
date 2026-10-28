import styled from "styled-components";
import Headings from "../../Components/Headings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useComments } from "./useComments";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { useCreateComment } from "./useCreateComment";
import Comments from "./Comments";

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 12px;
  padding: 20px 0px;
  border: 2px solid #558467;
  border-radius: 8px;
  background-color: inherit;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0px 0px 4px 2px #558467;
`;

const StyledDivider = styled.div`
  border-bottom: 2px solid #efeabb;
  margin: 0px 20px 20px;
  opacity: 0.7;
`;

const Button = styled.button`
  background-color: #558467;
  font-size: 20px;
  margin-top: 24px;
  padding: 10px 16px;
  border: none;
  border-radius: 12px;
  color: #efeabb;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #3b5c47;
    cursor: pointer;
  }
`;

const CommentsSection = ({ eventId, dealId }) => {
  const { commentsCount } = useComments({
    eventId,
    dealId,
  });
  const { handleSubmit, register, formState, reset } = useForm();
  const { errors } = formState;
  const { isCreatingComment, createComment } = useCreateComment({
    eventId,
    dealId,
  });
  const onSubmit = (data) => {
    createComment(
      { content: data.content },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <CommentsContainer>
      <Headings as="h2" style={{ color: "#efeabb", padding: "0px 20px" }}>
        Comments ({commentsCount})
      </Headings>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow error={errors?.content?.message}>
          <Input
            as="textarea"
            id="content"
            placeholder="Please enter your comments here..."
            {...register("content", {
              required: "Comment is required",
            })}
            disabled={isCreatingComment}
            style={{
              width: "1200px",
              minHeight: "100px",
              height: "150px",
              maxHeight: "200px",
              resize: "vertical",
              textAlign: "left",
              padding: "12px",
            }}
          />
        </FormRow>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" disabled={isCreatingComment}>
            {isCreatingComment ? "Submitting..." : "Submit Comment"}
          </Button>
        </div>
      </Form>
      <StyledDivider />
      <Comments eventId={eventId} dealId={dealId} />
    </CommentsContainer>
  );
};

export default CommentsSection;
