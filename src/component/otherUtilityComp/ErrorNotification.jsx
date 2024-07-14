import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setErrNotify } from "../../redux/slices/uiSlice";
import { useSelector, useDispatch } from "react-redux";
function ErrorNotification() {
  const { ErrNotify } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed z-[300]  top-0 right-5   bg-yellow-400 border-2  mt-3 transition-all duration-300 ease-linear  rounded-md  ${
        ErrNotify.status
          ? " translate-x-0 opacity-100  outline outline-red-600"
          : "translate-x-[26rem]  opacity-0 "
      } px-3 min-w-[50px] w-[400px] min-h-[100px] max-w-[400px] `}
    >
      <div className="relative ">
        <div className="w-full flex justify-between py-2  h-10">
          {" "}
          Error Notification
          <button
            onClick={() => {
              dispatch(setErrNotify({ message: "", state: false }));
            }}
            className=""
          >
            X
          </button>
        </div>
        <div className="w-full p-4  break-words flex ">
          <p className="worde">{ErrNotify.message}</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorNotification;
