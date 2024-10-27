import { useState } from "react";
import Image from "next/image";
import { SlLike, SlDislike } from "react-icons/sl";
import { BsCalendar2Date, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaCheckCircle, FaComment, FaRegComment } from "react-icons/fa";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Tooltip } from "@nextui-org/tooltip";
import { Divider } from "@nextui-org/divider";

import AuthenticationModal from "../../AuthenticationModal";

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
  searchTerm: string;
  category: string;
}

const PostCard = ({ post, searchTerm, category }: IPostCard) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    if (!user) {
      setIsModalOpen(true);

      return;
    }
    if (followOwnerId) {
      await followAndUnfollow(followOwnerId);
    }
  };

  const handleFavouritePost = async (id: string) => {
    if (!user) {
      setIsModalOpen(true);

      return;
    }
    await favouritePost(id);
  };

  const upvotes = async (id: string) => {
    if (!user) {
      setIsModalOpen(true);

      return;
    }
    await upAndDownVote({ _id: id, type: "upvote" });
  };

  const downvotes = async (id: string) => {
    if (!user) {
      setIsModalOpen(true);

      return;
    }
    await upAndDownVote({ _id: id, type: "downvote" });
  };

  const userId = user?.userId as string | undefined;

  // console.log(category)
  // console.log(searchTerm)

  return (
    <>
      <Card className="w-full border dark:border-none bg-content1 mb-7 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <CardBody className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar
                    isBordered
                    color={post?.author?.isVerified ? "primary" : "default"}
                    size="sm"
                    src={post?.author?.profilePicture as string}
                  />
                  <div>
                    <Link
                      className="text-foreground font-semibold hover:underline"
                      href={`/dashboard/profile?userId=${post?.author?._id}`}
                    >
                      {post.author.username}
                    </Link>
                    {post?.author?.isVerified && (
                      <Tooltip content="Verified User">
                        <FaCheckCircle
                          className="text-primary ml-1 inline-block"
                          size={12}
                        />
                      </Tooltip>
                    )}
                  </div>
                  {post.isPremium && (
                    <Chip
                      color="default"
                      startContent={<span className="text-warning">★</span>}
                      variant="flat"
                    >
                      Premium
                    </Chip>
                  )}
                </div>
                {user?.userId !== post.author?._id && (
                  <Button
                    color={
                      post.author?.followers?.includes(user?.userId as string)
                        ? "default"
                        : "primary"
                    }
                    isLoading={followLoading}
                    size="sm"
                    variant="flat"
                    onPress={() => followAndUnfollowUser(post?.author?._id)}
                  >
                    {post.author?.followers?.includes(user?.userId as string)
                      ? "Unfollow"
                      : "Follow"}
                  </Button>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-3 text-foreground hover:text-primary transition-colors">
                <Link href={`/newsfeed/${post._id}`}>{post.title}</Link>
              </h2>
              <div className="mb-3">
                <Chip color="secondary" variant="flat">
                  {post.category}
                </Chip>
              </div>
              <p className="text-foreground-600 mb-4 line-clamp-3">
                {post.bio}
              </p>
              <div className="flex items-center gap-4 text-small text-foreground-500">
                <Tooltip content={formatDate(post.createdAt)}>
                  <div className="flex items-center">
                    <BsCalendar2Date className="mr-1" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </Tooltip>
                <Divider className="h-4" orientation="vertical" />
                <Tooltip content="Upvotes">
                  <div className="flex items-center">
                    <SlLike className="mr-1" />
                    <span>{post?.upvotes?.length}</span>
                  </div>
                </Tooltip>
                <Tooltip content="Downvotes">
                  <div className="flex items-center">
                    <SlDislike className="mr-1" />
                    <span>{post?.downvotes?.length}</span>
                  </div>
                </Tooltip>
                <Tooltip content="Comments">
                  <div className="flex items-center">
                    <FaRegComment className="mr-1" />
                    <span>{post.commentsCount}</span>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="w-full md:w-1/3 relative">
              <Image
                alt="Blog Image"
                className="w-full h-full object-cover"
                layout="fill"
                src={post?.thumbnail}
              />
              <div className="absolute top-2 right-2">
                <Tooltip
                  content={
                    postFavId?.includes(post?._id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Button
                    isIconOnly
                    className="bg-background/60 backdrop-blur-md"
                    color={
                      postFavId?.includes(post?._id) ? "danger" : "primary"
                    }
                    isLoading={favouriteLoading}
                    size="sm"
                    variant="flat"
                    onPress={() => handleFavouritePost(post._id)}
                  >
                    {postFavId?.includes(post?._id) ? (
                      <BsBookmarkFill />
                    ) : (
                      <BsBookmark />
                    )}
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex justify-between items-center px-6 py-3 bg-content2 border-t border-divider">
          <div className="flex gap-2">
            <Button
              color={post?.upvotes?.includes(userId!) ? "success" : "default"}
              size="sm"
              startContent={<SlLike />}
              variant="flat"
              onPress={() => upvotes(post._id)}
            >
              Upvote
            </Button>
            <Button
              color={post?.downvotes?.includes(userId!) ? "danger" : "default"}
              size="sm"
              startContent={<SlDislike />}
              variant="flat"
              onPress={() => downvotes(post._id)}
            >
              Downvote
            </Button>
          </div>
          <Button
            as={Link}
            color="primary"
            href={`/newsfeed/${post._id}`}
            size="sm"
            startContent={<FaComment />}
            variant="flat"
          >
            Comment
          </Button>
        </CardFooter>
      </Card>

      <AuthenticationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default PostCard;
