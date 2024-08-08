import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationBox from "../otherUtilityComp/ConfirmationBox";
import { setConfirmBox, setIsConfirm } from "../../redux/slices/uiSlice";
import { setBeforeSubmit } from "../../redux/slices/postSlice";
import useLogout from "../../utils/logout";
import LoginMenu from "./loginMenu";
import profileIcon from "/vecteezy_user-profile-vector-flat-illustration-avatar-person-icon_37336395.png";
import { useQuery } from "react-query";
import { setIsLogin, setUser } from "../../redux/slices/authSlice";
import userApi from "../../Apis/userApi";
import useDebounced from "../../hooks/useDebounce";
import { fetchSearchData } from "../../Apis/publicApis";
import SearchBar from "../searchBar";

function MainNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const loginMenuRef = useRef();

  const { confirmBox } = useSelector((state) => state.ui);
  const { beforeSubmit } = useSelector((state) => state.posts);
  const { isLogin, user } = useSelector((state) => state.auth);

  const handleClickOutside = useCallback((event) => {
    if (loginMenuRef.current && !loginMenuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <header className="w-full flex justify-center border  ">
      <nav className={`flex items-center justify-between h-[4rem]  w-full `}>
        <div className="p-6 ">
          <Link to="/blogs" className="font-medium sm:text-2xl lg:text-3xl">
            ...Spread
          </Link>
        </div>
        <div className="flex gap-2 justify-end sm:w-full font-light ">
          {/* Publish new post button, displayed only when writing */}
          {location.pathname === "/write" && isLogin && (
            <div className="flex justify-center items-center">
              <button
                className="bg-sky-100 px-3 py-1 text-sm rounded-3xl"
                onClick={() => dispatch(setBeforeSubmit(true))}
              >
                Publish
              </button>
            </div>
          )}
          {/* Search Bar */}
          {location.pathname === "/blogs" && isLogin && (
            <SearchBar
              className={"lg:w-[600px] md:w-[500px] border rounded-2xl"}
              disable={false}
            />
          )}
        </div>
        <div className="flex justify-evenly items-center  w-1/3 ">
          {/* Dynamic writing panel Link */}
          {location.pathname !== "/write" &&
            location.pathname !== "/profile" && (
              <Link
                className="flex justify-center items-center text-start gap-1 text-slate-500 font-thin sm:text-2xl transition-all duration-150 hover:text-slate-800"
                to="/write"
                tabIndex="-1"
                title="Write"
              >
                {isLogin && <i className="bi bi-pen"></i>}
              </Link>
            )}
          {/* Notification bell */}
          {isLogin && (
            <div className="relative sm:text-xl  font-thin">
              <i className="bi bi-bell"></i>
              <span className="absolute top-0 flex h-3 w-3 -right-1">
                <span className="animate-ping absolute inline-flex h-[6px] w-[6px] rounded-full bg-slate-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-slate-500"></span>
              </span>
            </div>
          )}
          {/* Auth Links */}
          {isLogin ? (
            <div className="relative text-left " ref={loginMenuRef}>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                type="button"
                className="flex justify-center w-full bg-white text-sm font-semibold  text-gray-900 hover:bg-gray-50 rounded-full"
                id="menu-button"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                <img
                  className=" cursor-pointer object-cover object-top  rounded-full   h-[40px] w-[40px]"
                  src={
                    user?.userImage
                      ? `${import.meta.env.VITE_BASE_URL}/${user?.userImage}`
                      : profileIcon
                  }
                  title={user?.name}
                  alt={user?.name}
                />
              </button>
              {isMenuOpen && (
                <LoginMenu
                  MenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
              )}
            </div>
          ) : (
            <div className="sm:flex gap-3 w-full">
              <Link
                to="/signin"
                className="transition-colors duration-500 rounded-3xl sm:px-3 py-2"
              >
                SignIn
              </Link>
              <Link
                to="/signup"
                className="bg-sky-300 sm:block  hidden text-white transition-colors duration-500 rounded-lg sm:px-3 py-2"
              >
                Start Writing
              </Link>
            </div>
          )}
        </div>
      </nav>
      {confirmBox.status && <ConfirmationBox />}
    </header>
  );
}

export default memo(MainNavBar);
