/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import { FaComment, FaRegHeart } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import { FaRegShareSquare } from "react-icons/fa";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { IoIosSend } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@nextui-org/divider";
import { toast } from "sonner";

import { formatDate } from "@/src/utils/dateFormat";
import { IPost } from "@/src/types";
import { useGetSinlePostQuery } from "@/src/redux/features/post/postApi";
import { useFollowAndUnfollowUserMutation } from "@/src/redux/features/auth/authApi";
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

  const data = getSinglePostData?.data as IPost;

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

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {" "}
          <div className="max-w-3xl mx-auto rounded-lg p-3 my-5 border border-gray-800">
            <h1 className="text-5xl font-semibold">{data?.title}</h1>
            <p className="text-lg text-gray-400 border-gray-600 py-7">
              {data?.bio}
            </p>
            <div className="flex gap-3 border-b border-t py-3 border-gray-600">
              <div>
                <Image
                  alt="Profile Image"
                  className="rounded-full border p-1"
                  height={50}
                  src={data?.author?.profilePicture as string}
                  width={50}
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg">{data?.author?.username}</p>
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
                  </div>
                  <p className="text-xs text-gray-600">
                    {data?.author?.followers?.length} followers .{" "}
                    {formatDate(data?.createdAt)}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <div className="flex items-center gap-1">
                    <FaRegHeart
                      className="cursor-pointer text-gray-500"
                      fontSize={"1.2rem"}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <SlLike
                      className="cursor-pointer text-gray-500"
                      fontSize={"1.2rem"}
                    />
                    <span className="text-xs">{data.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SlDislike
                      className="cursor-pointer text-gray-500"
                      fontSize={"1.2rem"}
                    />
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
                src={data.images[1]}
                width={500}
              />
            </div>
            <p className="py-3">{data.content}</p>
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
