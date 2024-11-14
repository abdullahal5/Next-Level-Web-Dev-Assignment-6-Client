import { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex w-full flex-col h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;
// className="container mx-auto max-w-7xl px-6 flex-grow"
