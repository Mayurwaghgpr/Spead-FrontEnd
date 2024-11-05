import React, {
  useState,
  useRef,
  memo,
  Suspense,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileIcon from "/ProfOutlook.png";
import useClickOutside from "../../hooks/useClickOutside";
import ProfileButton from "../ProfileButton";
// import useScrollDirection from "../../hooks/useScrollDirection"; // Import the custom hook
import LoginMenu from "./loginMenu";

const ConfirmationBox = React.lazy(
  () => import("../otherUtilityComp/ConfirmationBox")
);

import SearchBar from "../homeComp/searchBar";

function MainNavBar() {
  // const { NavetransformY } = useScrollDirection();
  const location = useLocation();
  const dispatch = useDispatch();
  const loginMenuRef = useRef();
  const searchRef = useRef();

  const { confirmBox, ThemeMode } = useSelector((state) => state.ui);
  const { isLogin, user } = useSelector((state) => state.auth);

  const { isMenuOpen, setIsMenuOpen, isSearchBar, setSearchBar } =
    useClickOutside(loginMenuRef, searchRef);

  return (
    <header
      className={`fixed top-0  transform-all duration-300 ease-in-out border-b bg-white  border-inherit dark:border-[#383838] ${
        !isLogin ? " bg-opacity-50 backdrop-blur-lg" : "dark:bg-[#222222]"
      } w-full z-40`}
    >
      <nav className="relative w-full z-10 py-3 px-7 sm:px-20 lg:px-28">
        <div className="flex items-center justify-between w-full m-auto">
          <div className="py-1">
            <Link to="/" className="font-medium sm:text-2xl lg:text-3xl">
              Spread
            </Link>
          </div>
          <div className="flex gap-8 justify-end items-center sm:w-full font-light">
            {location.pathname === "/write" && isLogin && (
              <Link
                to={"/write/publish"}
                className="bg-sky-100 dark:bg-gray-800 px-3 py-1 text-sm rounded-3xl"
              >
                Publish
              </Link>
            )}
            {location.pathname === "/" && isLogin && (
              <div
                ref={searchRef}
                className="flex sm:justify-end w-full sm:items-center items-start"
              >
                <SearchBar
                  className={`sm:flex flex-col hidden justify-center items-center gap-1 transition-all duration-700 ease-linear bg-gray-100 rounded-full ${
                    isSearchBar
                      ? "w-full md:w-[300px] lg:w-[400px] opacity-100"
                      : "w-0 opacity-0"
                  }`}
                  disable={false}
                  isSearchBar={isSearchBar}
                />

                <button
                  className={`transition-all cursor-pointer z-20 duration-100 delay-200 ease-in ${
                    isSearchBar ? "opacity-0 cursor-default " : "opacity-100 "
                  }`}
                  onClick={() => setSearchBar(true)}
                  disabled={isSearchBar}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            )}

            {location.pathname !== "/write" &&
              location.pathname !== "/profile" &&
              isLogin && (
                <Link
                  className="text-xl sm:block hidden"
                  to="/write"
                  tabIndex="-1"
                  title="Write"
                >
                  <i class="bi bi-feather"></i>
                </Link>
              )}
            {isLogin && (
              <div className="relative sm:text-xl font-thin">
                <i className="bi bi-bell"></i>
                <span className="absolute top-0 flex h-3 w-3 -right-1">
                  <span className="animate-ping absolute inline-flex h-[6px] w-[6px] rounded-full bg-slate-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-slate-500"></span>
                </span>
              </div>
            )}
            {isLogin ? (
              <div className="relative text-left" ref={loginMenuRef}>
                <ProfileButton
                  className={` box-content ${
                    location.pathname.startsWith("/profile")
                      ? "border-2 border-black "
                      : ""
                  }`}
                  profileIcon={profileIcon}
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
                {isMenuOpen && (
                  <LoginMenu
                    MenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                  />
                )}
              </div>
            ) : (
              <div className="flex gap-3 justify-end w-full items-center text-sm">
                <Link
                  to="/signin"
                  className="transition-colors duration-500 rounded-3xl sm:px-3 py-2"
                >
                  SignIn
                </Link>
                <Link
                  to="/signup"
                  className="border border-inherit transition-colors duration-500 rounded-full px-2 py-1"
                >
                  Start Writing
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default memo(MainNavBar);
