import React from "react";
import { Link } from "react-router-dom";
import Footer from "../component/footer/Footer";
import image from "../assets/Dashboard.png";
import bgvideo from "../assets/107240-678130070_small.mp4";
import SearchBar from "../component/homeComp/searchBar";
import { motion } from "framer-motion";

function Home() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  return (
    <>
      <main className="relative">
        <div className="relative min-h-[40rem] flex justify-center items-center px-10 sm:py-24 sm:mb-1 py-10 text-start h-full border-inherit">
          <motion.video
            className="w-full absolute object-cover object-center h-full left-0 top-0 -z-1"
            id="background-video"
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <source src={bgvideo} type="video/mp4" />
          </motion.video>

          <div className="container flex flex-col px-3 xl:w-1/2 lg:w-[60%] justify-center break-words relative border-inherit">
            <div className="bg-white p-7 rounded-lg bg-opacity-50 backdrop-blur-lg flex flex-col gap-2 border-inherit">
              <h1 className="xl:text-2xl lg:text-xl text-lg mb-4">...Spread</h1>
              <h2 className="xl:text-5xl lg:text-4xl sm:text-3xl text-2xl font-[440]">
                Unleash Your Stories, Inspire the World
              </h2>
              <p className="sm:text-xl text-sm">
                Where you can read and write inspiring stories. Join our
                community of writers and share your stories with a wider
                audience.
              </p>
              <div className="w-full flex justify-center py-4 border-inherit">
                <Link
                  to="/write"
                  className="sm:py-2 px-4 text-inherit text-sm rounded-full bg-gray-700 border z-0 transition-all duration-300 border-inherit"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={"w-full sm:px-15 lg:px-20 min-h-[40rem] flex items-start"}
        >
          <article
            id="homeArtical"
            className={`flex sm:justify-evenly items-center w-full flex-col h-full rounded-xl`}
          >
            <div
              className={`text-center flex justify-center items-center w-[80%]`}
            >
              <div className="w-full text-center font-[440] h-full flex flex-col gap-2 items-end mt-10 mb-10 sm:items-center break-words text-2xl sm:text-5xl sm:px-8 z-30">
                <h1>Explore stories and new ideas</h1>

                {/* <p className="text-xs">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti possimus labore facere repudianda e animi.
                </p> */}
              </div>
            </div>
            <div className="flex flex-col gap-3 h-full justify-center items-center w-full px-3 z-0 rounded-e-xl">
              <SearchBar className={"sm:w-1/2 block"} />
              <div className="shadow-lg flext justify-center items-center rounded-xl w-full max-w-[800px] border border-inherit overflow-hidden">
                <img
                  className="sm:object-cover object-center w-full rounded-xl"
                  src={image}
                  alt=""
                />
              </div>
            </div>
          </article>
        </div>

        {/* <ContentBoxSection className="w-full bg-gray-900 h-screen"></ContentBoxSection> */}
      </main>
      <Footer />
    </>
  );
}

export default Home;
