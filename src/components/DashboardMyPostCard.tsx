/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prettier/prettier */
"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaComment, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

import { IMyPost } from "../types";
import { formatDate } from "../utils/dateFormat";
import { useAppSelector } from "../redux/hook";

const EnhancedDashboardMyPostCard = ({
  post,
  onPostEditModalOpen,
  onPostDeleteModalOpen,
  setSelectedPostId,
}: {
  post: IMyPost;
  onPostEditModalOpen: () => void;
  onPostDeleteModalOpen: () => void;
  setSelectedPostId: (id: string) => void;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsSettingOpen((prev) => !prev);
  const closeDropdown = () => setIsSettingOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handlePostEditModalOpen = (postId: string) => {
    if (setSelectedPostId) {
      setSelectedPostId(postId);
      onPostEditModalOpen();
    }
  };

  const handlePostDeleteModalOpen = (postId: string) => {
    if (setSelectedPostId) {
      setSelectedPostId(postId);
      onPostDeleteModalOpen();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardBody className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar
              alt={post?.author?.username}
              className="w-12 h-12 border-2 border-primary"
              src={post?.author?.profilePicture}
            />
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                {post?.author?.username}{" "}
                {post?.author?.isVerified && (
                  <>
                    <svg
                      fill="#1877F2"
                      height="1em"
                      stroke="#1877F2"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z" />
                    </svg>
                  </>
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                {formatDate(post?.createdAt)}
              </p>
            </div>
          </div>
          <div ref={dropdownRef} className="relative">
            <button
              aria-label="Open actions menu"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={toggleDropdown}
            >
              <BsThreeDots />
            </button>
            {isSettingOpen && (
              <Card className="absolute z-20 p-2 right-0 mt-2 w-40 shadow-lg rounded-md overflow-hidden">
                <ul className="text-sm space-y-2">
                  {post?.author?._id === user?.userId && (
                    <>
                      <Button
                        className="px-4 py-2 rounded-md w-full cursor-pointer"
                        variant="bordered"
                        onPress={() => handlePostEditModalOpen(post?._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="px-4 py-2 w-full rounded-md cursor-pointer"
                        variant="bordered"
                        onPress={() => handlePostDeleteModalOpen(post?._id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                  {post?.author?._id !== user?.userId && (
                    <Button
                      className="px-4 py-2 w-full cursor-pointer"
                      variant="bordered"
                      onClick={() => {
                        closeDropdown();
                      }}
                    >
                      Bookmark
                    </Button>
                  )}
                  <Button
                    className="px-4 py-2 w-full rounded-md cursor-pointer"
                    variant="bordered"
                    onClick={() => {
                      closeDropdown();
                    }}
                  >
                    Share
                  </Button>
                </ul>
              </Card>
            )}
          </div>
        </div>
        <h1 className="text-2xl mt-2 font-semibold">{post?.title}</h1>
        <p className="text-sm my-2">{post.bio}</p>
        <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-4">
          <Image
            alt="Post image"
            className="transition-transform duration-300 hover:scale-105"
            layout="fill"
            objectFit="cover"
            src={post?.thumbnail}
          />
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <div className="flex space-x-4">
            <span className="flex items-center">
              <FaThumbsUp className="mr-1" /> {post?.upvotes?.length}
            </span>
            <span className="flex items-center">
              <FaThumbsDown className="mr-1" /> {post?.downvotes?.length}
            </span>
          </div>
          <div className="flex space-x-4">
            <span className="flex items-center">
              <FaComment className="mr-1" /> {post?.commentsCount}
            </span>
            <span className="flex items-center">
              <FaShare className="mr-1" /> 0
            </span>
          </div>
        </div>
      </CardBody>
      {post?.author?._id !== user?.userId && (
        <>
          <Divider />

          <CardFooter className="p-4">
            <div className="flex justify-around w-full">
              <AnimatePresence>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="sm"
                    // variant={isLiked ? "default" : "ghost"}
                    className="w-32"
                  >
                    <FaThumbsUp />
                    Like
                  </Button>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="sm"
                    // variant={isDisliked ? "default" : "ghost"}
                    className="w-32"
                  >
                    <FaThumbsDown />
                    Dislike
                  </Button>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button className="w-32" size="sm" variant="ghost">
                    <FaComment className="mr-2" />
                    Comment
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default EnhancedDashboardMyPostCard;
