"use client";

import { Spinner } from "@nextui-org/spinner";

import PostCard from "./PostCard";

import { IPost } from "@/src/types";
import { useGetAllPostQuery } from "@/src/redux/features/post/postApi";

const FetchAllPosts = ({
  searchTerm,
  category,
}: {
  searchTerm: string;
  category: string;
}) => {
  const { data: allPosts, isLoading } = useGetAllPostQuery({});

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      ) : (
        allPosts?.data?.map((item: IPost) => (
          <div key={item._id}>
            <PostCard {...item} />
          </div>
        ))
      )}
    </div>
  );
};

export default FetchAllPosts;
