"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { FaUsers, FaFileAlt, FaDollarSign } from "react-icons/fa";

import { useDashbaordDataQuery } from "@/src/redux/features/dashboard/dashboardApi";

export interface IDashboard {
  totalPosts: number;
  totalUsers: number;
  totalRevenue: number;
}

const DashboardStatsPage = () => {
  const { data: dashboard } = useDashbaordDataQuery(undefined);

  const mydata = dashboard?.data as IDashboard;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-200">
        Dashboard Overview
      </h1>
      <div className="grid gap-8 md:grid-cols-3 grid-cols-1">
        <Card className="bg-gray-900 border border-gray-700 text-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <CardHeader className="flex items-center gap-4">
            <FaFileAlt className="text-5xl text-blue-400" />
            <h2 className="text-xl font-semibold">Total Posts</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">{mydata?.totalPosts}</p>
            <p className="text-sm text-gray-400 mt-1">Posts created so far</p>
          </CardBody>
        </Card>

        <Card className="bg-gray-900 border border-gray-700 text-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <CardHeader className="flex items-center gap-4">
            <FaUsers className="text-5xl text-green-400" />
            <h2 className="text-xl font-semibold">Total Users</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">{mydata?.totalUsers}</p>
            <p className="text-sm text-gray-400 mt-1">Active users</p>
          </CardBody>
        </Card>

        <Card className="bg-gray-900 border border-gray-700 text-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <CardHeader className="flex items-center gap-4">
            <FaDollarSign className="text-5xl text-yellow-400" />
            <h2 className="text-xl font-semibold">Total Revenue</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">${mydata?.totalRevenue}</p>
            <p className="text-sm text-gray-400 mt-1">Revenue generated</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStatsPage;
