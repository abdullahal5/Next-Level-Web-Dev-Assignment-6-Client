"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";

import EditCommentModal from "../../EditCommentmodal";

import { useAppSelector } from "@/src/redux/hook";
import { IComment } from "@/src/types";
import { formatDate } from "@/src/utils/dateFormat";
import { useDeleteCommentMutation } from "@/src/redux/features/comment/commentApi";

interface IProps {
  comment: IComment;
}

const CommentCard = ({ comment }: IProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentDelete, { isLoading: commentdelteLoading }] =
    useDeleteCommentMutation();

  const handleDelete = (id: string) => {
    commentDelete(id);
  };

  const handleUpdateComment = () => {
    onOpen();
  };

  return (
    <div className="flex items-start">
      <Avatar
        alt={comment.userId.username}
        className="mr-4"
        size="md"
        src={comment.userId.profilePicture}
      />
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <p className="font-semibold text-lg">{comment.userId.username}</p>
          <p className="text-sm text-default-500">
            {formatDate(comment.createdAt)}
          </p>
        </div>
        <p className="text-default-700 dark:text-default-500 text-base leading-relaxed">
          {comment.commentText}
        </p>
        {comment.userId._id.includes(user?.userId as string) ? (
          <div className="flex items-center gap-3 pt-2">
            <>
              <Button
                size="sm"
                variant="bordered"
                onClick={handleUpdateComment}
              >
                Edit
              </Button>
              <Button
                color="danger"
                isLoading={commentdelteLoading}
                size="sm"
                variant="bordered"
                onClick={() => handleDelete(comment._id)}
              >
                Delete
              </Button>
            </>
          </div>
        ) : (
          ""
        )}
      </div>

      <EditCommentModal
        comment={comment?.commentText}
        commentId={comment?._id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default CommentCard;
