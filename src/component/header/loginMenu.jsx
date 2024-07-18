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
      className={`fixed z-[50] shadow-lg  right-10  mt-2 min-w-[100px] rounded-2xl bg-white transition-all  duration-300 ease-linear`}
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
            className="size-[30px] rounded-full"
            src={
              user?.userImage
                ? `${import.meta.env.VITE_BASE_URL}/${user?.userImage}`
                : profileIcon
            }
            alt=""
          />
          <div className="flex w-full gap-2">{user?.username}</div>
        </Link>
        <Link
          to=""
          className="flex justify-start  items-center gap-2  w-full  "
          role="menuitem"
          tabIndex="-1"
        >
          <box-icon name="book-alt"></box-icon>
          stories
        </Link>
        <Link
          to=""
          className="flex justify-start items-center gap-2 w-full  "
          role="menuitem"
          tabIndex="-1"
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
              fill-rule="evenodd"
              d="M12.003 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M8.502 12a3.5 3.5 0 1 1 7 .001 3.5 3.5 0 0 1-7-.001"
              clip-rule="evenodd"
            ></path>
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M11.568 3.5a1 1 0 0 0-.863.494l-.811 1.381A3 3 0 0 1 7.33 6.856l-1.596.013a1 1 0 0 0-.858.501l-.44.761a1 1 0 0 0-.003.992l.792 1.4a3 3 0 0 1 0 2.954l-.792 1.4a1 1 0 0 0 .004.992l.439.76a1 1 0 0 0 .858.502l1.596.013a3 3 0 0 1 2.564 1.48l.811 1.382a1 1 0 0 0 .863.494h.87a1 1 0 0 0 .862-.494l.812-1.381a3 3 0 0 1 2.563-1.481l1.596-.013a1 1 0 0 0 .859-.501l.439-.761a1 1 0 0 0 .004-.992l-.793-1.4a3 3 0 0 1 0-2.953l.793-1.401a1 1 0 0 0-.004-.992l-.439-.76a1 1 0 0 0-.859-.502l-1.596-.013a3 3 0 0 1-2.563-1.48L13.3 3.993a1 1 0 0 0-.862-.494zM8.98 2.981A3 3 0 0 1 11.568 1.5h.87a3 3 0 0 1 2.588 1.481l.81 1.382a1 1 0 0 0 .855.494l1.597.013a3 3 0 0 1 2.575 1.502l.44.76a3 3 0 0 1 .011 2.975l-.792 1.4a1 1 0 0 0 0 .985l.792 1.401a3 3 0 0 1-.012 2.974l-.439.761a3 3 0 0 1-2.575 1.503l-1.597.012a1 1 0 0 0-.854.494l-.811 1.382a3 3 0 0 1-2.588 1.481h-.87a3 3 0 0 1-2.588-1.481l-.811-1.382a1 1 0 0 0-.855-.494l-1.596-.012a3 3 0 0 1-2.576-1.503l-.439-.76a3 3 0 0 1-.012-2.975l.793-1.4a1 1 0 0 0 0-.985l-.793-1.4a3 3 0 0 1 .012-2.975l.44-.761A3 3 0 0 1 5.717 4.87l1.596-.013a1 1 0 0 0 .855-.494z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Setting
        </Link>
        <div className="border-y py-2 w-full">
          <p className=" ">{emailMasked()}</p>
        </div>
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
              fill-rule="evenodd"
              d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4a1 1 0 1 1 0 2zm9.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 13H11a1 1 0 1 1 0-2h6.586l-2.293-2.293a1 1 0 0 1 0-1.414"
              clip-rule="evenodd"
            ></path>
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default memo(LoginMenu);
