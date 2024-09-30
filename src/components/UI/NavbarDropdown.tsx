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

import { logout } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";

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
            <Avatar className="cursor-pointer" />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions">
            <DropdownItem onClick={() => handleNavigation("/profile")}>
              Profile
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation("/profile/settings")}>
              Settings
            </DropdownItem>
            <DropdownItem
              onClick={() => handleNavigation("/profile/create-post")}
            >
              Create Post
            </DropdownItem>
            <DropdownItem
              key="delete"
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
