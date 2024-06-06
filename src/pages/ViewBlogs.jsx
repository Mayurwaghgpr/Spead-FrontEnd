import React, { useState, useEffect,useContext } from "react";
import "./viewblogs.css";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { fetchDataByTopic } from "../handlers/PostsHandler";
import Usercontext from "../context/UserContext";
import image from "../assets/siginimage.png";

function Viewblogs() {
  const{user,isLogin,logout} = useContext(Usercontext)
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState("General");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataByTopic(topic);
      // if (result.response.status === 404) {

      // }
      console.log(result)
      setData(result);
    };
    fetchData();
  }, [topic]);


  return (
    <div className="h-[100vh] text-black">
      <header className="flex justify-between border-b flex-col">
        <nav className="flex items-center w-full h-[4rem] justify-between">
          <h1 className="text-2xl">{"{...Spread}"}</h1>
          <div className="pr-5 flex justify-center items-center gap-5">
            <Link className=" text-slate-400" to="/write">
              write
              <i className="bi bi-pencil-square text-2xl"></i>
            </Link>
            {isLogin ? <div className="relative inline-block text-left">
              <div>
                <button onClick={() => setIsMenuOpen(prevState => !prevState)} type="button" className="inline-flex h-[50px] w-[50px] justify-center gap-x-1.5 p-1 bg-white text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-full" id="menu-button" aria-expanded="true" aria-haspopup="true">
                  <img className=" rounded-full w-full h-full" src={image} alt={user.name} />
                </button>
              </div>
              {isMenuOpen && <div className="absolute right-0 z-10 mt-2 min-w-[150px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                  <p className="text-gray-700  border-b px-4 py-2 text-sm "> {user.email}</p>
                  <Link className="text-gray-700 block px-4 border-b py-2 text-sm" to="/my-profile">Profile</Link>
                  <a href="#" className="text-gray-700 block px-4 border-b py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Support</a>
                  <a href="#" className="text-gray-700 block px-4 py-2 border-b text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">License</a>
                  <button onClick={() => { logout() }} type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                </div>
              </div>}
            </div> : <Link to="/Login" className="text-decoration-none z-10 login p-2 rounded-border-1px">Login</Link>}
          </div>
        </nav>
      </header>
      <main className="grid sm:grid-cols-10 sm:grid-rows-10 gap-1 h-screen">
        <aside className="sm:col-span-2 sm:row-span-full col-span-0 h-screen p-3 hidden text-xl border-e lg:block">
          <div className="flex flex-col text-start gap-2">
            <h1 className="font-medium text-sm sm:text-lg">Trending topics</h1>
            <div className="flex justify-center items-center flex-col">
              <ul className="flex justify-center gap-2">
                {["React", "IT", "node.js"].map((t) => (
                  <li key={t} className="border text-sm rounded-2xl border-sky-100 bg-sky-50 px-2 py-0.5 dark:text-black dark:border-sky-500/15 dark:bg-sky-500/10">
                    <NavLink to="/Blogs" className="t-btn" onClick={() => setTopic(t)}>
                      <span>{t}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        <section className="grid grid-cols-10 h-screen lg:col-start-4 lg:col-span-6 col-span-full border-b">
          <ul className="flex border-b pl-5 pt-4 pb-2 h-[3rem] justify-start items-center gap-3 col-span-10 lg:col-span-9 row-span-1">
            <li className="rounded-full capitalize">
              <Link to="/Blogs" className="t-btn" onClick={() => setTopic("General")}>Your Feed</Link>
            </li>
            <li>
              <Link to="#">Specialization</Link>
            </li>
          </ul>
          <div className="relative col-span-full lg:col-span-9 snap-center overflow-y-scroll">
            <Outlet context={data} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Viewblogs;
