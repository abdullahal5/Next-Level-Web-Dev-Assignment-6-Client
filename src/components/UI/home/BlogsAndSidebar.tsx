"use client";
import { useState } from "react";

import Categories from "./Categories";
import PostFetch from "./PostFetch";
import SideInfo from "./SideInfo";

const BlogsAndSidebar = () => {
  const [categories, setCategories] = useState("All");

  return (
    <div className="flex lg:flex-row md:flex-col flex-col">
      <div className="flex-grow lg:mr-5">
        <Categories categories={categories} setCategories={setCategories} />
        <PostFetch categories={categories} />
      </div>
      <div className="w-80 flex-shrink-0">
        <SideInfo />
      </div>
    </div>
  );
};

export default BlogsAndSidebar;
