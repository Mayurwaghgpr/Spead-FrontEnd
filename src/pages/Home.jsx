import React from "react";
import { Link } from "react-router-dom";
import Footer from "../component/footer/Footer";

function Home() {
  return (
    <>
      <div className="flex flex-col  justify-center  items-start sm:mx-10 py-5 pl-2">
        <div className="text-center flex flex-col  justify-center items-start sm:max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Welcome to ...Spread</h1>
          <h2 className="sm:text-7xl text-4xl font-bold mb-4 break-words text-start">
            Unleash Your Stories,
            <br /> Inspire the World
          </h2>
          <p className="sm:text-xl mb-2 break-words text-start">
            Where you can read and write inspiring stories.
          </p>
          <p className="sm:text-lg mb-4 text-start">
            Join our community of writers and share your stories with a wider
            audience.
          </p>
          <div className="w-full flex sm:px-5">
            <Link
              to="/write"
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
