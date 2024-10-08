/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { IoAddCircleOutline } from "react-icons/io5";
import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useRouter } from "next/navigation";

import { DeleteIcon, EditIcon, EyeIcon } from "@/src/components/icons";
import "react-quill/dist/quill.snow.css";
import {
  useDeletePostMutation,
  useGetMyPostQuery,
} from "@/src/redux/features/post/postApi";
import { IMyPost } from "@/src/types";
import UpdateContent from "@/src/components/UpdateContent";
import CreatePost from "@/src/components/UI/CreatePost";
import GlobalModal from "@/src/components/UI/GlobalModal";

const columns = [
  { name: "THUMBNAIL", uid: "thumbnail" },
  { name: "TITLE", uid: "title" },
  { name: "CATEGORY", uid: "category" },
  { name: "UPVOTES", uid: "upvotes" },
  { name: "DOWNVOTES", uid: "downvotes" },
  { name: "COMMENTS", uid: "comments" },
  { name: "PREMIUM", uid: "premium" },
  { name: "ACTIONS", uid: "actions" },
];

const MyContent = () => {
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const { data: getMyPost, isLoading: getMyPostLoading } =
    useGetMyPostQuery(undefined);
  const router = useRouter();

  const myPost = (getMyPost?.data as IMyPost[]) || [];
  const [editingPost, setEditingPost] = React.useState<IMyPost | null>(null);

  const [deleteSinglePost] = useDeletePostMutation();

  const handleView = (id: string) => {
    router.push(`/newsfeed/${id}`);
  };

  const handleEdit = (post: IMyPost) => {
    setEditingPost(post);
    onUpdateOpen();
  };

  const handleDelete = async (id: string) => {
    await deleteSinglePost(id);
  };

  const renderCell = React.useCallback(
    (post: IMyPost, columnKey: React.Key): React.ReactNode => {
      switch (columnKey) {
        case "thumbnail":
          return (
            <Image
              alt="Thumbnail"
              className="rounded-full mx-auto w-10 h-10 object-cover"
              height={20}
              src={post?.thumbnail}
              width={20}
            />
          );
        case "title":
          return <p className="text-bold">{post.title}</p>;
        case "category":
          return <Chip>{post.category}</Chip>;
        case "upvotes":
          return <p>{post.upvotes}</p>;
        case "downvotes":
          return <p>{post.downvotes}</p>;
        case "comments":
          return <p>{post.commentsCount}</p>;
        case "premium":
          return <p>{post.isPremium ? "Yes" : "No"}</p>;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <span
                className="text-lg text-primary cursor-pointer active:opacity-50"
                title="View"
                onClick={() => handleView(post._id)}
              >
                <EyeIcon />
              </span>
              <span
                className="text-lg text-success cursor-pointer active:opacity-50"
                title="Edit"
                onClick={() => handleEdit(post)}
              >
                <EditIcon />
              </span>
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                title="Delete"
                onClick={() => handleDelete(post._id)}
              >
                <DeleteIcon />
              </span>
            </div>
          );
        default:
          return null;
      }
    },
    []
  );

  if (!myPost || myPost?.length === 0) {
    return (
      <div className="text-3xl font-semibold text-center">
        No Posts Available
      </div>
    );
  }

  return (
    <>
      <Button variant="solid" onPress={onCreateOpen}>
        <IoAddCircleOutline fontSize={"1.5rem"} />
        Add New Content
      </Button>

      <GlobalModal
        action="Create Post"
        isOpen={isCreateOpen}
        size="xl"
        title="New Content"
        onClose={onCreateClose}
      >
        <CreatePost />
      </GlobalModal>

      {editingPost && (
        <GlobalModal
          action="Update Post"
          isOpen={isUpdateOpen}
          size="xl"
          title="Update Content"
          onClose={onUpdateClose}
        >
          <UpdateContent onClose={onUpdateClose} post={editingPost} />
        </GlobalModal>
      )}

      <div className="pt-5">
        <Table aria-label="Favourite posts table" className="min-w-full">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={"center"}
                className="whitespace-nowrap"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            isLoading={getMyPostLoading}
            items={myPost}
            loadingContent={
              <TableRow>
                <TableCell align="center" colSpan={columns.length}>
                  Loading...
                </TableCell>
              </TableRow>
            }
          >
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default MyContent;
