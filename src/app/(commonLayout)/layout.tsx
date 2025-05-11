import { Navbar } from "@/src/components/navbar";
import Footer from "@/src/components/Footer";
import { ReactNode } from "react";

interface CommonLayoutProps {
  children: ReactNode;
  pathname: string;
}

const CommonLayout = ({ children, pathname }: CommonLayoutProps) => {
  const noFooterRoutes = ["/login", "/register"];
  const shouldHideFooter = noFooterRoutes.includes(pathname);

  return (
    <div className="relative flex w-full flex-col h-screen">
      <Navbar />
      <main>{children}</main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default CommonLayout;
