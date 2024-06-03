import React, { useState, useEffect } from "react";
import "./viewblogs.css";
import { Link, NavLink, Outlet } from "react-router-dom";

import { fetchDataByTopic } from "../handlers/PostsHandler";
// import Cookies from 'js-cookie';
// import Login from "../pages/Login";

function Viewblogs() {
  // const [data, setData] = useState([]);
  const [Topic, setTopics] = useState("general");

  useEffect(() => {
    ;(async() => {
      const response = await fetchDataByTopic(Topic)
      console.log(response)
    })();
   
  }, [Topic]);

  return (
    <div className="h-[100vh] text-black">
      <div className="flex justify-between border-b  flex-col">
        <nav className="flex items-center w-full h-[4rem] justify-between">
          <h1 className="text-2xl">{"{...Spread}"}</h1>
          <div className="text-xl flex justify-center items-center gap-2">
            <Link to="/write">
              <i className="bi bi-pencil-square text-3xl"></i>
            </Link>
            <Link to={'/Login'} className="text-decoration-none z-10 login p-2 rounded-border-1px">Login</Link>
          </div>
        </nav>
      </div>
      <div className="grid sm:grid-cols-10 sm:grid-rows-10 gap-1 h-screen">
        <div className="sm:col-span-2 sm:row-span-full col-span-0 h-screen p-3 hidden text-xl border-e lg:block">
          <div className="flex flex-col text-center gap-2">
            <h1 className="font-medium text-sm sm:text-lg">Trending topics</h1>
            <div className="flex justify-center items-center flex-col">
              <ul className="*:rounded-full *:border *:border-sky-100 *:bg-sky-50  *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">
                <li className="rounded-full">
                  <NavLink to="/Blogs" className="t-btn" onClick={() => setTopics("Sci")}>
                    <span>Science</span>
                  </NavLink>
                </li>
                <li className="rounded-full">
                  <NavLink to="/Blogs" className="t-btn" onClick={() => setTopics("IT")}>
                    <span>IT</span>
                  </NavLink>
                </li>
                <li className="rounded-full">
                  <NavLink to="/Blogs" className="t-btn" onClick={() => setTopics("Space")}>
                    <span>Space</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-10 h-screen lg:col-start-4 lg:col-span-6 col-span-full border-b">
          <ul className="flex border-b pl-5 pt-4 pb-2 h-[3rem] justify-start items-center gap-3  col-span-10 lg:col-span-9  row-span-1">
              <li className="rounded-full capitalize ">
                <Link to="/Blogs" className="t-btn" onClick={() => setTopics("General")}>Your Feed</Link>
            </li>
            <li>
              <Link>Specialization</Link>
            </li>
            </ul>
          <div className=" relative col-span-full lg:col-span-9 snap-center  overflow-y-scroll">
            {/* <Outlet context={data} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewblogs;
