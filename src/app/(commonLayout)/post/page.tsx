"use client";
import { useState } from "react";

const NewsFeedPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div>
      <div className="flex items-start gap-5 mb-10">
        {/* <Filter
            searchTerm={searchTerm}
            setCategory={setCategory}
            setSearchTerm={setSearchTerm}
          /> */}
        {/* <div className="lg:w-[70%] w-full mx-auto">
          <FetchAllPosts category={category} searchTerm={searchTerm} />
        </div> */}
        {/* <div className="flex-1 sticky top-16">
          <SideInfo />
        </div> */}
      </div>
    </div>
  );
};

export default NewsFeedPage;
