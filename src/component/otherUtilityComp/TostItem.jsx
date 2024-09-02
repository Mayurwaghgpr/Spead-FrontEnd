import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../../redux/slices/uiSlice";
import { motion } from "framer-motion";
function ToastItem({ ToastContent }) {
  const dispatch = useDispatch();
  const [isVisible, setVisble] = useState(true);
  const timerRef = useRef({});
  useEffect(() => {
    timerRef[ToastContent.id] = setTimeout(() => {
      dispatch(removeToast(ToastContent.id));
    }, 2000);

    return () => {
      clearTimeout(timerRef[ToastContent.id]);
    };
  }, [dispatch, ToastContent.id]);

  const status =
    ToastContent.type === "success"
      ? "bg-green-300 "
      : ToastContent.type === "error"
      ? "bg-red-300"
      : ToastContent.type === "warning"
      ? "bg-yellow-300 "
      : "bg-sky-300";
  return (
    <span
      className={` animate-slide-in-left pointer-events-auto  ${status} shadow-xl  flex  flex-col rounded-lg  w-fit  `}
    >
      <div className=" flex  p-4">
        <div className=" break-words flex">
          <p className="word-break">{ToastContent?.message}</p>
        </div>
        <button
          onClick={() => {
            clearTimeout(timerRef[ToastContent.id]);
            dispatch(removeToast(ToastContent?.id));
          }}
          className="ml-4"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      {/* <div className={`w-1 h-1 bg-sky-500 rounded-lg`}></div> */}
    </span>
  );
}

export default memo(ToastItem);
