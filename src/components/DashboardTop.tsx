"use client";

import Image from "next/image";

import { useAppSelector } from "../redux/hook";

const DashboardTop = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="h-16 lg:flex md:flex hidden px-5 border-b dark:border-gray-700 items-center justify-between dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black bg-gradient-to-r from-gray-100 via-gray-200 to-white animate-slide-down">
      <div className="animate-fade-in">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          Welcome Back!
        </h1>
        <p className="text-sm dark:text-gray-400 text-gray-700">
          Your dashboard is ready
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right animate-fade-in-delay">
          <h1 className="text-xl font-semibold dark:text-white text-gray-900">
            {user?.username}
          </h1>
          <p className="text-sm dark:text-gray-400 text-gray-700 capitalize">
            {user?.role}
          </p>
        </div>
        <Image
          alt="Profile Image"
          className="rounded-full border-2 border-gray-500 dark:border-gray-500 hover:border-blue-500 dark:hover:border-blue-500 transition-transform duration-300 hover:scale-110 h-12 w-12 object-cover"
          height={50}
          src={user?.profileImage as string}
          width={50}
        />
      </div>
    </div>
  );
};

export default DashboardTop;
