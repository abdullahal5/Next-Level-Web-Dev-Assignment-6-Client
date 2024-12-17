"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiGrid42 } from "react-icons/ci";
import { FaDollarSign, FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoHomeOutline, IoKeyOutline } from "react-icons/io5";

import { removeToken } from "@/src/utils/setCookie";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { logout } from "@/src/redux/features/auth/authSlice";

const userRoutes = [
  { item: "Dashboard", icon: MdOutlineDashboardCustomize, link: "/dashboard" },
  { item: "Profile", icon: CgProfile, link: "/dashboard/profile" },
  { item: "My Content", icon: CiGrid42, link: "/dashboard/my-content" },
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

export default function NavbarDropdown() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    removeToken();
    router.push("/");
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {user ? (
        <Dropdown>
          <DropdownTrigger>
            <Avatar className="cursor-pointer" src={user?.profileImage} />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions">
            {userRoutes?.map((route) => (
              <DropdownItem
                key={route.item}
                icon={<route.icon />}
                onClick={() => handleNavigation(route.link)}
              >
                {route.item}
              </DropdownItem>
            ))}

            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              onClick={handleLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Link href={"/login"}>Login</Link>
      )}
    </>
  );
}
