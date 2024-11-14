"use client";
import { useRouter } from "next/navigation";

import { useGetAllPostQuery } from "@/src/redux/features/post/postApi";
import PostCard from "@/src/components/UI/newsfeed/PostCard";
import { IPost } from "@/src/types";

const PostFetch = ({ categories }: { categories: string }) => {
  const { data: getAll, isLoading } = useGetAllPostQuery({});
  const router = useRouter();

  const slicedPosts = getAll?.data?.slice(7) || [];

  if (isLoading) {
    return (
      <div className="space-y-8 pt-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="text-gray-900 dark:text-white w-full md:w-3/4 lg:w-full overflow-hidden transform transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 flex-shrink-0 mb-4 md:mb-0">
                <div className="relative h-64 md:h-full min-h-[250px] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent animate-shimmer" />
                </div>
              </div>

              <div className="md:ml-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                      <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                      <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4 animate-pulse" />
                    <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded-md w-1/2 animate-pulse" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                  </div>

                  <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                      <div className="flex items-start space-x-2">
                        <div className="space-y-1">
                          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                          <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                        </div>
                        <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                  </div>
                  <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-8">
      {slicedPosts.map((post: IPost) => (
        <PostCard key={post._id} {...post} />
      ))}
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-600 mx-auto text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          onClick={() => router.push(`/filter?categories=${categories}`)}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default PostFetch;
