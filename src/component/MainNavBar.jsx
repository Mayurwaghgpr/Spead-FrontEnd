import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationBox from "./ConfirmationBox";
import { setConfirmBox, setIsConfirm } from "../redux/slices/uiSlice";
import { setBeforeSubmit } from "../redux/slices/postSlice";
import useLogout from "../utils/logout";
import LoginMenu from "./loginMenu";
import profileIcon from "/user.png";

function MainNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { confirmBox, isConfirm } = useSelector((state) => state.ui);
  const { elements } = useSelector((state) => state.posts);
  const { isLogin, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const loginMenuRef = useRef();
  const Logout = useLogout();

  const handleLogout = useCallback(() => {
    if (isConfirm.type === "logout") {
      Logout();
      dispatch(setConfirmBox({ message: "", status: false }));
      dispatch(setIsConfirm(false));
      setIsMenuOpen(false);
    }
  }, [isConfirm, Logout, dispatch]);

  const handleClickOutside = useCallback((event) => {
    if (loginMenuRef.current && !loginMenuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  console.log("nave");
  return (
    <div>
      <header
        className={`flex w-full ${
          location.pathname === "/" ? "fixed" : ""
        } justify-between bg-white py-2 px-4 flex-col`}
      >
        <nav className="flex items-center w-full h-[4rem] justify-between">
          <Link to="/blogs" className="text-2xl">
            {"{...Spread}"}
          </Link>
          <div className="pr-5 flex justify-center items-center gap-5">
            {location.pathname === "/write" && isLogin && (
              <div className="flex justify-center items-center w-[400px]">
                <button
                  className="bg-amber-200 px-2 py-1 text-sm rounded-3xl"
                  onClick={() => dispatch(setBeforeSubmit(true))}
                >
                  Publish
                </button>
              </div>
            )}
            {location.pathname !== "/write" &&
              location.pathname !== "/profile" &&
              isLogin && (
                <Link
                  className="text-slate-500 font-thin hover:text-slate-800"
                  to="/write"
                >
                  <i className="bi bi-pencil-square text-xl"></i> Write
                </Link>
              )}
            {isLogin ? (
              <div
                className="relative inline-block text-left"
                ref={loginMenuRef}
              >
                <button
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  type="button"
                  className="inline-flex h-[50px] w-[50px] justify-center gap-x-1.5 p-1 bg-white text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-full"
                  id="menu-button"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                >
                  <img
                    className="rounded-full w-full h-full"
                    title={user?.name}
                    src={
                      user?.userImage
                        ? `${import.meta.env.VITE_BASE_URL}/${user?.userImage}`
                        : profileIcon
                    }
                    alt={user?.name}
                  />
                </button>
                <LoginMenu
                  MenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/Login"
                  className="hover:bg-black hover:text-white transition-colors duration-500 rounded-3xl px-3 py-2"
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="hover:bg-black hover:text-white transition-colors duration-500 rounded-3xl px-3 py-2"
                >
                  SignUp
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
      <Outlet />
      {confirmBox.status && <ConfirmationBox />}
    </div>
  );
}

export default memo(MainNavBar);
