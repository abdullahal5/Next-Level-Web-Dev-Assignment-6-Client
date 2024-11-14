"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiTrendingUp, FiStar, FiClock } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

import { useGetAllPostQuery } from "@/src/redux/features/post/postApi";

const SideInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { data: getAll, isLoading } = useGetAllPostQuery({});

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/filter?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleNewsletterSignup = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Newsletter signup for:", email);
    setEmail("");
  };

  const recentPosts = getAll?.data
    ?.slice(0, 3)
    .map((item: { title: string; createdAt: string; _id: string }) => {
      const dateObj = new Date(item.createdAt);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      return {
        title: item.title,
        date: formattedDate,
        id: item._id,
      };
    });

  const trendingTopics = [];

  // const recentPosts = [
  //   {
  //     title: "10 AI Innovations Changing Healthcare",
  //     date: "2023-12-01",
  //     slug: "ai-innovations-healthcare",
  //   },
  //   {
  //     title: "The Future of Renewable Energy Sources",
  //     date: "2023-11-28",
  //     slug: "future-renewable-energy",
  //   },
  //   {
  //     title: "Cybersecurity Trends for 2024",
  //     date: "2023-11-25",
  //     slug: "cybersecurity-trends-2024",
  //   },
  // ];

  return (
    <div className="w-full space-y-8">
      <form className="relative" onSubmit={handleSearch}>
        <input
          className="w-full py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search Here..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          type="submit"
        >
          <FiSearch className="w-5 h-5" />
        </button>
      </form>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
          <FiTrendingUp className="mr-2 text-blue-500" /> Trending Topics
        </h2>
        {/* <ul className="space-y-2">
          {trendingTopics?.map((topic, index) => (
            <li
              key={index}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <FiStar className="mr-2 text-yellow-500" />
              <a href={`/topic/${topic.toLowerCase().replace(/\s+/g, "-")}`}>
                {topic}
              </a>
            </li>
          ))}
        </ul> */}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
          <FiClock className="mr-2 text-green-500" /> Recent Posts
        </h2>
        <ul className="space-y-4">
          {recentPosts?.map((post, index) => (
            <li
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0 last:pb-0"
            >
              <a
                className="block hover:text-blue-500 dark:hover:text-blue-400"
                href={`/post/${post.id}/${post.title.replace(/\s+/g, "-")}`}
              >
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaCrown className="mr-2" /> Become a Premium Member
        </h2>
        <p className="mb-4">
          Unlock exclusive content, ad-free experience, and more!
        </p>
        <ul className="mb-6 space-y-2">
          <li className="flex items-center">
            <FiStar className="mr-2" /> Exclusive articles and insights
          </li>
          <li className="flex items-center">
            <FiStar className="mr-2" /> Ad-free browsing experience
          </li>
          <li className="flex items-center">
            <FiStar className="mr-2" /> Early access to new features
          </li>
        </ul>
        <button className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default SideInfo;
