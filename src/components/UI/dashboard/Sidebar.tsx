/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { CiGrid42 } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { RiEditLine } from "react-icons/ri";
import { IoKeyOutline } from "react-icons/io5";

const links = [
  {
    item: "Profile",
    icon: CgProfile,
    link: "/dashboard/profile",
  },
  {
    item: "My Content",
    icon: CiGrid42,
    link: "/dashboard/my-content",
  },
  {
    item: "Create Post",
    icon: IoAddCircleOutline,
    link: "/dashboard/create-post",
  },
  {
    item: "Favourites",
    icon: FaRegHeart,
    link: "/dashboard/favourites",
  },
  {
    item: "Edit Profile",
    icon: RiEditLine,
    link: "/dashboard/edit-profile",
  },
  {
    item: "Change Password",
    icon: IoKeyOutline,
    link: "/dashboard/change-password",
  },
  {
    item: "Home",
    icon: IoHomeOutline,
    link: "/",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className="lg:hidden block md:p-2" onClick={toggleSidebar}>
        ☰
      </button>

      <div
        className={`fixed inset-0 overflow-y-auto z-30 bg-black bg-opacity-50 transition-opacity duration-300 md:block ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      >
        <div
          className={`w-80 bg-gray-900 border-r border-gray-600 fixed top-0 left-0 h-screen p-3 transform transition-transform duration-500 ease-in-out md:translate-x-0 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <Link className="flex items-center justify-center gap-2" href={"/"}>
              <Image
                alt="Web Image"
                height={50}
                src={
                  "https://i.ibb.co.com/gMLfjkP/images-removebg-preview-2.png"
                }
                width={50}
              />
              <h1 className="text-2xl font-semibold">Gardening HUB</h1>
            </Link>
            <button className="text-white lg:hidden" onClick={toggleSidebar}>
              <IoClose size={24} />
            </button>
          </div>

          <div className="flex-grow pt-8 space-y-2 overflow-y-auto">
            {links.map((item) => (
              <Link
                key={Math.random()}
                className={`flex group items-center gap-2 px-4 cursor-pointer py-3 rounded-md hover:bg-gray-800 text-lg ${
                  item.link === pathname ? "bg-gray-800" : ""
                }`}
                href={item.link}
                onClick={closeSidebar}
              >
                <p
                  className={`transition-transform duration-200 transform group-hover:scale-110 ${
                    item.link === pathname ? "scale-125" : ""
                  }`}
                >
                  {<item.icon fontSize={"1.4rem"} />}
                </p>
                <p>{item.item}</p>
              </Link>
            ))}
          </div>

          <div className="flex items-center group gap-2 px-4 cursor-pointer py-3 rounded-md border text-lg text-red-600 hover:border-red-500 duration-300">
            <p className="transition-transform duration-200 transform group-hover:scale-110">
              <IoLogOutOutline fontSize={"1.4rem"} />
            </p>
            <p>Logout</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-80 border-r border-gray-600 sticky top-0 left-0 h-screen p-3 flex-col">
        <Link href={"/"}>
          <div className="flex items-center justify-center py-5 border-b border-gray-600 mx-8">
            <Image
              alt="Web Image"
              height={50}
              src={"https://i.ibb.co.com/gMLfjkP/images-removebg-preview-2.png"}
              width={50}
            />
            <h1 className="text-2xl font-semibold">Gardening HUB</h1>
          </div>
        </Link>
        <div className="flex-grow pt-8 space-y-2 overflow-y-auto">
          {links.map((item) => (
            <Link
              key={Math.random()}
              className={`flex group items-center gap-2 px-4 cursor-pointer py-3 rounded-md hover:bg-gray-800 text-lg ${
                item.link === pathname ? "bg-gray-800" : ""
              }`}
              href={item.link}
            >
              <p
                className={`transition-transform duration-200 transform group-hover:scale-110 ${
                  item.link === pathname ? "scale-125" : ""
                }`}
              >
                {<item.icon fontSize={"1.4rem"} />}
              </p>
              <p>{item.item}</p>
            </Link>
          ))}
        </div>

        <div className="flex items-center lg:mt-0 mt-5 group gap-2 px-4 cursor-pointer py-3 rounded-md border text-lg text-red-600 hover:border-red-500 duration-300">
          <p className="transition-transform duration-200 transform group-hover:scale-110">
            <IoLogOutOutline fontSize={"1.4rem"} />
          </p>
          <p>Logout</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
