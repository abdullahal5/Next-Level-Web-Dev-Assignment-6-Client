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
import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";

import {
  useFavouritePostMutation,
  useGetMeQuery,
} from "@/src/redux/features/auth/authApi";
import { useAppSelector } from "@/src/redux/hook";
import { IPost } from "@/src/types";
import { DeleteIcon } from "@/src/components/icons";

const columns = [
  { name: "TITLE", uid: "title" },
  { name: "CATEGORY", uid: "category" },
  { name: "AUTHOR", uid: "author" },
  { name: "UPVOTES", uid: "upvotes" },
  { name: "DOWNVOTES", uid: "downvotes" },
  { name: "ACTIONS", uid: "actions" },
];

const Favourite = () => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { data: getMe, isLoading: favouriteDataLoading } = useGetMeQuery(
    currentUser?.userId && { _id: currentUser.userId },
  );
  const favouriteData = (getMe?.data?.favourite as IPost[]) || [];
  const [favouritePost] = useFavouritePostMutation();

  const handleDelete = async (id: string) => {
    await favouritePost(id);
  };

  const renderCell = React.useCallback(
    (post: IPost, columnKey: React.Key): React.ReactNode => {
      switch (columnKey) {
        case "title":
          return <p className="text-bold">{post.title}</p>;
        case "category":
          return <Chip>{post.category}</Chip>;
        case "author":
          return <p>{post.author._id}</p>;
        case "upvotes":
          return <p>{post.upvotes}</p>;
        case "downvotes":
          return <p>{post.downvotes}</p>;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="danger" content="Delete post">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleDelete(post._id)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    [],
  );

  if (favouriteData.length === 0) {
    return (
      <div className="text-3xl font-semibold text-center">
        No Payment History Available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {favouriteDataLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
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
              isLoading={favouriteDataLoading}
              items={favouriteData}
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
        </>
      )}
    </div>
  );
};

export default Favourite;
