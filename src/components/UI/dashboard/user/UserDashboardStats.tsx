import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { FaUsers, FaFileAlt, FaDollarSign } from "react-icons/fa";

import { useDashbaordDataQuery } from "@/src/redux/features/dashboard/dashboardApi";

export interface Root {
  postCount: number;
  followers: number;
  following: number;
}

const UserDashboardStats = () => {
  const { data: dashboard } = useDashbaordDataQuery(undefined);

  const mydata = dashboard?.data as Root;

  return (
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
            <div className="text-3xl font-semibold">{mydata?.postCount}</div>
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
            <div className="text-3xl font-semibold">{mydata?.followers}</div>
            <div className="text-sm text-gray-400 mt-1">Reactions received</div>
          </CardBody>
        </Card>

        <Card className="bg-gray-900 border border-gray-700 text-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <CardHeader className="flex items-center gap-4">
            <FaDollarSign className="text-5xl text-yellow-400" />
            <h2 className="text-xl font-semibold">Total Following</h2>
          </CardHeader>
          <CardBody>
            <div className="text-3xl font-semibold">{mydata?.following}</div>
            <div className="text-sm text-gray-400 mt-1">Comments made</div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardStats;
