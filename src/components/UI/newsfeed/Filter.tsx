/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import GHForm from "../../form/GHForm";
import GHInput from "../../form/GHInput";

const tabs = [
  "Flowers",
  "Vegetables",
  "Herbs",
  "Shrubs",
  "Trees",
  "Succulents & Cacti",
  "Indoor Plants",
  "Garden Tools",
  "Fertilizers",
  "Pots & Planters",
  "Seeds",
  "Watering Systems",
];

export default function Component() {
  const [activeTab, setActiveTab] = useState("JavaScript");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const tabsBoxRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (tabsBoxRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsBoxRef.current;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);

    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (tabsBoxRef.current) {
      tabsBoxRef.current.scrollLeft += direction === "left" ? -340 : 340;
      handleScroll();
    }
  };

  const startDragging = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - tabsBoxRef.current!.offsetLeft);
    setScrollLeft(tabsBoxRef.current!.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const drag = (e: React.MouseEvent) => {
    if (!isDragging || !tabsBoxRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabsBoxRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    tabsBoxRef.current.scrollLeft = scrollLeft - walk;
    handleScroll();
  };

  const onsubmit = () => {};

  return (
    <>
      <div className="lg:w-1/2 md:w-1/2 mx-auto my-5">
        <GHForm onSubmit={onsubmit}>
          <GHInput label="Search" name="search" type="search" />
        </GHForm>
      </div>
      <div className="w-full rounded-md mb-10">
        <div className="relative w-full rounded-2xl p-8 overflow-hidden dark:border-none border dark:bg-slate-800 shadow-lg">
          {showLeftArrow && (
            <div className="absolute px-3 -left-3 top-0 h-full flex items-center z-50 pl-4">
              <FaChevronLeft
                className="w-10 h-10 text-white cursor-pointer bg-gray-800 rounded-full p-2 shadow-md transition duration-300 hover:bg-gray-700"
                onClick={() => scroll("left")}
              />
            </div>
          )}
          <div
            ref={tabsBoxRef}
            className={`flex gap-3 overflow-x-auto scroll-smooth ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            } scrollbar-hide`}
            role="list"
            onMouseDown={startDragging}
            onMouseLeave={stopDragging}
            onMouseMove={drag}
            onMouseUp={stopDragging}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`shrink-0 py-3 px-5 rounded-full text-sm md:text-base whitespace-nowrap transition-colors select-none
                ${
                  activeTab === tab
                    ? "bg-black text-white shadow-lg"
                    : "dark:bg-slate-900 bg-gray-500 text-white hover:bg-gray-800"
                } 
                transform transition-all hover:duration-300 duration-300 ease-in-out 
                hover:scale-105`}
                onClick={() => !isDragging && setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {showRightArrow && (
            <div className="absolute right-2 top-0 h-full flex items-center z-10 pl-4">
              <FaChevronRight
                className="w-10 h-10 text-white cursor-pointer bg-gray-800 rounded-full p-2 shadow-md transition duration-300 hover:bg-gray-700"
                onClick={() => scroll("right")}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
