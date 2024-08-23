import React, { memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoutIcon from "/logout.png";
import profileIcon from "/ProfOutlook.png";
import useLogout from "../../utils/logout";
import userImageSrc from "../../utils/userImageSrc";

function LoginMenu({ MenuOpen, setIsMenuOpen }) {
  const { user, isLogin } = useSelector((state) => state.auth);
  const Logout = useLogout();
  const location = useLocation();

  const emailMasked = useCallback(() => {
    const email = user?.email || "";
    if (email.length < 7) return email;
    return `${email.slice(0, 2)}******${email.slice(6, email.length)}`;
  }, [user]);

  const handleProfileClick = () => {
    setIsMenuOpen(false);
  };
  const { userImageurl } = userImageSrc(user);
  return (
    <div className="fixed z-[100] shadow-lg px-2 right-10 mt-2 rounded-2xl dark:bg-[#222222] bg-white transition-all duration-300 ease-linear dark:border-[#383838] dark:border">
      <div className="flex min-w-[270px] text-md flex-col h-full p-4 gap-3 items-start justify-between font-light transition-all ease-linear duration-75   dark:*:border-[#383838]">
        {/* Profile Link */}
        <Link
          className="flex justify-center items-center gap-2 w-full"
          to={`/profile/@${user?.username?.replace(/\s+/g, "")}/${user?.id}`}
          onClick={handleProfileClick}
        >
          <img
            className="h-7 w-7 rounded-full object-cover object-top"
            src={userImageurl}
            alt="User profile"
          />
          <div className="flex w-full gap-2">{user?.username}</div>
        </Link>
        {location.pathname !== "/write" &&
          location.pathname !== "/profile" &&
          isLogin && (
            <Link
              className="text-lg sm:hidden flex gap-2"
              to="/write"
              tabIndex="-1"
              title="Write"
            >
              <i className="bi bi-pen"></i>
              write
            </Link>
          )}
        {/* Archive Button */}
        <Link
          to={"/read"}
          className="flex justify-start items-center gap-2 w-full"
          role="menuitem"
          tabIndex="-1"
        >
          <i className="bi bi-bookmark"></i>
          Archive
        </Link>

        {/* Stories Link */}
        <Link
          to=""
          className="flex justify-start items-center gap-2 w-full"
          role="menuitem"
          tabIndex="-1"
        >
          <i className="bi bi-book"></i>
          Stories
        </Link>

        {/* Settings Link */}
        <Link
          to="/setting"
          className="flex justify-start items-center gap-2 w-full"
          role="menuitem"
          tabIndex="-1"
        >
          <i className="bi bi-gear"></i>
          Settings
        </Link>

        {/* Email Display */}
        <div className="border-y py-2 border-0 w-full">
          <p>{emailMasked()}</p>
        </div>

        {/* Logout Button */}
        <button onClick={Logout} type="button" className="flex gap-2 w-full">
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
