"use client";
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import Image from "next/image";
import { SlLike, SlDislike } from "react-icons/sl";
import { BsCalendar2Date } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";
import { Spinner } from "@nextui-org/spinner";

import { IPost } from "@/src/types";
import { formatDate } from "@/src/utils/dateFormat";
import {
  useFavouritePostMutation,
  useFollowAndUnfollowUserMutation,
  useGetMeQuery,
} from "@/src/redux/features/auth/authApi";
import { useAppSelector } from "@/src/redux/hook";
import { useUpvoteDownvoteMutation } from "@/src/redux/features/post/postApi";

interface IPostCard {
  post: IPost;
}

const PostCard = ({ post }: IPostCard) => {
  const [followAndUnfollow, { isLoading: followLoading }] =
    useFollowAndUnfollowUserMutation();
  const { user } = useAppSelector((state) => state.auth);
  const [favouritePost, { isLoading: favouriteLoading }] =
    useFavouritePostMutation();
  const [upAndDownVote] = useUpvoteDownvoteMutation();
  const { data: getMe } = useGetMeQuery({ _id: user?.userId });

  const postFavId = getMe?.data?.favourite.map(
    (item: { _id: any }) => item._id
  );

  const followAndUnfollowUser = async (followOwnerId: string) => {
    if (followOwnerId) {
      await followAndUnfollow(followOwnerId);
    }
  };

  const handleFavouritePost = async (id: string) => {
    await favouritePost(id);
  };

  const upvotes = async (id: string) => {
    const data = {
      _id: id,
      type: "increment",
    };

    await upAndDownVote(data);
  };
  const downvotes = async (id: string) => {
    const data = {
      _id: id,
      type: "decrement",
    };

    await upAndDownVote(data);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        <div className="w-full md:w-2/3">
          <div className="flex items-center justify-between pb-3">
            <div className="flex gap-2 items-center">
              <Image
                alt="Author Image"
                className="object-cover rounded-full border"
                height={30}
                src={
                  post?.author?.profilePicture as
                    | string
                    | "https://i.ibb.co/vkVW6s0/download.png"
                }
                width={30}
              />
              <p className="font-semibold">{post.author.username}</p>
              {user?.userId !== post.author?._id && (
                <span
                  className="bg-green-700 text-white px-3 text-sm rounded-full py-1 cursor-pointer hover:bg-green-800 transition duration-300"
                  onClick={() => followAndUnfollowUser(post?.author?._id)}
                >
                  {followLoading ? (
                    <Spinner
                      className={`${followLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                      color="white"
                      size="sm"
                    />
                  ) : post.author?.followers?.includes(
                      user?.userId as string
                    ) ? (
                    "Unfollow"
                  ) : (
                    "+ Follow"
                  )}
                </span>
              )}
            </div>
            {favouriteLoading ? (
              <Spinner size="sm" />
            ) : (
              <FaRegHeart
                className={`cursor-pointer  ${postFavId?.includes(post?._id) ? "text-red-700" : "text-gray-600"}`}
                fontSize={"1.5rem"}
                onClick={() => handleFavouritePost(post._id)}
              />
            )}
          </div>
          <div className="flex items-center">
            <h1 className="text-2xl inline-block font-semibold hover:text-blue-600 transition duration-200">
              <Link href={`/newsfeed/${post._id}`}>{post.title}</Link>
            </h1>
            {post.isPremium ? (
              <Chip className="ml-3" color="primary" variant="flat">
                Premium
              </Chip>
            ) : (
              ""
            )}
          </div>

          <p className="text-sm text-gray-500 mt-1">{post.bio}</p>
          <div className="pt-4">
            <div className="flex items-center gap-3 lg:w-[60%] md:w-[60%] w-full justify-between text-gray-600">
              <div className="flex items-center gap-1">
                <BsCalendar2Date
                  className="cursor-pointer"
                  fontSize={"1.2rem"}
                />
                <span className="text-xs">{formatDate(post.createdAt)}</span>
              </div>
              <div
                className="flex items-center gap-1"
                onClick={() => upvotes(post._id)}
              >
                <SlLike className="cursor-pointer" fontSize={"1.2rem"} />
                <span className="text-xs">{post.upvotes}</span>
              </div>
              <div
                className="flex items-center gap-1"
                onClick={() => downvotes(post._id)}
              >
                <SlDislike className="cursor-pointer" fontSize={"1.2rem"} />
                <span className="text-xs">{post.downvotes}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaComment className="cursor-pointer" fontSize={"1.2rem"} />
                <span className="text-xs">{post.commentsCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <Image
            alt="Blog Image"
            className="rounded-md w-full h-auto object-cover shadow-md transition-transform duration-300 hover:scale-105"
            height={400}
            src={post.images[0]}
            width={400}
          />
        </div>
      </div>
      <hr className="my-10 dark:border-gray-300 border-black opacity-30" />
    </div>
  );
};

export default PostCard;
