import React, { memo, useEffect } from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";
import Theme from "./Theme";
import { LuGithub } from "react-icons/lu";

function Settings() {
  const navigate = useNavigate();
  const settingItem = [
    { name: "Theme", icon: <i className="bi bi-gear"></i> },
    { name: "Sync github", icon: <LuGithub /> },
  ];
  return (
    <div
      onClick={(e) => {
        navigate(-1);
      }}
      className="fixed  top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[100] bg-black border-inherit bg-opacity-30 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" relative sm:w-[70%] h-[600px] flex flex-col  overflow-hidden items-center border bg-white dark:bg-[#222222] border-inherit rounded-lg"
      >
        <header className="w-full text-4xl p-3">
          <h1> Settings</h1>
        </header>
        <div className="h-full py-3 flex justify-between text-sm w-full">
          <aside className=" h-full  px-4  min-w-fit flex flex-col gap-10">
            <ul className=" flex flex-col gap-2">
              {settingItem.map((setting) => (
                <li className="flex justify-start items-center gap-1">
                  <span>{setting.icon}</span>
                  {setting.name}
                </li>
              ))}
            </ul>
            <div className="">
              <Link className="flex items-center gap-1">
                <span>
                  <i className="bi bi-person"></i>
                </span>
                Profile
              </Link>
            </div>
          </aside>
          <div className=" w-full">
            {<Outlet />}
            <Theme />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Settings);
