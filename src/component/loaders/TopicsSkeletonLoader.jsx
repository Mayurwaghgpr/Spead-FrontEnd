import React from "react";

const TopicsSkeletonLoader = ({ items }) => (
  <ul className="flex justify-start flex-wrap gap-2">
    {[...Array(items)].map((_, index) => (
      <li
        key={index}
        className="border w-* h-6 animate-pulse duration-75 text-sm rounded-2xl border-sky-100 bg-sky-50 px-2 py-0.5 dark:text-black dark:border-sky-500/15 dark:bg-sky-500/10"
      ></li>
    ))}
  </ul>
);

export default TopicsSkeletonLoader;
