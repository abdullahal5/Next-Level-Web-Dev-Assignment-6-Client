"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSeedling, FaLeaf, FaTree } from "react-icons/fa";

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/9GR0jLX/top-view-gardening-tools-ground.jpg')",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide text-shadow-lg">
            Welcome to
            <span className="block text-green-400 mt-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Gardening Paradise
            </span>
          </h1>
        </motion.div>

        <motion.p
          animate={{ opacity: 1 }}
          className="text-xl md:text-2xl mb-12 max-w-2xl text-shadow"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Your ultimate destination for cultivating beauty, harvesting
          knowledge, and growing a greener world.
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex space-x-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {[
            { icon: FaSeedling, text: "Plant" },
            { icon: FaLeaf, text: "Nurture" },
            { icon: FaTree, text: "Grow" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center group">
              <item.icon className="text-5xl text-green-400 mb-3 group-hover:text-green-300 transition-colors duration-300" />
              <span className="text-lg font-semibold group-hover:text-green-300 transition-colors duration-300">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link
            className="bg-green-500 text-white py-4 px-10 rounded-full text-xl font-bold hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center shadow-lg hover:shadow-xl"
            href="/newsfeed"
          >
            Explore Our Blog
            <svg
              className="h-6 w-6 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                fillRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#ffffff"
            fillOpacity="1"
          />
        </svg>
      </div>
    </section>
  );
};

export default Banner;
