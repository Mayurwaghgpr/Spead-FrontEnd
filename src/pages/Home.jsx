import React from "react";
import { Link } from "react-router-dom";
import Footer from "../component/footer/Footer";
import MainNavBar from "../component/header/MainNavBar";

function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center  text-center w-full mt-36 px-3 sm:mx-10 break-words ">
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
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Get Started
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
