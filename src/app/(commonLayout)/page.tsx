import HomeBanner from "@/src/components/UI/home/Banner";
import TrendingBlogCards from "@/src/components/UI/home/Trending";
import Advertisement from "@/src/components/UI/home/Advertisement";
import BlogsAndSidebar from "@/src/components/UI/home/BlogsAndSidebar";

const Banner = () => {
  return (
    <>
      <HomeBanner />
      <div className="mx-auto max-w-7xl px-2">
        <div>
          <TrendingBlogCards />
          <hr className="my-10 max-w-7xl mx-auto border-t border-gray-300 dark:border-gray-600" />
          <BlogsAndSidebar />
        </div>
        <Advertisement />
      </div>
    </>
  );
};

export default Banner;
