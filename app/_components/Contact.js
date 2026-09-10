"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { style } from "./style";
import { slideIn, fadeIn } from "./utils/motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

function Contact() {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .send(
        "service_x1gwtxs",
        "template_gne4q17",
        {
          from_name: form.name,
          to_name: "Sharan",
          number: form.number,
          email: form.email,
          to_email: "sharansp98@gmail.com",
          message: form.message,
        },
        "cjDwO8_U8wR_xEdDe",
      )
      .then(() => {
        setIsLoading(false);
        alert("Thank You, We Will Get in touch with You Soon");
        setForm(
          {
            name: "",
            email: "",
            number: "",
            message: "",
          },
          (err) => {
            setIsLoading(false);
            console.log(err);
            alert("something went wrong, try again");
          },
        );
      });
  };
  return (
    <footer
      className="max-w-7xl mx-auto px-6 md:px-12  py-12 xl:mt-12 "
      id="contact"
    >
      <section className="bg-gray-950 rounded-3xl">
        <div className="rounded-md  px-4  grid  grid-cols-1 md:grid-cols-2 gap-10 items-center justify-between overflow-hidden space">
          <motion.div
            className="order-2 md:order-1 bg-black-100 p-8 rounded-2xl"
            whileInView={{ x: [100, 0], opacity: [0, 100] }}
            transition={{ duration: 0.3, type: "tween" }}
          >
            <p className={`${style.sectionSubText} text-white/70`}>
              Let&apos;s Work Together
            </p>
            <h3 className={`${style.sectionHeadText}`}>Contact.</h3>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-8"
            >
              <label className="flex flex-col" htmlFor="">
                <span className="text-white font-medium mb-4">Your Name</span>
                <input
                  type="text"
                  name="name"
                  className="bg-gray-900 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's Your Name"
                  required
                />
              </label>
              <label className="flex flex-col" htmlFor="">
                <span className="text-white font-medium mb-4">
                  Your Phone Number?
                </span>
                <input
                  type="text"
                  name="number"
                  className="bg-gray-900 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  value={form.number}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                />
              </label>
              <label className="flex flex-col" htmlFor="">
                <span className="text-white font-medium mb-4">
                  Your Email id?
                </span>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-900 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's Your Name"
                  required
                />
              </label>
              <label className="flex flex-col" htmlFor="">
                <span className="text-white font-medium mb-4">
                  What do you want to say?
                </span>
                <textarea
                  rows="3"
                  name="message"
                  className="bg-gray-900 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe Your Project..."
                  required
                />
              </label>
              <button
                className="bg-gray-900 py-3 px-8 outline-none w-fit text-white shadow-md shadow-primary rounded-xl"
                type="submit"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>
          </motion.div>
          <motion.div
            className=" mt-12  order-1 md:order-2"
            whileInView={{ x: [-100, 0], opacity: [0, 100] }}
            transition={{ duration: 0.3, type: "tween" }}
          >
            <div className="">
              <video
                className="w-100 brightness-110"
                src="/assets/brave_Vb7ihTWMLU.mp4"
                autoPlay
                muted
                loop
              ></video>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="flex flex-col items-center justify-center md:flex-row text-gray-800">
        <motion.p
          className="   py-4  text-[16px] w-full text-gray-800 leading-[30px]"
          variants={fadeIn("", "", 0.1, 1)}
        >
          &copy; all rights reserved {new Date().getFullYear()} by Sharpxstudios
        </motion.p>
        <div className="flex space-x-4 pe-2">
          <Link
            href="https://www.instagram.com/sharpxstudios"
            target="_blank"
            className="ease-linear duration-200 group"
          >
            <FaInstagram className="h-6 w-6 hover:text-indigo-600 group-hover:scale-105  text-indigo-900" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/sharpxstudios"
            target="_blank"
            className="ease-linear duration-200 group"
          >
            <FaLinkedin className="h-6 w-6 hover:text-indigo-600 group-hover:scale-105  text-indigo-900" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
