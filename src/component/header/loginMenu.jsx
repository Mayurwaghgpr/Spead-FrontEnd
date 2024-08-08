import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmBox } from "../../redux/slices/uiSlice";
import logoutIcon from "/logout.png";
import profileIcon from "/user.png";
import { useMutation, useQuery } from "react-query";
import userApi from "../../Apis/userApi";
import useLogout from "../../utils/logout";
import { setUser } from "../../redux/slices/authSlice";

function LoginMenu({ MenuOpen, setIsMenuOpen }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { ArchivePost, getArchivedPosts, getLogInUserData } = userApi();
  const Logout = useLogout();

  // const getArchive = useMutation(() => getArchivedPosts(), {
  //   onSuccess: (data) => {
  //     console.log("archive", data);
  //   },
  // });

  const emailMasked = useCallback(() => {
    const email = user?.email || "";
    if (email.length < 7) return email;
    const emailarr = email.split("");
    emailarr.splice(2, 7, "******");
    return emailarr.join("");
  }, [user]);
  // console.log(user?.id);

  return (
    <div
      className={`fixed  z-[50] shadow-lg px-2 right-10  mt-2  rounded-2xl bg-white transition-all  duration-300 ease-linear`}
    >
      <div className="flex min-w-[270px] text-md flex-col h-full p-4 gap-3 items-start justify-between font-light transition-all ease-linear duration-75">
        <Link
          className="flex justify-center items-center gap-2 w-full  "
          to={`/profile/@${user?.username
            .split(" ")
            .slice(0, user?.username.length - 1)
            .join("")}/${user?.id}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            className="h-7 w-8 rounded-full object-cover object-top"
            src={
              user?.userImage
                ? `${import.meta.env.VITE_BASE_URL}/${user?.userImage}`
                : profileIcon
            }
            alt=""
          />
          <div className="flex w-full gap-2">{user?.username}</div>
        </Link>
        <button
          // onClick={() => getArchive.mutate()}
          className="flex justify-start  items-center gap-2  w-full  "
          role="menuitem"
          tabIndex="-1"
        >
          <i className="bi bi-bookmark"></i>
          Archive
        </button>
        <Link
          to=""
          className="flex justify-start  items-center gap-2  w-full  "
          role="menuitem"
          tabIndex="-1"
        >
          <i className="bi bi-book"></i>
          stories
        </Link>
        <Link
          to=""
          className="flex justify-start items-center gap-2 w-full  "
          role="menuitem"
          tabIndex="-1"
        >
          <i className="bi bi-gear"></i>
          Setting
        </Link>
        <div className="border-y py-2 w-full">
          <p className=" ">{emailMasked()}</p>
        </div>
        <button
          onClick={() => Logout()}
          type="button"
          className="flex  gap-2 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4a1 1 0 1 1 0 2zm9.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 13H11a1 1 0 1 1 0-2h6.586l-2.293-2.293a1 1 0 0 1 0-1.414"
              clipRule="evenodd"
            ></path>
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default memo(LoginMenu);
