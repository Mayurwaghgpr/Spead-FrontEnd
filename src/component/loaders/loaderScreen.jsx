import React from "react";
import Spiner from "./Spinner";
import { createPortal } from "react-dom";

function LoaderScreen() {
  return createPortal(
    <div className=" z-50 flex bg-black justify-center items-center opacity-30  h-screen">
      <Spiner className={``} />
    </div>,
    document.getElementById("portal")
  );
}

export default LoaderScreen;
