"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useGetAllPostQuery } from "@/src/redux/features/post/postApi";

interface Post {
  _id: any;
  thumbnail?: string;
  title: string;
  category: string;
  createdAt: string;
  bio: string;
}

interface Slide {
  _id: string;
  src: string;
  title: string;
  label: string;
  date: string;
  description: string;
}

const HomeBanner: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);

  const { data: getAll, isLoading } = useGetAllPostQuery({});

  const slides: Slide[] =
    getAll?.data?.slice(0, 3)?.map((post: Post) => ({
      _id: post?._id,
      src: post?.thumbnail || "default-image-url.jpg",
      title: post?.title,
      label: post?.category,
      date: new Date(post?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      description: post?.bio,
    })) || [];

  useEffect(() => {
    if (slides.length > 0) {
      const intervalId = setInterval(() => {
        setIsZoomedIn(true);
        setTimeout(() => {
          setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
          setIsZoomedIn(false);
        }, 500);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [slides.length]);

  if (isLoading) {
    return (
      <div className="relative w-full h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent animate-shimmer" />
          </div>
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-7xl mx-auto p-8 md:p-16 space-y-6">
            <div className="space-y-2">
              <div className="h-8 md:h-12 bg-gray-400 dark:bg-gray-700 rounded-lg w-3/4 animate-pulse" />
              <div className="h-8 md:h-12 bg-gray-400 dark:bg-gray-700 rounded-lg w-1/2 animate-pulse" />
            </div>

            <div className="flex items-center gap-4">
              <div className="h-6 w-20 bg-gray-400 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="h-6 w-32 bg-gray-400 dark:bg-gray-700 rounded-full animate-pulse" />
            </div>

            <div className="space-y-3 max-w-2xl">
              <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-[90%] animate-pulse" />
              <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-[75%] animate-pulse" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/90 dark:from-gray-900/90 to-transparent" />
      </div>
    );
  }

  const { title, label, date, description, _id } = slides[currentSlideIndex];

  return (
    <>
      <div className="relative w-full h-[90vh] overflow-hidden">
        {slides.map((slide, index) => (
          <Image
            key={slide.src}
            alt={`Slide Image ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              index === currentSlideIndex ? "opacity-100" : "opacity-0"
            } ${isZoomedIn ? "scale-110" : "scale-100"}`}
            layout="fill"
            priority={index === 0}
            src={slide.src}
            style={{
              WebkitMaskImage: "linear-gradient(black, transparent)",
              maskImage: "linear-gradient(black, transparent)",
            }}
          />
        ))}

        <div className="absolute inset-0 flex items-end justify-center p-8 md:p-16">
          <div className="text-black dark:text-white max-w-7xl w-full">
            <Link href={`/post/${_id}/${title?.replace(/\s+/g, "-")}`}>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 hover:underline hover:text-blue-500 duration-200">
                {title}
              </h1>
            </Link>
            <div className="flex items-center space-x-2 pb-5">
              <span className="bg-green-500 text-white font-semibold py-1 px-2 text-xs">
                {label}
              </span>
              <span className="text-black dark:text-white text-sm">{date}</span>
            </div>
            <p className="text-sm md:text-lg max-w-2xl text-black dark:text-white">
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
