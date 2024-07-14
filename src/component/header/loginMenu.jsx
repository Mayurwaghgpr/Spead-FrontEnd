import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmBox } from "../../redux/slices/uiSlice";
import logoutIcon from "/logout.png";
import profileIcon from "/user.png";

function LoginMenu({ MenuOpen, setIsMenuOpen }) {
  const Admin = JSON.parse(localStorage.getItem("Admin profile"));
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const emailMasked = useCallback(() => {
    const email = Admin?.email || user?.email || "";
    if (email.length < 7) return email;
    const emailarr = email.split("");
    emailarr.splice(2, 7, "******");
    return emailarr.join("");
  }, [Admin, user]);
  console.log(user?.id);

  return (
    <div
      className={`${
        MenuOpen ? "-translate-x-56 " : "translate-x-96 "
      } fixed z-[50] shadow-lg top-0  mt-2 min-w-[100px] rounded-md bg-white transition-all duration-300 ease-linear`}
    >
      <div className="flex w-[300px] flex-col h-full  pb-3 items-start text-sm transition-all ease-linear duration-75">
        <div className="flex text-base items-center w-full px-3">
          <div className="w-full flex gap-3 text-base items-center py-3">
            <img
              className="size-[30px] rounded-full"
              src={
                user?.userImage
                  ? `${import.meta.env.VITE_BASE_URL}/${user?.userImage}`
                  : profileIcon
              }
              alt=""
            />
            <div className="flex w-full gap-2">
              <h1>{user?.username}</h1>
            </div>
          </div>
          <div className="flex inset-0  p-0">
            <button onClick={() => setIsMenuOpen(false)} className="">
              X
            </button>
          </div>
        </div>

        <div className="flex border-t  w-full px-3 py-2 gap-2">
          <img className="h-5 w-5" src={profileIcon} alt="" />
          <Link
            className="flex text-gray-700 gap-2 w-full hover:underline hover:text-blue-500"
            to={`/profile/@${user?.username
              .split(" ")
              .slice(0, user?.username.length - 1)
              .join("")}/${user?.id}`}
            onClick={() => setIsMenuOpen(false)}
          >
            View Your Profile
          </Link>
        </div>
        <div className="flex flex-col border-t border-b w-full px-3 py-2 gap-3">
          <a
            href="#"
            className="text-gray-700 block"
            role="menuitem"
            tabIndex="-1"
          >
            Support
          </a>
          <a href="#" className="text-gray-700" role="menuitem" tabIndex="-1">
            License
          </a>
        </div>
        <div className="flex flex-col w-full  px-3 py-2 gap-3">
          <p className="text-gray-700">{emailMasked()}</p>
          <button
            onClick={() =>
              dispatch(
                setConfirmBox({
                  message: "Want to Logout?",
                  status: true,
                  type: "logout",
                })
              )
            }
            type="button"
            className="flex text-gray-700 gap-2 w-full"
          >
            <img className="w-5" src={logoutIcon} alt="" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(LoginMenu);
