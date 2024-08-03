import React from "react";

const FollowPeopleLoader = ({ items }) => (
  <ul className="py-3 max-h-[150px] overflow-clip relative ">
    {[...Array(items)].map((_, index) => (
      <li
        key={index}
        className="flex mt-2 justify-start px-2 items-center capitalize gap-2"
      >
        <div className="h-[25px] rounded-full w-[25px] bg-slate-300 animate-pulse"></div>
        <h1 className="h-6 w-52 bg-slate-300 animate-pulse rounded-md"></h1>
        <div className="h-7 w-16 bg-slate-300 animate-pulse rounded-xl"></div>
      </li>
    ))}
  </ul>
);

export default FollowPeopleLoader;
