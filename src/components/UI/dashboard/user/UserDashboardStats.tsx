"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { FaUsers, FaFileAlt, FaDollarSign } from "react-icons/fa";
import { XAxis, YAxis, Tooltip, Legend, Area, AreaChart } from "recharts";

import { useDashbaordDataQuery } from "@/src/redux/features/dashboard/dashboardApi";

export interface Root {
  postCount: number;
  followers: number;
  following: number;
}

const UserDashboardStats = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("total");
  const { data: dashboard } = useDashbaordDataQuery(selectedFilter);

  const mydata = dashboard?.data as Root;

  let data = [
    {
      name: "Total Paid",
      count: dashboard?.data?.dashboardData?.totalPaymentAmount || 0,
    },
    {
      name: "Payments",
      count: dashboard?.data?.dashboardData?.totalPayments || 0,
    },
    {
      name: "Posts",
      totalPosts: 150,
      count: dashboard?.data?.dashboardData?.totalPosts || 0,
    },
    {
      name: "Total Upvotes",
      count: dashboard?.data?.dashboardData?.totalUpvotes || 0,
    },
    {
      name: "Total Downvotes",
      count: dashboard?.data?.dashboardData?.totalDownvotes || 0,
    },
  ];

  if (selectedFilter === "posts") {
    const postData = dashboard?.data?.postData || [];

    data = postData.map(
      (post: { title: string | any[]; upvotes: any; downvotes: any }) => ({
        name: post.title.slice(0, 3),
        upvotes: post.upvotes,
        downvotes: post.downvotes,
      }),
    );
  } else if (selectedFilter === "payments") {
    const paymentData = dashboard?.data?.paymentData || [];

    data = paymentData.map(
      (payment: { planTitle: any; amount: any; status: any }) => ({
        name: payment.planTitle,
        amount: payment.amount,
        status: payment.status,
      }),
    );
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <>
      <div className="p-6 space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-200">
          Dashboard Overview
        </h1>
        <div className="grid gap-8 md:grid-cols-3 grid-cols-1">
          <Card className="bg-gray-900 border border-gray-700 text-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <CardHeader className="flex items-center gap-4">
              <FaFileAlt className="text-5xl text-blue-400" />
              <h2 className="text-xl font-semibold">My Posts</h2>
            </CardHeader>
            <CardBody>
              <div className="text-3xl font-semibold">
                {mydata?.postCount || 0}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Posts created so far
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gray-900 border border-gray-700 text-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <CardHeader className="flex items-center gap-4">
              <FaUsers className="text-5xl text-green-400" />
              <h2 className="text-xl font-semibold">Total Followers</h2>
            </CardHeader>
            <CardBody>
              <div className="text-3xl font-semibold">
                {mydata?.followers || 0}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Reactions received
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gray-900 border border-gray-700 text-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <CardHeader className="flex items-center gap-4">
              <FaDollarSign className="text-5xl text-yellow-400" />
              <h2 className="text-xl font-semibold">Total Following</h2>
            </CardHeader>
            <CardBody>
              <div className="text-3xl font-semibold">
                {mydata?.following || 0}
              </div>
              <div className="text-sm text-gray-400 mt-1">Comments made</div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="text-center">
        <select
          className="p-2 bg-gray-800 text-white rounded-md"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="total">Total Overview</option>
          <option value="posts">Post Stats</option>
          <option value="payments">Payment Stats</option>
        </select>
      </div>

      <AreaChart
        className="mx-auto"
        data={data}
        height={350}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        width={1200}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {selectedFilter === "payments" && (
          <>
            <Area
              dataKey={`status`}
              fill="url(#colorUv)"
              fillOpacity={1}
              stroke="#8884d8"
              type="monotone"
            />
            <Area
              dataKey={`amount`}
              fill="url(#colorPv)"
              fillOpacity={1}
              stroke="#82ca9d"
              type="monotone"
            />
          </>
        )}
        <Area
          dataKey={`${selectedFilter === "total" ? "count" : "upvotes"}`}
          fill="url(#colorUv)"
          fillOpacity={1}
          stroke="#8884d8"
          type="monotone"
        />
        <Area
          dataKey={`${selectedFilter === "total" ? "count" : "downvotes"}`}
          fill="url(#colorPv)"
          fillOpacity={1}
          stroke="#82ca9d"
          type="monotone"
        />
      </AreaChart>
    </>
  );
};

export default UserDashboardStats;
