import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationBox from "../otherUtilityComp/ConfirmationBox";
import { setConfirmBox, setIsConfirm } from "../../redux/slices/uiSlice";
import { setBeforeSubmit } from "../../redux/slices/postSlice";
import useLogout from "../../utils/logout";
import LoginMenu from "./loginMenu";
import profileIcon from "/user.png";
import ProfilImage from "../ProfilImage";
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
    <header className="w-full border p-2 px-4">
      <nav className="flex items-center justify-between h-[4rem] w-full ">
        <Link to="/blogs" className="text-2xl">
          {"{...Spread}"}
        </Link>
        <div className="flex gap-2 justify-end w-full">
          {/* Publish new post button, displayed only when writing */}
          {location.pathname === "/write" && isLogin && (
            <div className="flex justify-center items-center">
              <button
                className="bg-amber-200 px-2 py-1 text-sm rounded-3xl"
                onClick={() => dispatch(setBeforeSubmit(true))}
              >
                Publish
              </button>
            </div>
          )}
          {/* Search Bar */}
          {location.pathname !== "/write" && isLogin && <SearchBar />}
        </div>
        <div className="flex justify-end items-center gap-5 max-w-[400px] w-full">
          {/* Dynamic writing panel Link */}
          {location.pathname !== "/write" &&
            location.pathname !== "/profile" && (
              <Link
                className="flex justify-center items-center text-start gap-1 text-slate-500 font-thin text-2xl transition-all duration-150 hover:text-slate-800"
                to="/write"
                tabIndex="-1"
                title="Write"
              >
                {isLogin && <i className="bi bi-pen"></i>}
              </Link>
            )}
          {/* Notification bell */}
          <div className="relative sm:text-2xl text-xl font-thin">
            <i className="bi bi-bell"></i>
            <span className="absolute top-0 flex h-3 w-3 -right-1">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
            </span>
          </div>
          {/* Auth Links */}
          {isLogin ? (
            <div className="relative inline-block text-left" ref={loginMenuRef}>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                type="button"
                className="flex justify-center bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-full"
                id="menu-button"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                <ProfilImage
                  className="rounded-full sm:h-[50px] sm:w-[50px] h-10 w-10"
                  imageUrl={
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
                className="bg-black sm:block hidden text-white transition-colors duration-500 rounded-3xl sm:px-3 py-2"
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
