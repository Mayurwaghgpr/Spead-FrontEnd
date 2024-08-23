import React from "react";
import { Link } from "react-router-dom";
import Footer from "../component/footer/Footer";
import image from "../assets/Dashboard.png";

import SearchBar from "../component/searchBar";
function Home() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return (
    <>
      <main className="relative ">
        <div className="flex transition-all duration-1000   justify-center  items-center mt-20 px-10 sm:py-24 sm:mb-1 mb-16  py-10 text-start w-full h-full ">
          <div className=" container flex flex-col  px-3 sm:w-1/2 h-full justify-center  break-words ">
            {" "}
            <h1 className="sm:text-2xl  text-lg  mb-4">...Spread</h1>
            <h2 className="sm:text-5xl text-2xl font-[440] mb-2  ">
              Unleash Your Stories,Inspire the World
            </h2>
            <p className="sm:text-xl text-sm mb-2 ">
              Where you can read and write inspiring stories. Join our community
              of writers and share your stories with a wider audience.
            </p>
            <div className="w-full flex justify-center sm:px-5">
              <Link
                to="/write"
                className="  py-2 px-4 rounded-full hover:bg-gray-200 border-2  z-0  transition-all duration-300 "
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className={"w-full sm:px-15 lg:px-20 flex items-start mb-20 "}>
          <article
            id="homeArtical"
            className={` flex sm:justify-evenly  items-center   w-full  flex-col h-full rounded-xl`}
          >
            <div
              className={` text-center flex justify-center  items-center w-[80%] `}
            >
              <div className="w-full  text-center font-[440] h-full flex flex-col gap-2 items-end mt-24 mb-10 sm:items-center break-words text-2xl sm:text-5xl sm:px-8  ">
                <h1>Explore stories and new ideas</h1>

                <p className="text-xs">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti possimus labore facere repudianda e animi.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 h-full  justify-center items-center w-full px-3 z-0  rounded-e-xl">
              <SearchBar className={"sm:w-1/2 block"} />
              <div className="shadow-lg flext justify-center items-center rounded-xl  w-full max-w-[800px] border border-inherit  overflow-hidden  ">
                <img
                  className=" sm:object-cover  object-center  w-full  rounded-xl"
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
