import React from "react";

const TextTool = ({ isCurrentTextTool }) => {
  return (
    <div
      className={`bg-slate-300 justify-evenly items-center w-[230px] rounded-md h-[40px]  transition-transform duration-100  -top-8 ${
        isCurrentTextTool ? "scale-100 flex" : "scale-0 hidden"
      } absolute`}
    >
      <div className="flex w-full justify-evenly items-center">
        <span>
          <button>B</button>
        </span>
        <span>
          <button>Link</button>
        </span>
        <span>
          <button>T</button>
        </span>
        <span>
          <button>t</button>
        </span>
      </div>
    </div>
  );
};

export default TextTool;
