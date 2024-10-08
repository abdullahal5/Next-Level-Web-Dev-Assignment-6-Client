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
import { Chip } from "@nextui-org/chip";
import { Avatar } from "@nextui-org/avatar";

import { useMyPaymentQuery } from "@/src/redux/features/payment/paymentApi";
import { IPayment } from "@/src/types";
import { formatDate } from "@/src/utils/dateFormat";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "PAYMENT AMOUNT", uid: "amount" },
  { name: "PAYMENT METHOD", uid: "paymentMethod" },
  { name: "TRANSACTION ID", uid: "transactionId" },
  { name: "PLAN TITLE", uid: "planTitle" },
  { name: "EXPIRY DATE", uid: "expiryDate" },
  { name: "STATUS", uid: "paymentStatus" },
];

const PaymentHistory = () => {
  const { data: myPayment, isLoading: paymentLoading } =
    useMyPaymentQuery(undefined);

  const payments: IPayment[] = myPayment?.data || [];

  const renderCell = (payment: IPayment, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2">
            <Avatar src={payment.user?.profilePicture}>
              {payment.user?.username}
            </Avatar>
            <p className="text-xs">{payment.user?.username}</p>
          </div>
        );
      case "amount":
        return <p className="text-xs">${payment?.amount}</p>;
      case "paymentMethod":
        return <p className="text-xs">{payment?.paymentMethod}</p>;
      case "transactionId":
        return <p className="text-xs">{payment?.transactionId}</p>;
      case "planTitle":
        return <p className="text-xs">{payment?.planTitle}</p>;
      case "expiryDate":
        return <p className="text-xs">{formatDate(payment?.expiryDate)}</p>;
      case "paymentStatus":
        return (
          <Chip
            className="text-white"
            color={payment?.status === "Active" ? "success" : "danger"}
            size="sm"
          >
            {payment?.status}
          </Chip>
        );
      default:
        return <p>N/A</p>;
    }
  };

  if (paymentLoading) {
    return <p>Loading...</p>;
  }

  if (payments.length === 0) {
    return (
      <div className="text-3xl font-semibold text-center">
        No Payment History Available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table
        aria-label="User and Payment History"
        className="min-w-[640px] md:w-full"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={payments}>
          {(payment) => (
            <TableRow key={payment._id}>
              {(columnKey) => (
                <TableCell>{renderCell(payment, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistory;
