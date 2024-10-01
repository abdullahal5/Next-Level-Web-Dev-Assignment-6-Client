import { Navbar } from "@/src/components/navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex w-full flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
    </div>
  );
};

export default CommonLayout;
