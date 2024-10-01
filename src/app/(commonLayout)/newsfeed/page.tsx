import Filter from "@/src/components/UI/newsfeed/Filter";
import PostCard from "@/src/components/UI/newsfeed/PostCard";
import SideInfo from "@/src/components/UI/newsfeed/SideInfo";
import TopNews from "@/src/components/UI/newsfeed/TopNews";

const NewsFeedPage = () => {
  return (
    <div>
      <TopNews />
      <div className="flex items-start gap-5 mb-10">
        <div className="lg:w-[70%] w-full">
          <Filter />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
        <div className="flex-1 sticky top-16">
          <SideInfo />
        </div>
      </div>
    </div>
  );
};

export default NewsFeedPage;
