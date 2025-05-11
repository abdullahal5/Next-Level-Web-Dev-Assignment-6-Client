import { ReactNode } from "react";

import Sidebar from "@/src/components/UI/dashboard/Sidebar";
import DashboardTop from "@/src/components/DashboardTop";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div className="h-full overflow-hidden">
        <Sidebar />
      </div>
      <div className="flex-1 h-screen overflow-y-auto">
        <DashboardTop />
        <div className="lg:p-10 mx-auto p-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
