"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiOutlineStar } from "react-icons/hi2";

const MovingText = () => {
  const texts = [
    "Web Development",
    "UX UI Design",
    "AI Automation",
    "Digital Marketing",
    "AEO / GEO",
  ];

  return (
    <div className="overflow-hidden bg-indigo-950 text-white dark:bg-gray-50 lg:py-10">
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* First set */}
        <div className="flex items-center">
          {texts.map((text, index) => (
            <React.Fragment key={index}>
              <HiOutlineStar className="mx-6 h-8 w-8 shrink-0 text-indigo300 opacity-75 md:h-10 md:w-10" />

              <h2 className="font-jakarta text-4xl font-bold md:text-6xl">
                {text}
              </h2>
            </React.Fragment>
          ))}
        </div>

        {/* Duplicate set for seamless scrolling */}
        <div className="flex items-center">
          {texts.map((text, index) => (
            <React.Fragment key={`duplicate-${index}`}>
              <HiOutlineStar className="mx-6 h-8 w-8 shrink-0 text-white md:h-10 md:w-10" />

              <h2 className="font-jakarta text-4xl font-bold md:text-6xl">
                {text}
              </h2>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MovingText;
