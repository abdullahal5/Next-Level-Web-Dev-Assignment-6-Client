"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

import PostCard from "@/src/components/UI/newsfeed/PostCard";
import { useGetAllPostQuery } from "@/src/redux/features/post/postApi";
import { IPost } from "@/src/types";

const allCategories = [
  "All",
  "Flowers",
  "Vegetables",
  "Trees",
  "Herbs",
  "Succulents",
  "Shrubs",
  "Bonsai",
  "Ornamentals",
  "Perennials",
  "Cacti",
  "Fruits",
];

const Page = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  const initialCategory = searchParams.get("categories") || "All";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [submittedCategory, setSubmittedCategory] = useState(initialCategory);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: getAll, isLoading } = useGetAllPostQuery({
    query: submittedQuery,
    categories: submittedCategory,
  });

  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedQuery(searchQuery);
    setSubmittedCategory(category);
    updateURL();
  };

  const updateURL = () => {
    const currentUrl = new URL(window.location.href);

    currentUrl.searchParams.set("search", searchQuery);
    currentUrl.searchParams.set("categories", category);
    router.push(currentUrl.toString());
  };

  const resetSearch = () => {
    setSearchQuery("");
    setCategory("All");
    setSubmittedQuery("");
    setSubmittedCategory("All");
  };

  useEffect(() => {
    setSearchQuery(initialQuery);
    setSubmittedQuery(initialQuery);
    setCategory(initialCategory);
    setSubmittedCategory(initialCategory);
  }, [initialQuery, initialCategory]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Search Posts
        </h1>
        <form
          className="flex flex-col sm:flex-row gap-4"
          onSubmit={handleSearch}
        >
          <div className="relative flex-grow">
            <input
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600"
              placeholder="Search..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                type="button"
                onClick={() => setSearchQuery("")}
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 flex items-center"
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FiFilter className="mr-2" />
              Filter
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
              type="submit"
            >
              <FiSearch className="mr-2" />
              Search
            </button>
          </div>
        </form>
        {isFilterOpen && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  className={`px-3 py-1 rounded-full text-sm ${
                    category === cat
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      ) : !getAll?.data?.length ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            No Results Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            We couldn&apos;t find any posts matching your search. Try adjusting
            filters or search terms.
          </p>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={resetSearch}
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {getAll.data.map((item: IPost) => (
            <PostCard key={item._id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

const PostCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-300 dark:bg-gray-700" />
    <div className="p-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
    </div>
  </div>
);

export default Page;
