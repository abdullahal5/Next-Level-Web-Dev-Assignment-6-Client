"use client";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { toast } from "sonner";

import { useCommentUpdateMutation } from "../redux/features/comment/commentApi";

import GHInput from "./form/GHInput";
import GHForm from "./form/GHForm";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  commentId: string;
  comment: string;
}

const EditCommentModal = ({ isOpen, onClose, commentId, comment }: IProps) => {
  const [updateComment, { isLoading: updateCommentLoading }] =
    useCommentUpdateMutation();

  const commentUpdateDefaultValue = {
    commentText: comment,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updateCommentData = {
      data: {
        ...data,
      },
      commentId,
    };

    try {
      const res: any = await updateComment(updateCommentData);

      if (res.error) {
        toast.error(res?.error?.data?.message, {
          duration: 2000,
        });
      } else {
        toast.success("Comment updated successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      backdrop={"blur"}
      classNames={{
        base: "bg-background",
        header: "border-b border-divider",
        footer: "border-t border-divider",
        closeButton: "hover:bg-default-100 active:bg-default-200",
      }}
      isOpen={isOpen}
      placement="center"
      onOpenChange={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Edit Comment</h2>
            </ModalHeader>
            <ModalBody className="my-8">
              <GHForm
                defaultValues={commentUpdateDefaultValue}
                onSubmit={onSubmit}
              >
                <GHInput label="New Comment" name="commentText" />
                <div className="mt-4 flex-1 w-2/6">
                  <Button
                    className="w-full"
                    color="primary"
                    isLoading={updateCommentLoading}
                    size="md"
                    spinner={<Spinner color="current" size="sm" />}
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </GHForm>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditCommentModal;
