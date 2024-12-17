import { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      {/* <div className="h-full overflow-hidden">
        <Sidebar />
      </div> */}
      <Navbar />
      <div className="lg:p-10 mx-auto p-5 h-screen">{children}</div>
    </div>
  );
};

export default DashboardLayout;
