/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";

import { DeleteIcon, EyeIcon } from "@/src/components/icons";
import {
  useDeletePostMutation,
  useGetAllPostQuery,
} from "@/src/redux/features/post/postApi";
import { IPost } from "@/src/types";

const columns = [
  { name: "AUTHOR", uid: "author" },
  { name: "TITLE", uid: "title" },
  { name: "CATEGORY", uid: "category" },
  { name: "UPVOTES", uid: "upvotes" },
  { name: "DOWNVOTES", uid: "downvotes" },
  { name: "COMMENTS", uid: "commentsCount" },
  { name: "ACTIONS", uid: "actions" },
];

export default function ManageAllPostPage() {
  const { data: getAllPosts } = useGetAllPostQuery(undefined);
  const [deleteSinglePost] = useDeletePostMutation();
  const posts = getAllPosts?.data as IPost[];
  const router = useRouter();

  const viewPost = (id: string) => {
    router.push(`/newsfeed/${id}`);
  };

  const deletePost = async (id: string) => {
    await deleteSinglePost(id);
  };

  const renderCell = React.useCallback((post: IPost, columnKey: React.Key) => {
    const cellValue = post[columnKey as keyof IPost];

    switch (columnKey) {
      case "author":
        return (
          <div className="flex items-center gap-2">
            <Avatar src={post.author.profilePicture}>
              {post.author.username}
            </Avatar>
            <p>{post.author.username}</p>
          </div>
        );

      case "title":
        return <p>{post.title}</p>;

      case "category":
        return <p>{post.category}</p>;

      case "upvotes":
        return <p>{post.upvotes?.length}</p>;

      case "downvotes":
        return <p>{post.downvotes?.length}</p>;

      case "commentsCount":
        return <p>{post.commentsCount}</p>;

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => viewPost(post._id)}
            >
              <EyeIcon />
            </span>
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => deletePost(post._id)}
            >
              <DeleteIcon />
            </span>
          </div>
        );

      default:
        if (typeof cellValue === "string" || typeof cellValue === "number") {
          return <p>{cellValue}</p>;
        } else if (Array.isArray(cellValue)) {
          return <p>{cellValue.length > 0 ? cellValue.join(", ") : "N/A"}</p>;
        } else if (typeof cellValue === "object" && cellValue !== null) {
          return <p>N/A</p>;
        } else {
          return <p>N/A</p>;
        }
    }
  }, []);

  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table
          aria-label="Post table with data from API"
          className="min-w-[640px] md:w-full"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={posts}>
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
}
