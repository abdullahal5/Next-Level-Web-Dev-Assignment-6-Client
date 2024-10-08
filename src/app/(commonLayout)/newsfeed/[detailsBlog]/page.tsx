/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import { FaCheckCircle, FaComment, FaRegHeart } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import { FaRegShareSquare } from "react-icons/fa";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { IoIosSend } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@nextui-org/divider";
import { toast } from "sonner";
import { Chip } from "@nextui-org/chip";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { formatDate } from "@/src/utils/dateFormat";
import { IPost } from "@/src/types";
import {
  useGetSinlePostQuery,
  useUpvoteDownvoteMutation,
} from "@/src/redux/features/post/postApi";
import {
  useFavouritePostMutation,
  useFollowAndUnfollowUserMutation,
  useGetMeQuery,
} from "@/src/redux/features/auth/authApi";
import { useAppSelector } from "@/src/redux/hook";
import GHForm from "@/src/components/form/GHForm";
import TTextarea from "@/src/components/form/GHTextArea";
import { commentValidationSchema } from "@/src/schema/comment.schema";
import { useCreateCommentMutation } from "@/src/redux/features/comment/commentApi";
import CommentCard from "@/src/components/UI/newsfeed/CommentCard";

const DetailsBlog = ({ params }: { params: { detailsBlog: string } }) => {
  const [copied, setCopied] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const { data: getSinglePostData, isLoading } = useGetSinlePostQuery({
    _id: params.detailsBlog,
  });

  const [followAndUnfollow, { isLoading: followLoading }] =
    useFollowAndUnfollowUserMutation();

  const [postComment, { isLoading: commentLoading }] =
    useCreateCommentMutation();

  const [upAndDownVote] = useUpvoteDownvoteMutation();

  const router = useRouter();

  const data = getSinglePostData?.data as IPost;

  const { data: getMe } = useGetMeQuery({ _id: user?.userId });

  const [favouritePost, { isLoading: favouriteLoading }] =
    useFavouritePostMutation();

  const postFavId = getMe?.data?.favourite.map(
    (item: { _id: any }) => item._id,
  );

  const postUrl = `localhost:3000/newsfeed/${data?._id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  const followAndUnfollowUser = async (followOwnerId: string) => {
    if (followOwnerId) {
      await followAndUnfollow(followOwnerId);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const commentData = {
      ...data,
      postId: params?.detailsBlog,
      userId: user?.userId,
    };

    const res = await postComment(commentData);

    if (res.data.success) {
      toast.success("Comment added successfully");
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

  const isPremiumAndNotVerified = data?.isPremium && !getMe?.data?.isVerified;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {isPremiumAndNotVerified && (
            <div className="bg-black/80 h-screen fixed inset-0 z-[999] backdrop-blur-md flex items-center justify-center">
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-8 max-w-sm text-center">
                <h2 className="text-4xl font-extrabold text-white mb-4">
                  Premium Content
                </h2>
                <p className="text-lg text-gray-400 mb-6">
                  This content is exclusive to premium users. Please upgrade to
                  access it.
                </p>
                <div className="flex items-center gap-3 justify-center">
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 rounded-md px-6 py-3 font-semibold shadow-md "
                    onClick={() => router.push("/subscription")}
                  >
                    Upgrade Now
                  </Button>
                  <Button
                    className="bg-gray-600 text-white hover:bg-gray-700 transition duration-300 rounded-md px-6 py-3 font-semibold"
                    onClick={() => router.back()}
                  >
                    Go Back
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className="max-w-3xl mx-auto rounded-lg p-3 my-5 border border-gray-800">
            <h1 className="text-5xl font-semibold">{data?.title}</h1>
            <p className="text-lg text-gray-400 border-gray-600 py-7">
              {data?.bio}
            </p>
            {data?.isPremium ? (
              <Chip className="mb-5" color="primary" variant="flat">
                Premium
              </Chip>
            ) : (
              ""
            )}
            <div className="flex gap-3 border-b border-t py-3 border-gray-600">
              <div className="relative flex justify-center items-center">
                <Image
                  alt="Profile Image"
                  className={`rounded-full border p-1 transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg ${
                    data?.author?.isVerified
                      ? "border-blue-600 border-2"
                      : "border-gray-300"
                  }`}
                  height={50}
                  src={data?.author?.profilePicture as string}
                  width={50}
                />
                {data?.author?.isVerified && (
                  <div className="absolute -bottom-1 right-0 mb-1 ml-1 p-1 rounded-full shadow-md">
                    <FaCheckCircle
                      className="text-blue-500"
                      fontSize={"1rem"}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg hover:underline">
                      <Link
                        href={`/dashboard/profile?userId=${data?.author?._id}`}
                      >
                        {data.author.username}
                      </Link>
                    </p>
                    {user?.userId !== data.author._id && (
                      <span
                        className="bg-green-700 text-white px-3 text-sm rounded-full py-1 cursor-pointer hover:bg-green-800 transition duration-300"
                        onClick={() => followAndUnfollowUser(data?.author?._id)}
                      >
                        {followLoading ? (
                          <Spinner
                            className={`${followLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                            color="white"
                            size="sm"
                          />
                        ) : data?.author?.followers?.includes(
                            user?.userId as string,
                          ) ? (
                          "Unfollow"
                        ) : (
                          "+ Follow"
                        )}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">
                    {data?.author?.followers?.length} followers .{" "}
                    {formatDate(data?.createdAt)}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <div className="flex items-center gap-1">
                    {favouriteLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      <FaRegHeart
                        className={`cursor-pointer  ${postFavId?.includes(data?._id) ? "text-red-700" : "text-gray-600"}`}
                        fontSize={"1.5rem"}
                        onClick={() => handleFavouritePost(data._id)}
                      />
                    )}
                  </div>
                  <div
                    className="flex items-center gap-1"
                    onClick={() => upvotes(data._id)}
                  >
                    <SlLike className="cursor-pointer" fontSize={"1.2rem"} />
                    <span className="text-xs">{data.upvotes}</span>
                  </div>
                  <div
                    className="flex items-center gap-1"
                    onClick={() => downvotes(data._id)}
                  >
                    <SlDislike className="cursor-pointer" fontSize={"1.2rem"} />
                    <span className="text-xs">{data.downvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaComment
                      className="cursor-pointer text-gray-500"
                      fontSize={"1.2rem"}
                    />
                    <span className="text-xs">{data.commentsCount}</span>
                  </div>
                  <div className="flex relative items-center gap-1">
                    <FaRegShareSquare
                      className="cursor-pointer text-gray-500"
                      fontSize={"1.2rem"}
                      onClick={copyToClipboard}
                    />
                    {copied && (
                      <span className="text-xs top-8 absolute bg-gray-800 rounded-md px-3 py-2">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-10">
              <Image
                alt="Cover Image"
                className="w-full h-[400px] bg-cover bg-center bg-no-repeat rounded-md object-cover"
                height={200}
                src={data?.thumbnail}
                width={500}
              />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: data?.content }}
              className="mt-6 prose dark:prose-invert max-w-full break-words"
            />
          </div>{" "}
          {data?.comments?.length > 0 ? (
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl font-semibold">Comments</h1>
              <div className="py-7 my-5 px-3 overflow-y-auto max-h-[500px] ">
                {data?.comments?.map((comment, index) => (
                  <div key={index} className="w-full mb-6 last:mb-0">
                    <CommentCard comment={comment} />
                    {index < data.comments.length - 1 && (
                      <Divider className="my-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="max-w-3xl mx-auto">
            <GHForm
              resolver={zodResolver(commentValidationSchema)}
              onSubmit={onSubmit}
            >
              <TTextarea
                label="What's on your mind?"
                name="commentText"
                type="text"
              />
              <Button
                className="my-3 rounded-md text-white font-semibold"
                color="primary"
                isLoading={commentLoading}
                size="md"
                type="submit"
              >
                <IoIosSend fontSize={"1.4rem"} />
                Post Comment
              </Button>
            </GHForm>
          </div>
        </>
      )}
    </>
  );
};

export default DetailsBlog;
