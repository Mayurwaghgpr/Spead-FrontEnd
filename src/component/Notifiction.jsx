import React, { useEffect, useState } from "react";
import { setNotify } from "../redux/slices/uiSlice";
import { useSelector, useDispatch } from "react-redux";
function Notification() {
  const { Notify } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed  top-[10%] right-5  bg-yellow-400 mt-3 transition-all duration-500 ease-linear  rounded-md  ${
        Notify.status
          ? "z-[200] opacity-100 translate-x-0"
          : "translate-x-[26rem]   opacity-0 "
      } px-3 min-w-[50px] w-[400px] min-h-[100px] max-w-[400px] `}
    >
      <div className="relative ">
        <div className="w-full flex justify-between py-2  h-10">
          {" "}
          Notification
          <button
            onClick={() => {
              dispatch(setNotify({ message: "", status: false }));
            }}
            className=""
          >
            X
          </button>
        </div>
        <div className="w-full p-4  break-words flex ">
          <p className="worde">{Notify.message}</p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
