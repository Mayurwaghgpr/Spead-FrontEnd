import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TostItem from "./TostItem";
import { createPortal } from "react-dom";
function TostNotify() {
  const { ToastState } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return createPortal(
    <div
      className={`fixed bg-none  ${
        ToastState.length > 0 ? " visible" : "hidden h-0"
      } z-50 top-20 right-5   transition-all duration-300 ease-linear flex flex-col gap-3 px-3 min-w-[50px] w-full  max-w-[500px] `}
    >
      {ToastState?.map((content, idx) => {
        console.log(content);
        return <TostItem key={idx} ToastContent={content} />;
      })}
    </div>,
    document.getElementById("portal")
  );
}

export default memo(TostNotify);
