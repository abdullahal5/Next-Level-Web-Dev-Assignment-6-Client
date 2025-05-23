"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  IoHomeOutline,
  IoClose,
  IoKeyOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { FaDollarSign, FaRegHeart, FaUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiEditLine } from "react-icons/ri";
import { CiGrid42 } from "react-icons/ci";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";

import GlobalLoading from "../GlobalLoading";

import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { logout } from "@/src/redux/features/auth/authSlice";

const userRoutes = [
  { item: "Dashboard", icon: MdOutlineDashboardCustomize, link: "/dashboard" },
  { item: "Profile", icon: CgProfile, link: "/profile" },
  { item: "Favourites", icon: FaRegHeart, link: "/dashboard/favourites" },
  {
    item: "Payment History",
    icon: FaDollarSign,
    link: "/dashboard/my-payment",
  },
  { item: "Edit Profile", icon: RiEditLine, link: "/dashboard/edit-profile" },
  {
    item: "Change Password",
    icon: IoKeyOutline,
    link: "/dashboard/change-password",
  },
  { item: "Home", icon: IoHomeOutline, link: "/" },
];

const adminRoutes = [
  { item: "Dashboard", icon: MdOutlineDashboardCustomize, link: "/dashboard" },
  { item: "Profile", icon: CgProfile, link: "/profile" },
  { item: "All Users", icon: FaUser, link: "/dashboard/manage-Users" },
  { item: "All Posts", icon: CiGrid42, link: "/dashboard/manage-posts" },
  {
    item: "Payment History",
    icon: FaDollarSign,
    link: "/dashboard/manage-payment-history",
  },
  {
    item: "Change Password",
    icon: IoKeyOutline,
    link: "/dashboard/change-password",
  },
  { item: "Edit Profile", icon: RiEditLine, link: "/dashboard/edit-profile" },
  { item: "Home", icon: IoHomeOutline, link: "/" },
];

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();

  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    setIsMounted(true);
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && event.target instanceof Element) {
        const sidebar = document.getElementById("sidebar");
        const toggleButton = document.getElementById("toggle-sidebar");

        if (
          sidebar &&
          !sidebar.contains(event.target) &&
          !toggleButton?.contains(event.target)
        ) {
          closeSidebar();
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen, closeSidebar]);

  const links = user?.role === "admin" ? adminRoutes : userRoutes;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (!isMounted) return null;
  if (!user) return <GlobalLoading />;

  return (
    <>
      <Button
        isIconOnly
        aria-label="Open Sidebar"
        className="lg:hidden fixed top-4 left-4 z-50"
        id="toggle-sidebar"
        onClick={toggleSidebar}
      >
        <CiGrid42 size={24} />
      </Button>

      <motion.div
        className={`lg:relative md:fixed fixed z-50 border-r dark:border-gray-700 h-full bg-white dark:bg-gray-900 shadow-xl overflow-y-auto transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0 w-80" : "-translate-x-full w-0"
        } lg:translate-x-0 lg:w-80`}
        id="sidebar"
        initial={false}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link className="flex items-center space-x-3" href="/">
              <Image
                alt="Gardening HUB Logo"
                height={50}
                src="https://i.ibb.co.com/gMLfjkP/images-removebg-preview-2.png"
                width={50}
              />
              <span className="text-2xl font-bold text-green-600">
                Gardening HUB
              </span>
            </Link>
            <Button
              isIconOnly
              aria-label="Close Sidebar"
              className="lg:hidden"
              onClick={closeSidebar}
            >
              <IoClose size={24} />
            </Button>
          </div>

          <nav>
            {links.map((item) => (
              <Link
                key={item.link}
                className="space-y-2"
                href={item.link}
                onClick={closeSidebar}
              >
                <div
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-150
                    ${
                      pathname === item.link
                        ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  <item.icon className="text-xl" />
                  <span className="text-sm font-medium">{item.item}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Button
            className="w-full justify-start"
            startContent={theme === "dark" ? "🌙" : "☀️"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
          <Button
            className="w-full justify-start mt-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
            startContent={<IoLogOutOutline className="text-xl" />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
