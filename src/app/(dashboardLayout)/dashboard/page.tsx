"use client";

import DashboardStatsPage from "@/src/components/UI/dashboard/admin/DashboardStats";
import UserDashboardStats from "@/src/components/UI/dashboard/user/UserDashboardStats";
import GlobalLoading from "@/src/components/UI/GlobalLoading";
import { useAppSelector } from "@/src/redux/hook";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <GlobalLoading />;
  }

  return (
    <div>
      {user?.role === "admin" ? <DashboardStatsPage /> : <UserDashboardStats />}
    </div>
  );
};

export default Dashboard;
