import styled from "styled-components";
import Headings from "../../Components/Headings";
import { HiTrash } from "react-icons/hi2";
import { useDeleteComment } from "./useDeleteComment";
import { useUser } from "../Users/useUser";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const StyledListItem = styled.li`
  padding: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #174441;
  border: 2px solid #558467;
  border-radius: 8px;
  box-shadow: 0 0 6px 2px rgba(85, 132, 103, 0.7);
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 8px 3px rgba(85, 132, 103, 0.9);
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #558467;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  background-color: #efeabb;
  color: #174441;
  padding: 16px;
  border-radius: 8px;
  font-size: 20px;
`;

const DeleteButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  color: #efeabb;
  background-color: #4b1426;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  transition: all 0.3s linear;
  &:hover {
    cursor: pointer;
    background-color: #3a0f1e;
  }
`;
const CommentsListItem = ({ comment }) => {
  const profiles = comment.profiles;
  const fullName = profiles?.full_name;
  const role = profiles?.role;
  const avatar = profiles?.avatar;
  const formatedCreatedAt = new Date(comment?.created_at).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "medium",
  });

  const { role: userRole } = useUser();
  const isAdmin = userRole === "admin";

  const { isDeletingComment, deleteComment } = useDeleteComment();

  return (
    <StyledListItem>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <Avatar src={avatar} alt={fullName} />
          <Headings
            as="h2"
            style={{ color: "#efeabb", textTransform: "capitalize" }}
          >
            {fullName}
          </Headings>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              color: "#efeabb",
              fontSize: "24px",
              fontWeight: "500",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {role}
          </p>

          {isAdmin && (
            <Modal>
              <Modal.Open opens="delete">
                <DeleteButton>
                  <HiTrash style={{ fontSize: "24px" }} />
                </DeleteButton>
              </Modal.Open>
              <Modal.Window name="delete">
                <ConfirmDelete
                  disabled={isDeletingComment}
                  onConfirm={() => {
                    deleteComment(comment?.id);
                  }}
                />
              </Modal.Window>
            </Modal>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CommentContainer>{comment.content}</CommentContainer>
        <div style={{ color: "#efeabb", fontSize: "18px" }}>
          {formatedCreatedAt}
        </div>
      </div>
    </StyledListItem>
  );
};

export default CommentsListItem;
