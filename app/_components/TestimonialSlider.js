"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { motion } from "framer-motion";
import { EffectCards, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function TestimonialSlider() {
  const testimonials = [
    {
      rating: "4.8",
      text: "The team understood what we were trying to achieve and turned it into a website that feels professional, modern, and true to our brand. Communication was smooth throughout the project.",
      name: "Mithun",
      role: "Trinetra",
      image: "/assets/avatars/image-1.jpg",
    },
    {
      rating: "5.0",
      text: "We wanted a stronger online presence without losing the personality of our restaurant. The team made the process simple and delivered a website that represents our brand beautifully.",
      name: "Vivek",
      role: "1947 Restaurant",
      image: "/assets/avatars/image-3.jpg",
    },
    {
      rating: "4.9",
      text: "From the initial discussions to the final launch, the team was responsive and thoughtful. They took the time to understand our requirements and delivered a polished digital experience.",
      name: "Sakshi Singh",
      role: "Project Manager",
      image: "/assets/avatars/image-2.jpg",
    },
    {
      rating: "4.8",
      text: "What stood out was their ability to combine design with usability. The final product looks great, but more importantly, it is easy for our customers to navigate and interact with.",
      name: "Neha Patel",
      role: "Product Lead",
      image: "/assets/avatars/image-4.jpg",
    },
    {
      rating: "4.7",
      text: "The team brought a clear process to the project and was open to feedback at every stage. The result was a clean, professional website that gives our business a much stronger digital presence.",
      name: "Ravi Nair",
      role: "Business Owner",
      image: "/assets/avatars/image-5.jpg",
    },
  ];

  return (
    <motion.div
      whileInView={{ x: [100, 0], opacity: [0, 50, 100] }}
      transition={{ duration: 0.3 }}
      className="flex justify-center items-center "
    >
      <Swiper
        effect={"cards"}
        grabCursor={true}
        autoplay={{ delay: 2000 }} // Auto slide every 3 seconds
        modules={[EffectCards, Autoplay]}
        className="mySwiper w-60  md:w-80 h-92 overflow-ellipsis"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col dark:bg-white  border-none bg-gray-950 text-white dark:text-gray-900 rounded-xl "
          >
            <div className="p-6">
              <div className="flex items-center text-2xl font-bold">
                <span className="text-3xl">{testimonial.rating}</span>
                <span className="text-yellow-400 ml-1 text-sm">⭐</span>
              </div>
              <p className="text-gray-500 text-[14px] font-medium">
                (Out of 5 stars)
              </p>
              <p className="mt-6 text-lg font-bold leading-6 text-gray-300 dark:text-gray-800 mb-6">
                {testimonial.text}
              </p>
              <div className="flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="30"
                  viewBox="0 0 40 30"
                  fill="none"
                >
                  <path d="M0 0V30L15.0025 15V0H0Z" fill="#030104" />
                  <path
                    d="M24.9961 0V30L39.9986 15V0H24.9961Z"
                    fill="#030104"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full py-4 px-5   mt-4 bg-gray-50 dark:bg-gray-950">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
                <Image
                  src={testimonial.image}
                  height={60}
                  width={60}
                  alt="avatar"
                  className="h-15 w-15 object-cover rounded-full"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
