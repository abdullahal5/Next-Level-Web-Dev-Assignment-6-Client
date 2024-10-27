"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { FaUsers, FaFileAlt, FaDollarSign } from "react-icons/fa";
import { useTheme } from "next-themes";

import { useDashbaordDataQuery } from "@/src/redux/features/dashboard/dashboardApi";

export interface IDashboard {
  totalPosts: number;
  totalUsers: number;
  totalRevenue: number;
}

const DashboardStatsPage = () => {
  const { data: dashboard } = useDashbaordDataQuery(undefined);
  const { theme } = useTheme();

  const mydata = dashboard?.data as IDashboard;

  const cardClass = `border ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-800"} shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105`;

  return (
    <div className="p-6 space-y-8">
      <h1
        className={`text-4xl font-bold text-center ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
      >
        Dashboard Overview
      </h1>
      <div className="grid gap-8 md:grid-cols-3 grid-cols-1">
        <Card className={cardClass}>
          <CardHeader className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <FaFileAlt className="text-4xl text-blue-500 dark:text-blue-300" />
            </div>
            <h2 className="text-xl font-semibold">Total Posts</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">{mydata?.totalPosts || 0}</p>
            <p
              className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}
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
            <h2 className="text-xl font-semibold">Total Users</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">{mydata?.totalUsers || 0}</p>
            <p
              className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}
            >
              Active users
            </p>
          </CardBody>
        </Card>

        <Card className={cardClass}>
          <CardHeader className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <FaDollarSign className="text-4xl text-yellow-500 dark:text-yellow-300" />
            </div>
            <h2 className="text-xl font-semibold">Total Revenue</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">
              ${mydata?.totalRevenue || 0}
            </p>
            <p
              className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}
            >
              Revenue generated
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStatsPage;
