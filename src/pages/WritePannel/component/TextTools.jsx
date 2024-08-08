import React from "react";

const TextTool = ({ isCurrentTextTool }) => {
  return (
    <div
      className={`bg-slate-500 justify-evenly items-center w-[230px] rounded-md h-[40px]  transition-transform duration-100  -top-8 ${
        isCurrentTextTool ? "scale-100 flex" : "scale-0 hidden"
      } absolute`}
    >
      <div className="flex w-full items-center">
        <span className=" border-r flex justify-center border-black w-full">
          <button>
            <b>B</b>
          </button>
        </span>
        <span className="border-r flex justify-center border-black w-full">
          <button>
            <i className="bi bi-link"></i>
          </button>
        </span>
        <span className="border-r flex justify-center border-black w-full">
          <button>T</button>
        </span>
        <span className="w-full flex justify-center">
          <button>t</button>
        </span>
      </div>
    </div>
  );
};

export default TextTool;
