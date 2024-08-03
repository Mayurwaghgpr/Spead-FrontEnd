import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../../redux/slices/uiSlice";

function ToastItem({ ToastContent }) {
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     const timeoutId = setTimeout(() => {
  //       dispatch(removeToast(ToastContent.id));
  //     }, 1000);

  //     return () => clearTimeout(timeoutId);
  //   }, [dispatch, ToastContent.id]);

  const status = () => {
    if (ToastContent.type === "success") {
      return "bg-green-300";
    } else if (ToastContent.type === "error") {
      return "bg-red-300";
    }
  };

  return (
    <div
      className={`transition-transform duration-500 ease-in-out bg-slate-100 relative flex  flex-col rounded-lg w-full`}
    >
      <div className="w-full flex  p-4">
        <div className={`w-1 me-2 ${status()}`}></div>
        <div className="w-full break-words flex">
          <p className="word-break">{ToastContent?.message}</p>
        </div>
        <button
          onClick={() => {
            dispatch(removeToast(ToastContent?.id));
          }}
          className="ml-4"
        >
          X
        </button>
      </div>
      <div className={`w-1 h-1 bg-sky-500 rounded-lg`}></div>
    </div>
  );
}

export default memo(ToastItem);
