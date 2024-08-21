import React, { memo, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Theme from "./Theme";

function Settings() {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => {
        navigate(-1);
      }}
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[100] bg-[#0f0f0f] bg-opacity-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="container w-[500px] h-[300px] flex justify-center items-center bg-white rounded-xl"
      >
        <Theme />
      </div>
    </div>
  );
}

export default memo(Settings);
