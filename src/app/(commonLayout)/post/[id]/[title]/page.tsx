"use client";

import { useState } from "react";
import Image from "next/image";
import { FaComment, FaRegHeart, FaRegShareSquare } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import { IoIosSend } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import { Spinner } from "@nextui-org/spinner";

import GHForm from "@/src/components/form/GHForm";
import TTextarea from "@/src/components/form/GHTextArea";
import { commentValidationSchema } from "@/src/schema/comment.schema";
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
import { useCreateCommentMutation } from "@/src/redux/features/comment/commentApi";
import CommentCard from "@/src/components/UI/newsfeed/CommentCard";
import AuthenticationModal from "@/src/components/AuthenticationModal";

const BlogsDetailsPage = ({
  params,
}: {
  params: { id: string; title: string };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const { data: getSinglePostData, isLoading } = useGetSinlePostQuery({
    _id: params.id,
  });

  const [followAndUnfollow, { isLoading: followLoading }] =
    useFollowAndUnfollowUserMutation();
  const [postComment, { isLoading: commentLoading }] =
    useCreateCommentMutation();
  const [upAndDownVote] = useUpvoteDownvoteMutation();
  const { data: getMe } = useGetMeQuery({ _id: user?.userId });
  const [favouritePost, { isLoading: favouriteLoading }] =
    useFavouritePostMutation();

  const data = getSinglePostData?.data as IPost | undefined;
  const postFavId =
    getMe?.data?.favourite?.map((item: { _id: any }) => item._id) || [];
  const postUrl = `localhost:3000/newsfeed/${data?._id}`;
  const isPremiumAndNotVerified = data?.isPremium && !getMe?.data?.isVerified;
  const userId = user?.userId as string | undefined;

  const copyToClipboard = () => {
    if (postUrl) {
      navigator.clipboard.writeText(postUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const followAndUnfollowUser = async (followOwnerId: string) => {
    if (!user) {
      setIsModalOpen(true);

      return;
    }
    if (followOwnerId) await followAndUnfollow(followOwnerId);
  };

  const onSubmit = async (formData: FieldValues) => {
    if (!user) {
      setIsModalOpen(true);

      return;
    }
    if (params?.id && user?.userId) {
      const commentData = {
        ...formData,
        postId: params.id,
        userId: user.userId,
      };
      const res = await postComment(commentData);

      if ("data" in res && res.data.success) {
        toast.success("Comment added successfully");
      }
    }
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) {
    return <div className="text-center mt-8">Post not found</div>;
  }

  if (isPremiumAndNotVerified) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
        <Card className="max-w-sm">
          <CardBody className="text-center">
            <h2 className="text-3xl font-bold mb-4">Premium Content</h2>
            <p className="text-lg text-gray-400 mb-6">
              This content is exclusive to premium users. Please upgrade to
              access it.
            </p>
            <div className="flex justify-center gap-3">
              <Button
                color="primary"
                onPress={() => router.push("/subscription")}
              >
                Upgrade Now
              </Button>
              <Button
                color="secondary"
                variant="flat"
                onPress={() => router.back()}
              >
                Go Back
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl pt-10 mx-auto my-10 px-4">
        <Card className="w-full">
          <CardHeader className="flex-col items-start">
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-lg text-gray-400 mb-4">{data.bio}</p>
            {data.isPremium && (
              <Chip className="mb-4" color="warning" variant="flat">
                Premium
              </Chip>
            )}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Avatar
                  isBordered
                  color={data.author?.isVerified ? "primary" : "default"}
                  size="md"
                  src={data.author?.profilePicture}
                />
                <div>
                  <Link
                    className="font-semibold hover:underline"
                    href={`/dashboard/profile?userId=${data.author?._id}`}
                  >
                    {data.author?.username}
                  </Link>
                  <p className="text-sm text-gray-400">
                    {data.author?.followers?.length} followers ·{" "}
                    {formatDate(data.createdAt)}
                  </p>
                </div>
              </div>
              {user?.userId !== data.author?._id && (
                <Button
                  color={
                    data.author?.followers?.includes(user?.userId as string)
                      ? "default"
                      : "primary"
                  }
                  isLoading={followLoading}
                  variant="flat"
                  onPress={() =>
                    data.author?._id && followAndUnfollowUser(data.author._id)
                  }
                >
                  {data.author?.followers?.includes(user?.userId as string)
                    ? "Unfollow"
                    : "Follow"}
                </Button>
              )}
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Image
              alt="Cover Image"
              className="w-full h-[400px] object-cover rounded-lg mb-6"
              height={500}
              src={data.thumbnail || "/placeholder.png"}
              width={1000}
            />
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
              className="prose dark:prose-invert max-w-full"
            />
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4">
                <Tooltip content="Like">
                  <Button
                    variant="light"
                    onPress={() => handleVote(data._id, "upvote")}
                  >
                    <div className="flex items-center gap-2">
                      <SlLike
                        className={
                          data.upvotes?.includes(userId!) ? "text-primary" : ""
                        }
                      />
                      {data.upvotes?.length || 0}
                    </div>
                  </Button>
                </Tooltip>

                <Tooltip content="Dislike">
                  <Button
                    variant="light"
                    onPress={() => handleVote(data._id, "downvote")}
                  >
                    <div className="flex items-center gap-2">
                      <SlDislike
                        className={
                          data.downvotes?.includes(userId!) ? "text-danger" : ""
                        }
                      />
                      {data.downvotes?.length || 0}
                    </div>
                  </Button>
                </Tooltip>

                <Tooltip content="Comments">
                  <Button variant="light">
                    <div className="flex items-center gap-2">
                      <FaComment />
                      {data.commentsCount || 0}
                    </div>
                  </Button>
                </Tooltip>
              </div>

              <div className="flex gap-4">
                <Tooltip
                  content={
                    postFavId.includes(data._id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Button
                    isLoading={favouriteLoading}
                    variant="light"
                    onPress={() => handleFavouritePost(data._id)}
                  >
                    <div className="flex items-center gap-2">
                      <FaRegHeart
                        className={
                          postFavId.includes(data._id) ? "text-danger" : ""
                        }
                      />
                    </div>
                  </Button>
                </Tooltip>

                <Tooltip content={copied ? "Copied!" : "Share"}>
                  <Button variant="light" onPress={copyToClipboard}>
                    <div className="flex items-center gap-2">
                      <FaRegShareSquare />
                    </div>
                  </Button>
                </Tooltip>
              </div>
            </div>
          </CardFooter>
        </Card>

        {data.comments && data.comments.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold">Comments</h2>
            </CardHeader>
            <CardBody className="max-h-[500px] overflow-y-auto">
              {data.comments.map((comment, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <CommentCard comment={comment} />
                  {index < data.comments.length - 1 && (
                    <Divider className="my-4" />
                  )}
                </div>
              ))}
            </CardBody>
          </Card>
        )}

        <Card className="mt-8">
          <CardBody>
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
                className="mt-4"
                color="primary"
                isLoading={commentLoading}
                startContent={<IoIosSend />}
                type="submit"
              >
                Post Comment
              </Button>
            </GHForm>
          </CardBody>
        </Card>
      </div>
      <AuthenticationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default BlogsDetailsPage;
