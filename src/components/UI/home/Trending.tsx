"use client";
import Image from "next/image";
import { JSX, Key } from "react";
import {
  FiClock,
  FiMessageSquare,
  FiThumbsDown,
  FiThumbsUp,
} from "react-icons/fi";
import Link from "next/link";

import { useGetAllPostQuery } from "@/src/redux/features/post/postApi";

interface Post {
  _id: string;
  image: string;
  category: string;
  title: string;
  author: {
    username: string;
  };
  date: string;
  likes: number;
  commentsCount: number;
  upvotes: [string];
  downvotes: [string];
  thumbnail: string;
  createdAt: string;
}

const ArticleCard: React.FC<Post> = ({
  _id,
  image,
  category,
  title,
  author,
  date,
  upvotes,
  downvotes,
  commentsCount,
}) => {
  return (
    <div className="relative overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <Image
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        height={250}
        src={image}
        width={400}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-green-600 text-white px-2 py-1 text-xs font-bold">
            {category}
          </span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          <Link
            className="hover:text-blue-500 hover:underline duration-300"
            href={`/post/${_id}/${title.replace(/\s+/g, "-")}`}
          >
            {title}
          </Link>
        </h2>
        <div>{author.username}</div>
        <div className="flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <FiClock className="mr-1" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <FiThumbsUp />
              <span>{upvotes?.length}</span>
            </span>
            <span className="flex items-center gap-1">
              <FiThumbsDown />
              <span>{downvotes?.length}</span>
            </span>
            <span className="flex items-center">
              <FiMessageSquare className="mr-1" />
              {commentsCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrendingArticles = () => {
  const { data: getAll, isLoading } = useGetAllPostQuery({});

  const articles =
    getAll?.data?.slice(4, 7).map((post: Post) => ({
      image: post.thumbnail || "default-image-url.jpg",
      category: post.category || "Uncategorized",
      title: post.title,
      upvotes: post.upvotes,
      downvotes: post.downvotes,
      author: post.author || { username: "Unknown" },
      date: new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      likes: post.likes || 0,
      commentsCount: post.commentsCount || 0,
    })) || [];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="w-48 h-10 mx-auto mb-8 bg-gradient-to-r from-gray-500/20 to-green-500/20 dark:from-pink-500/10 dark:to-violet-500/10 rounded-lg animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
            >
              <div className="relative h-64 bg-gray-200 dark:bg-gray-700 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent animate-shimmer" />
              </div>

              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                  <div className="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="h-6 w-full rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
                  <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
                  </div>
                  <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    <div className="w-12 h-4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    <div className="w-12 h-4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r bg-green-600">
        TRENDING
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(
          (
            article: JSX.IntrinsicAttributes & Post,
            index: Key | null | undefined,
          ) => (
            <ArticleCard key={index} {...article} />
          ),
        )}
      </div>
    </div>
  );
};

export default TrendingArticles;
