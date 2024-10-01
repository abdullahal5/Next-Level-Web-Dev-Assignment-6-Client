"use client";
import Image from "next/image";
import { useState } from "react";
import { FaCrown, FaTimes } from "react-icons/fa";

const SideInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const recommendedTopics = [
    "Diversity",
    "Culture",
    "Travel",
    "Education",
    "Wellness",
  ];

  const toggleSideInfo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="lg:hidden">
        <button
          className="fixed bottom-5 right-5 z-50 p-2 bg-purple-600 text-white rounded-full"
          onClick={toggleSideInfo}
        >
          Toggle Info
        </button>

        {isOpen && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={toggleSideInfo}
          />
        )}

        <div
          className={`fixed z-[99999] top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 p-5 rounded-l-2xl transform transition-transform overflow-y-auto duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-3 right-3 text-gray-600 dark:text-gray-300"
            onClick={toggleSideInfo}
          >
            <FaTimes size={24} />
          </button>

          <h1 className="text-xl font-semibold">Recommended Blogs</h1>
          <div>
            <div className="py-3">
              <div className="flex gap-2 items-center">
                <Image
                  alt="Author Image"
                  className="object-cover rounded-full border"
                  height={20}
                  src={"https://i.ibb.co/vkVW6s0/download.png"}
                  width={20}
                />
                <p className="font-semibold text-sm">John Doe</p>
              </div>
              <h1 className="text-[14px] pt-1 font-semibold">
                Living in a State of Misery: Missouri, the Heart of America’s
                Racism
              </h1>
            </div>
            <hr className="dark:border-gray-300 border-black opacity-30" />
            <div className="py-3">
              <div className="flex gap-2 items-center">
                <Image
                  alt="Author Image"
                  className="object-cover rounded-full border"
                  height={20}
                  src={"https://i.ibb.co/vkVW6s0/download.png"}
                  width={20}
                />
                <p className="font-semibold text-sm">John Doe</p>
              </div>
              <h1 className="text-[14px] pt-1 font-semibold">
                Living in a State of Misery: Missouri, the Heart of America’s
                Racism
              </h1>
            </div>
            <hr className="dark:border-gray-300 border-black opacity-30" />
            <div className="py-3">
              <div className="flex gap-2 items-center">
                <Image
                  alt="Author Image"
                  className="object-cover rounded-full border"
                  height={20}
                  src={"https://i.ibb.co/vkVW6s0/download.png"}
                  width={20}
                />
                <p className="font-semibold text-sm">John Doe</p>
              </div>
              <h1 className="text-[14px] pt-1 font-semibold">
                Living in a State of Misery: Missouri, the Heart of America’s
                Racism
              </h1>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Recommended Topics</h2>
            <div className="flex flex-wrap gap-2">
              {recommendedTopics.map((topic) => (
                <span
                  key={topic}
                  className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-9">
            <h2 className="text-lg font-semibold mb-2">Top Followers</h2>
            <div className="flex gap-2 items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  alt="Author Image"
                  className="object-cover rounded-full border"
                  height={30}
                  src={"https://i.ibb.co/vkVW6s0/download.png"}
                  width={30}
                />
                <div>
                  <p className="font-semibold text-sm">John Doe</p>
                  <p className="text-xs text-gray-400">
                    He/Him . 1.3k followers
                  </p>
                </div>
              </div>
              <span className="bg-green-700 text-white px-3 text-sm rounded-full py-1 cursor-pointer hover:bg-green-800 transition duration-300">
                + Follow
              </span>
            </div>
            <hr className="dark:border-gray-300 border-black opacity-30 my-3" />
            <div className="flex gap-2 items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  alt="Author Image"
                  className="object-cover rounded-full border"
                  height={30}
                  src={"https://i.ibb.co/vkVW6s0/download.png"}
                  width={30}
                />
                <div>
                  <p className="font-semibold text-sm">John Doe</p>
                  <p className="text-xs text-gray-400">
                    He/Him . 1.3k followers
                  </p>
                </div>
              </div>
              <span className="bg-green-700 text-white px-3 text-sm rounded-full py-1 cursor-pointer hover:bg-green-800 transition duration-300">
                + Follow
              </span>
            </div>
            <hr className="dark:border-gray-300 border-black opacity-30 my-3" />
            <div className="flex gap-2 items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  alt="Author Image"
                  className="object-cover rounded-full border"
                  height={30}
                  src={"https://i.ibb.co/vkVW6s0/download.png"}
                  width={30}
                />
                <div>
                  <p className="font-semibold text-sm">John Doe</p>
                  <p className="text-xs text-gray-400">
                    He/Him . 1.3k followers
                  </p>
                </div>
              </div>
              <span className="bg-green-700 text-white px-3 text-sm rounded-full py-1 cursor-pointer hover:bg-green-800 transition duration-300">
                + Follow
              </span>
            </div>
            <div className="relative py-8">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-40">
                <p className="text-xl block">
                  Available for <br />
                  <strong>
                    <img
                      alt=""
                      className="w-7 inline"
                      src="https://i.ibb.co/rQCTqNV/diamond-1.png"
                    />{" "}
                    Premium
                  </strong>{" "}
                  user
                </p>
                <button className="sm:text-sm bg-purple-600 text-white rounded-lg px-3 py-2 hover:bg-purple-700 duration-300 mt-2 flex items-center gap-2 mx-auto cursor-pointer">
                  <FaCrown className="text-yellow-400" fontSize="1.3rem" />
                  Be pro
                </button>
              </div>
              <div className="blur text-center select-none pt-5">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                  fuga nam iusto blanditiis culpa voluptatem quibusdam, dolorum
                  sapiente magnam ex?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block border dark:border-gray-600 h-auto w-full rounded-2xl p-3">
        <h1 className="text-xl font-semibold">Recommended Blogs</h1>
        <div>
          <div className="py-3">
            <div className="flex gap-2 items-center">
              <Image
                alt="Author Image"
                className="object-cover rounded-full border"
                height={20}
                src={"https://i.ibb.co/vkVW6s0/download.png"}
                width={20}
              />
              <p className="font-semibold text-sm">John Doe</p>
            </div>
            <h1 className="text-[14px] pt-1 font-semibold">
              Living in a State of Misery: Missouri, the Heart of America’s
              Racism
            </h1>
          </div>
          <hr className="dark:border-gray-300 border-black opacity-30" />
          <div className="py-3">
            <div className="flex gap-2 items-center">
              <Image
                alt="Author Image"
                className="object-cover rounded-full border"
                height={20}
                src={"https://i.ibb.co/vkVW6s0/download.png"}
                width={20}
              />
              <p className="font-semibold text-sm">John Doe</p>
            </div>
            <h1 className="text-[14px] pt-1 font-semibold">
              Living in a State of Misery: Missouri, the Heart of America’s
              Racism
            </h1>
          </div>
          <hr className="dark:border-gray-300 border-black opacity-30" />
          <div className="py-3">
            <div className="flex gap-2 items-center">
              <Image
                alt="Author Image"
                className="object-cover rounded-full border"
                height={20}
                src={"https://i.ibb.co/vkVW6s0/download.png"}
                width={20}
              />
              <p className="font-semibold text-sm">John Doe</p>
            </div>
            <h1 className="text-[14px] pt-1 font-semibold">
              Living in a State of Misery: Missouri, the Heart of America’s
              Racism
            </h1>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Recommended Topics</h2>
          <div className="flex flex-wrap gap-2">
            {recommendedTopics.map((topic) => (
              <span
                key={topic}
                className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-9">
          <h2 className="text-lg font-semibold mb-2">Top Followers</h2>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                alt="Author Image"
                className="object-cover rounded-full border"
                height={30}
                src={"https://i.ibb.co/vkVW6s0/download.png"}
                width={30}
              />
              <div>
                <p className="font-semibold text-sm">John Doe</p>
                <p className="text-xs text-gray-400">He/Him . 1.3k followers</p>
              </div>
            </div>
            <span className="bg-green-700 text-white px-3 text-sm rounded-full py-1 cursor-pointer hover:bg-green-800 transition duration-300">
              + Follow
            </span>
          </div>
          <hr className="dark:border-gray-300 border-black opacity-30 my-3" />
          <div className="flex gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                alt="Author Image"
                className="object-cover rounded-full border"
                height={30}
                src={"https://i.ibb.co/vkVW6s0/download.png"}
                width={30}
              />
              <div>
                <p className="font-semibold text-sm">John Doe</p>
                <p className="text-xs text-gray-400">He/Him . 1.3k followers</p>
              </div>
            </div>
            <span className="bg-green-700 text-white px-3 text-sm rounded-full py-1 cursor-pointer hover:bg-green-800 transition duration-300">
              + Follow
            </span>
          </div>
          <hr className="dark:border-gray-300 border-black opacity-30 my-3" />
          <div className="flex gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                alt="Author Image"
                className="object-cover rounded-full border"
                height={30}
                src={"https://i.ibb.co/vkVW6s0/download.png"}
                width={30}
              />
              <div>
                <p className="font-semibold text-sm">John Doe</p>
                <p className="text-xs text-gray-400">He/Him . 1.3k followers</p>
              </div>
            </div>
            <span className="bg-green-700 text-white px-3 text-sm rounded-full py-1 cursor-pointer hover:bg-green-800 transition duration-300">
              + Follow
            </span>
          </div>
          <div className="relative py-8">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-40">
              <p className="text-xl block">
                Available for <br />
                <strong>
                  <img
                    alt=""
                    className="w-7 inline"
                    src="https://i.ibb.co/rQCTqNV/diamond-1.png"
                  />{" "}
                  Premium
                </strong>{" "}
                user
              </p>
              <button className="sm:text-sm bg-purple-600 text-white rounded-lg px-3 py-2 hover:bg-purple-700 duration-300 mt-2 flex items-center gap-2 mx-auto cursor-pointer">
                <FaCrown className="text-yellow-400" fontSize="1.3rem" />
                Be pro
              </button>
            </div>
            <div className="blur text-center select-none pt-5">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                fuga nam iusto blanditiis culpa voluptatem quibusdam, dolorum
                sapiente magnam ex?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideInfo;
