import Image from "next/image";
import { SlLike, SlDislike } from "react-icons/sl";
import { BsCalendar2Date } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const PostCard = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
        <div className="w-full md:w-2/3">
          <div className="flex items-center justify-between pb-3">
            <div className="flex gap-2 items-center">
              <Image
                alt="Author Image"
                className="object-cover rounded-full border"
                height={30}
                src={"https://i.ibb.co/vkVW6s0/download.png"}
                width={30}
              />
              <p className="font-semibold">John Doe</p>
              <span className="bg-green-700 text-white px-3 text-sm rounded-full py-1 cursor-pointer hover:bg-green-800 transition duration-300">
                + Follow
              </span>
            </div>
            <FaRegHeart
              className="cursor-pointer text-gray-600"
              fontSize={"1.5rem"}
            />
          </div>
          <h1 className="text-2xl font-semibold hover:text-blue-600 transition duration-200">
            Living in a State of Misery: Missouri, the Heart of America’s Racism
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            From Lloyd Gaines to Marcellus Williams: Missouri’s Legacy of
            Lynching Black Men
          </p>
          <div className="pt-4">
            <div className="flex items-center gap-3 lg:w-[60%] md:w-[60%] w-full justify-between text-gray-600">
              <div className="flex items-center gap-1">
                <BsCalendar2Date
                  className="cursor-pointer"
                  fontSize={"1.2rem"}
                />
                <span className="text-xs">23-04-2024</span>
              </div>
              <div className="flex items-center gap-1">
                <SlLike className="cursor-pointer" fontSize={"1.2rem"} />
                <span className="text-xs">23</span>
              </div>
              <div className="flex items-center gap-1">
                <SlDislike className="cursor-pointer" fontSize={"1.2rem"} />
                <span className="text-xs">73</span>
              </div>
              <div className="flex items-center gap-1">
                <FaComment className="cursor-pointer" fontSize={"1.2rem"} />
                <span className="text-xs">273</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <Image
            alt="Blog Image"
            className="rounded-md w-full h-auto object-cover shadow-md transition-transform duration-300 hover:scale-105"
            height={400}
            src="https://i.ibb.co/Jz8JV0C/river-landscape-illustration-pixel-art-style-23-2151793116.jpg"
            width={400}
          />
        </div>
      </div>
      <hr className="my-14 dark:border-gray-300 border-black opacity-30" />
    </div>
  );
};

export default PostCard;
