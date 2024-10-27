"use client";
import { useState } from "react";
import FetchAllPosts from "@/src/components/UI/newsfeed/FetchAllPosts";
import Filter from "@/src/components/UI/newsfeed/Filter";
import SideInfo from "@/src/components/UI/newsfeed/SideInfo";

const NewsFeedPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div>
      <div className="flex items-start gap-5 mb-10">
        <div className="lg:w-[70%] w-full mx-auto">
          <Filter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            category={category}
            setCategory={setCategory}
          />
          <FetchAllPosts searchTerm={searchTerm} category={category} />
        </div>
        <div className="flex-1 sticky top-16">
          <SideInfo />
        </div>
      </div>
    </div>
  );
};

export default NewsFeedPage;
