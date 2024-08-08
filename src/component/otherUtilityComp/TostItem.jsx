import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../../redux/slices/uiSlice";

function ToastItem({ ToastContent }) {
  const dispatch = useDispatch();
  const [isVisible, setVisble] = useState(true);

  useEffect(() => {
    const timeoutId1 = setTimeout(() => {
      setVisble(false);
    }, 2000);

    const timeoutId2 = setTimeout(() => {
      dispatch(removeToast(ToastContent.id));
    }, 2500);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [dispatch, ToastContent.id]);

  // const status = () => {
  //   if (ToastContent.type === "success") {
  //     return "bg-green-300";
  //   } else if (ToastContent.type === "error") {
  //     return "bg-red-300";
  //   }
  // };

  return (
    <div
      className={`transition-all duration-500 ease-in-out bg-slate-200 shadow-lg relative flex  flex-col rounded-lg w-full ${
        isVisible ? "opacity-100" : "opacity-0 -translate-y-2"
      }`}
    >
      <div className="w-full flex  p-4">
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
      {/* <div className={`w-1 h-1 bg-sky-500 rounded-lg`}></div> */}
    </div>
  );
}

export default memo(ToastItem);
