"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { FaUsers, FaFileAlt } from "react-icons/fa";
import { SlUserFollowing } from "react-icons/sl";
import { useTheme } from "next-themes";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Bar,
  Line,
} from "recharts";

import { useDashbaordDataQuery } from "@/src/redux/features/dashboard/dashboardApi";

interface PayloadData {
  name: string;
  value: number | string;
}

interface CustomTooltipProps {
  active: boolean;
  payload?: { payload: PayloadData }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;

    return (
      <div className="bg-white dark:bg-gray-800 p-2 rounded shadow">
        <p className="font-semibold text-gray-800 dark:text-white">{name}</p>
        <p className="text-gray-600 dark:text-gray-300">Value: {value}</p>
      </div>
    );
  }

  return null;
};

const UserDashboardStats = () => {
  const { data: dashboard } = useDashbaordDataQuery(undefined);
  const { theme } = useTheme();
  const cardClass = `border ${
    theme === "dark"
      ? "bg-gray-900 border-gray-700 text-white"
      : "bg-white border-gray-200 text-gray-800"
  } shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 w-full`;

  const chartData = [
    {
      name: "Total Posts",
      value: dashboard?.data?.totalPosts,
      color: "#8884d8",
    },
    {
      name: "Followers",
      value: dashboard?.data?.totalFollowers,
      color: "#82ca9d",
    },
    {
      name: "Following",
      value: dashboard?.data?.totalFollowing,
      color: "#ffc658",
    },
    {
      name: "Pay Amount",
      value: dashboard?.data?.totalPayAmount,
      color: "#ff7300",
    },
  ];

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-200">
          Dashboard Overview
        </h1>
        <div className="flex items-center gap-5 w-full">
          <Card className={cardClass}>
            <CardHeader className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <FaFileAlt className="text-4xl text-blue-500 dark:text-blue-300" />
              </div>
              <h2 className="text-xl font-semibold">Total Posts</h2>
            </CardHeader>
            <CardBody>
              <p className="text-3xl font-semibold">
                {dashboard?.data?.totalPosts}
              </p>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } mt-1`}
              >
                Posts created so far
              </p>
            </CardBody>
          </Card>

          <Card className={cardClass}>
            <CardHeader className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <FaUsers className="text-4xl text-green-500 dark:text-green-300" />
              </div>
              <h2 className="text-xl font-semibold">Total Followers</h2>
            </CardHeader>
            <CardBody>
              <p className="text-3xl font-semibold">
                {dashboard?.data?.totalFollowers}
              </p>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } mt-1`}
              >
                Your Followers
              </p>
            </CardBody>
          </Card>

          <Card className={cardClass}>
            <CardHeader className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                <SlUserFollowing className="text-4xl text-yellow-500 dark:text-yellow-300" />
              </div>
              <h2 className="text-xl font-semibold">Total Following</h2>
            </CardHeader>
            <CardBody>
              <p className="text-3xl font-semibold">
                {dashboard?.data?.totalFollowing}
              </p>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } mt-1`}
              >
                You Following
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="mx-auto w-full">
          <ComposedChart
            data={chartData}
            height={350}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            width={1000}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip active={true} />} />
            <Bar dataKey="value" fill="#8884d8" />
            <Line dataKey="value" stroke="#ff7300" type="monotone" />
            <Area
              dataKey="value"
              fill="#82ca9d"
              stroke="#82ca9d"
              type="monotone"
            />
          </ComposedChart>
        </div>
      </div>
    </>
  );
};

export default UserDashboardStats;
