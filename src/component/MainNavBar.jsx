import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import ConfirmationBox from "./ConfirmationBox";
import logoutIcon from "/logout.png";
import profileIcon from "/user.png";

function MainNavBar() {
  const Admin = JSON.parse(localStorage.getItem("Admin profile"));
  const { user, isLogin, logout, submit, setSubmit } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmBox, setConfirmBox] = useState({
    message: "",
    status: false,
  });
  const [isConfirm, setIsConfirm] = useState(false);
  const location = useLocation();
  const menuRef = useRef();

  useEffect(() => {
    if (isConfirm) {
      logout();
      setConfirmBox({ message: "", status: false });
      setIsConfirm(false);
      setIsMenuOpen(false);
    }
  }, [isConfirm, logout]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const emailMasked = (() => {
    const email = user?.email || "";
    if (email.length < 7) return email;
    const emailArray = email.split("");
    emailArray.splice(2, 7, "*******");
    return emailArray.join("");
  })();

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
                  onClick={() => setSubmit((prev) => !prev)}
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
              <div className="relative inline-block text-left" ref={menuRef}>
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
                    src={"http://localhost:3000/" + Admin[0].userImage}
                    alt={user?.name}
                  />
                </button>
                <div
                  className={`${
                    isMenuOpen
                      ? " transition-all duration-300 ease-linear sm:translate-y-0 lg:translate-y-0 opacity-100"
                      : "transition-all ease-linear sm:-translate-y-[250px] -translate-y-56   duration-300 opacity-0 "
                  } absolute z-10 top-14 sm:before:w-[20px]  sm:before:h-[20px] before:rotate-45 before:absolute before:right-[.2rem] before:-top-[0.7rem] before:bg-inherit shadow-lg right-3 mt-2 min-w-[150px] rounded-md bg-white`}
                >
                  <div
                    className={`${isMenuOpen ? " flex" : "hidden"}py-1`}
                    role="none"
                  >
                    <Link
                      className="flex text-gray-700 gap-2 px-4 py-2 text-sm"
                      to="/profile"
                      state={{ id: user?.id }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <img
                        className="w-5 hover:scale-110 transition-transform ease-linear duration-75"
                        src={profileIcon}
                        alt=""
                      />
                      Profile
                    </Link>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Support
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      License
                    </a>
                    <p className="text-gray-700 px-4 pt-2 text-sm">
                      {emailMasked}
                    </p>
                    <button
                      onClick={() =>
                        setConfirmBox({
                          message: "Want to LogOut?",
                          status: true,
                        })
                      }
                      type="button"
                      className="flex text-gray-700 gap-2 w-full px-4 py-2 text-left text-sm"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      <img
                        className="w-5 hover:-translate-x-1"
                        src={logoutIcon}
                        alt=""
                      />
                      Sign out
                    </button>
                  </div>
                </div>
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
      {isConfirmBox.status && (
        <ConfirmationBox
          isConfirmBox={isConfirmBox}
          setConfirmBox={setConfirmBox}
          setIsConfirm={setIsConfirm}
        />
      )}
    </div>
  );
}

export default MainNavBar;
