/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDashboardCustomize } from "react-icons/md";

import { removeToken } from "@/src/utils/setCookie";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { logout } from "@/src/redux/features/auth/authSlice";

interface UserRoute {
  item: string;
  icon: React.ComponentType;
  link: string;
}

const userRoutes: UserRoute[] = [
  { item: "Dashboard", icon: MdOutlineDashboardCustomize, link: "/dashboard" },
  { item: "Profile", icon: CgProfile, link: "/profile" },
  // { item: "Favourites", icon: FaRegHeart, link: "/dashboard/favourites" },
  // {
  //   item: "Payment History",
  //   icon: FaDollarSign,
  //   link: "/dashboard/my-payment",
  // },
  // {
  //   item: "Change Password",
  //   icon: IoKeyOutline,
  //   link: "/dashboard/change-password",
  // },
  // { item: "Home", icon: IoHomeOutline, link: "/" },
];

export default function NavbarDropdown() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    removeToken();
    router.push("/login");
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative">
      {user ? (
        <div className="relative">
          <div onClick={toggleDropdown}>
            <Avatar className="cursor-pointer" src={user?.profileImage} />
          </div>

          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border dark:border-gray-600"
            >
              <div className="p-2">
                {userRoutes.map((route) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    key={route.item}
                    className="flex items-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleNavigation(route.link)}
                  >
                    <span className="text-black dark:text-white">
                      {route.item}
                    </span>
                  </div>
                ))}
                <div
                  className="flex items-center rounded-md p-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link href={"/login"}>Login</Link>
      )}
    </div>
  );
}
