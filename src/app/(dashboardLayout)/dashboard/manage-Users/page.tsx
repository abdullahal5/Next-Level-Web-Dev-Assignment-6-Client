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
import { Chip, ChipProps } from "@nextui-org/chip";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";

import { DeleteIcon, EyeIcon } from "@/src/components/icons";
import {
  useDeletUserMutation,
  useGetAllUserQuery,
  useStatusToggleMutation,
} from "@/src/redux/features/auth/authApi";
import { IAuthor } from "@/src/types";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "GENDER", uid: "gender" },
  { name: "ROLE", uid: "role" },
  { name: "FOLLOWERS", uid: "followers" },
  { name: "FOLLOWING", uid: "following" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  Active: "success",
  Blocked: "danger",
};

export default function AllUser() {
  const { data: getAllUser } = useGetAllUserQuery(undefined);
  const users = getAllUser?.data as IAuthor[];
  const router = useRouter();
  const [deleteSingleUser] = useDeletUserMutation();
  const [toggleStatus] = useStatusToggleMutation();

  const deleteUser = async (id: string) => {
    await deleteSingleUser(id);
  };

  const viewUser = (id: string) => {
    router.push(`/dashboard/profile?userId=${id}`);
  };

  const handleUpdateStatus = async (id: string) => {
    await toggleStatus(id);
  };

  const renderCell = React.useCallback(
    (user: IAuthor, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof IAuthor];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex items-center gap-2">
              <Avatar src={user.profilePicture}>{user.username}</Avatar>
              <p>{user.username}</p>
            </div>
          );
        case "email":
          return (
            <div className="flex items-center gap-2">
              <p>{user.email}</p>
            </div>
          );
        case "gender":
          return (
            <div className="flex items-center gap-2">
              <p>{user.gender}</p>
            </div>
          );
        case "followers":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {user.followers.length}
              </p>
            </div>
          );
        case "following":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {user.following.length}
              </p>
            </div>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{user.role}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize cursor-pointer"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
              onClick={() => handleUpdateStatus(user._id)}
            >
              {user.status}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => viewUser(user._id)}
              >
                <EyeIcon />
              </span>
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteUser(user._id)}
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
    },
    [],
  );

  if (!users) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1
        className={`text-4xl font-bold text-center dark:text-gray-200 text-gray-800 pb-5`}
      >
        All User
      </h1>
      <div className="overflow-x-auto">
        <Table
          aria-label="User table with data from API"
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
          <TableBody items={users}>
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
