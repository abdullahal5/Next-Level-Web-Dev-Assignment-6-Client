"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FiClock,
  FiArrowRight,
  FiThumbsUp,
  FiThumbsDown,
  FiMessageSquare,
  FiStar,
  FiUserPlus,
} from "react-icons/fi";
import { AiOutlineLoading } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { IPost } from "@/src/types";
import {
  useFavouritePostMutation,
  useFollowAndUnfollowUserMutation,
  useGetMeQuery,
} from "@/src/redux/features/auth/authApi";
import { useAppSelector } from "@/src/redux/hook";
import { useUpvoteDownvoteMutation } from "@/src/redux/features/post/postApi";

const PostCard = ({
  _id,
  title,
  bio,
  author,
  category,
  upvotes,
  downvotes,
  commentsCount,
  isPremium,
  thumbnail,
  createdAt,
}: IPost) => {
  const [followAndUnfollow, { isLoading: followLoading }] =
    useFollowAndUnfollowUserMutation();
  const { user } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsModalOpen] = useState(false);
  const [favouritePost, { isLoading: favouriteLoading }] =
    useFavouritePostMutation();
  const { data: getMe } = useGetMeQuery({ _id: user?.userId });
  const [upAndDownVote] = useUpvoteDownvoteMutation();

  const router = useRouter();

  const postFavId =
    getMe?.data?.favourite?.map((item: { _id: any }) => item._id) || [];

  const handleSeepost = () => {
    router.push(`/post/${_id}/${title.replace(/\s+/g, "-")}`);
  };

  const followAndUnfollowUser = async (followOwnerId: string) => {
    if (!user) {
      setIsModalOpen(true);

      return;
    }
    if (followOwnerId) await followAndUnfollow(followOwnerId);
  };

  const handleFavouritePost = async (id: string) => {
    if (!user) {
      setIsModalOpen(true);

      return;
    }
    if (id) await favouritePost(id);
  };

  const handleVote = async (id: string, type: "upvote" | "downvote") => {
    if (!user) {
      setIsModalOpen(true);

      return;
    }
    if (id) await upAndDownVote({ _id: id, type });
  };

  return (
    <div className="text-gray-900 dark:text-white w-full md:w-3/4 lg:w-full overflow-hidden transform transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {thumbnail && (
          <div className="w-full md:w-1/3 flex-shrink-0 mb-4 md:mb-0">
            <div className="relative h-64 md:h-full overflow-hidden">
              <Link href={`/post/${_id}/${title.replace(/\s+/g, "-")}`}>
                <Image
                  alt={title}
                  className="transition-transform duration-300 object-cover hover:scale-110"
                  layout="fill"
                  src={thumbnail}
                />
              </Link>
            </div>
          </div>
        )}

        <div className="md:ml-6 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-yellow-500 text-black font-semibold py-1 px-3 rounded-full text-xs uppercase tracking-wide">
                  {category}
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                  <FiClock className="mr-1" />{" "}
                  {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {isPremium && <FiStar className="w-5 h-5 text-yellow-500" />}
                <button
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  disabled={favouriteLoading}
                >
                  {favouriteLoading ? (
                    <AiOutlineLoading className="w-5 h-5 animate-spin" />
                  ) : (
                    <FaRegHeart
                      className={`w-5 h-5 ${postFavId.includes(_id) ? "text-red-500" : ""}`}
                      onClick={() => handleFavouritePost(_id)}
                    />
                  )}
                </button>
              </div>
            </div>

            <Link href={`/post/${_id}/${title.replace(/\s+/g, "-")}`}>
              <h2 className="text-2xl hover:text-blue-500 dark:hover:text-blue-500 duration-300 md:text-2xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                {title}
              </h2>
            </Link>

            <p className="text-sm md:text-base lg:text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
              {bio}
            </p>

            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center gap-3">
                <Image
                  alt="Author"
                  className="rounded-full border"
                  height={40}
                  src={author?.profilePicture as string}
                  width={40}
                />
                <div className="flex items-start space-x-2">
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {author?.username}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {author?.followers.length} followers
                    </p>
                  </div>
                  {user?.userId !== author?._id && (
                    <button
                      className={`flex items-center space-x-1 ${
                        author?.followers?.includes(user?.userId as string)
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white text-xs font-bold py-1 px-2 rounded-full transition-colors duration-300`}
                      disabled={followLoading}
                      onClick={() =>
                        author?._id && followAndUnfollowUser(author._id)
                      }
                    >
                      {followLoading ? (
                        <AiOutlineLoading className="w-3 h-3 animate-spin" />
                      ) : (
                        <FiUserPlus className="w-3 h-3" />
                      )}
                      <span>
                        {author?.followers?.includes(user?.userId as string)
                          ? "Unfollow"
                          : "Follow"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center space-x-4">
              <button
                className={`flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 ${upvotes.includes(user?.userId as string) ? "text-blue-500 dark:text-blue-00 border rounded-md px-3 border-blue-500" : ""}`}
                onClick={() => handleVote(_id, "upvote")}
              >
                <FiThumbsUp />
                <span>{upvotes.length}</span>
              </button>
              <button
                className={`flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300 ${downvotes?.includes(user?.userId as string) ? "text-red-500 dark:text-red-500 border px-3 rounded-md border-red-500" : ""}`}
                onClick={() => handleVote(_id, "downvote")}
              >
                <FiThumbsDown />
                <span>{downvotes.length}</span>
              </button>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <FiMessageSquare />
                <span>{commentsCount} comments</span>
              </div>
            </div>
            <button
              className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
              onClick={handleSeepost}
            >
              <span>Read More</span>
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
