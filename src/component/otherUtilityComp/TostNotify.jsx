import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TostItem from "./TostItem";
function TostNotify() {
  const { ToastState } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  //   function Tostify() {
  //     if ( TostState.error) {

  //     }

  //      ? "bg-red-500 translate-x-0 opacity-100 "
  //      : TostState.success
  //      ? "bg-green-400 border border-green-400"
  //      : "translate-x-[26rem]  opacity-0 ";
  // }

  return (
    <div
      className={`fixed ${
        ToastState.length > 0 ? " visible" : "hidden"
      } z-50 top-20 right-5  transition-all duration-300 ease-linear flex flex-wrap gap-3 px-3 min-w-[50px] w-full  max-w-[500px] `}
    >
      {ToastState?.map((content, idx) => {
        console.log(content);
        return <TostItem key={idx} ToastContent={content} />;
      })}
    </div>
  );
}

export default memo(TostNotify);
