import React from "react";

const FollowPeopleLoder = ({ items }) => (
  <ul className="py-3 max-h-[150px] overflow-clip relative ">
    {[...Array(items)].map((_, index) => (
      <li
        key={index}
        className="flex mt-2 justify-start px-2 items-center capitalize gap-2"
      >
        <div className="h-[25px] rounded-full w-[25px] bg-slate-100 animate-pulse"></div>
        <h1 className="h-3 w-20 bg-slate-100 animate-pulse rounded-md"></h1>
      </li>
    ))}
  </ul>
);

export default FollowPeopleLoder;
