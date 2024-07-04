import React, { memo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmBox, setIsConfirm } from "../redux/slices/uiSlice";
import logoutIcon from "/logout.png";
import profileIcon from "/user.png";

function LoginMenu({ user, emailMasked, MenuOpen }) {
  const dispatch = useDispatch();
  console.log(user.id);
  return (
    <div
      className={`${
        MenuOpen ? "block" : " hidden"
      } absolute  z-20  top-7  shadow-lg right-24 mt-2 min-w-[150px] rounded-md bg-white`}
    >
      <div
        className={` flex  w-[300px] flex-col justify-start gap-3 py-3   items-start text-sm transition-all ease-linear duration-75`}
      >
        <div className=" flex gap-3 text-base  w-full  px-3 py-2">
          <img
            className=" size-[60px] rounded-full "
            src={`${import.meta.env.VITE_BASE_URL}/${user?.userImage}`}
            alt=""
          />
          <div className="flex flex-col gap-2 ">
            <h1>{user?.username}</h1>
            <Link
              className="flex text-gray-700 gap-2  justify-center w-full hover:underline hover:text-blue-500   "
              to={`/profile/@${user?.username
                .split(" ")
                .slice(0, user?.username.length - 1)
                .join("")}/${user?.id}`}
              onClick={() => setIsMenuOpen(false)}
            >
              View Your Profile
            </Link>
          </div>
        </div>
        <div className=" flex flex-col border-t-2 border-b-2 w-full px-3 py-2 gap-3 ">
          <a
            href="#"
            className="text-gray-700 block"
            role="menuitem"
            tabIndex="-1"
          >
            Support
          </a>
          <a href="#" className="text-gray-700 " role="menuitem" tabIndex="-1">
            License
          </a>
        </div>
        <div className=" flex flex-col  w-full px-3 py-2 gap-3">
          <p className="text-gray-700 ">{emailMasked}</p>
          <button
            onClick={() =>
              dispatch(
                setConfirmBox({
                  message: "Want to LogOut?",
                  status: true,
                  type: "logout",
                })
              )
            }
            type="button"
            className="flex text-gray-700 gap-2 w-full "
          >
            <img className="w-5 hover:-translate-x-1" src={logoutIcon} alt="" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(LoginMenu);
