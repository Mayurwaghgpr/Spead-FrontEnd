import React from "react";
import { Link } from "react-router-dom";
import Footer from "../component/footer/Footer";
import MainNavBar from "../component/header/MainNavBar";
import image from "../assets/Dashboard.png";
import PostPreview from "../component/postsComp/PostPreview";
import SearchBar from "../component/searchBar";
import ContentBoxSection from "../component/homeComp/ContentBoxSection";
function Home() {
  return (
    <>
      <section className="flex transition-all duration-1000 flex-col justify-center items-center h-full  text-center w-full  px-3  break-words ">
        <h1 className="sm:text-2xl  text-lg  mb-4">Welcome to ...Spread</h1>
        <h2 className="sm:text-4xl text-2xl font-bold mb-4  ">
          Unleash Your Stories,Inspire the World
        </h2>
        <p className="sm:text-xl text-sm mb-2 ">
          Where you can read and write inspiring stories.
        </p>
        <p className="sm:text-lg text-xs mb-4">
          Join our community of writers and share your stories with a wider
          audience.
        </p>
        <div className="w-full flex justify-center  sm:px-5">
          <Link
            to="/write"
            className="bg-sky-300 text-white py-2 px-4 rounded hover:bg-sky-400"
          >
            Get Started
          </Link>
        </div>
      </section>
      <ContentBoxSection
        headerClass={
          "  text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium px-4 "
        }
        className={"max-w-[950px] h-"}
      >
        {" "}
        <div className="absolute   shadow-md sm:h-[500px] h-[80%] flext justify-center items-center rounded-2xl  w-full max-w-[800px]  bg-white">
          <img
            className=" object-fill object-center h-full w-full rounded-2xl"
            src={image}
            alt=""
          />
          <div className="absolute flex justify-between items-center  text-gray-300 font-light  bg-white border h-full max-h-10 w-full max-w-[400px]  transition-all duration-500  hover:scale-105 rounded-xl sm:top-20 top-0 sm:-right-20 shadow">
            <SearchBar className={"w-full h-full"} />
          </div>
        </div>
      </ContentBoxSection>

      {/* <ContentBoxSection>
        {" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          nemo voluptatem autem porro non officiis distinctio dolorum illo.
          Fugit vero quos in esse explicabo dolorem quia placeat error enim
          magni.
        </div>
      </ContentBoxSection>

      <ContentBoxSection>
        {" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          nemo voluptatem autem porro non officiis distinctio dolorum illo.
          Fugit vero quos in esse explicabo dolorem quia placeat error enim
          magni.
        </div>
      </ContentBoxSection> */}

      <Footer />
    </>
  );
}

export default Home;
