import React, { memo, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../utils/debounce";
import { fetchSearchData } from "../Apis/publicApis";
import Spinner from "./loaders/Spinner";

function SearchBar({ className, disable = true }) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isFetching } = useQuery({
    queryKey: ["searchQuery", search],
    queryFn: () => search && fetchSearchData(search),
    enabled: !!search,
  });

  console.log(data);

  const searchDebounce = debounce((value) => {
    console.log(value);
    setSearch(value);
  }, 500);

  return (
    <div
      className={` flex-col sm:flex hidden justify-center  items-center gap-1 ${className}`}
    >
      <div
        className={`w-full h-full  flex justify-center pr-3  items-center gap-3 `}
      >
        <input
          className="bg-inherit  p-2 pl-3 rounded-l-xl w-full outline-none"
          placeholder="search"
          type="search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={({ target: { value } }) => searchDebounce(value.trim())}
          disabled={disable}
        />
        <button disabled={disable}>
          <i className="bi bi-search"></i>
        </button>
      </div>
      {/* Search Results List */}
      {isFocused && data && (
        <div className="mx-2 absolute top-12 z-50 rounded-xl border bg-white max-w-[550px] w-full">
          <ul className="flex flex-col gap-2 py-3">
            {data?.map((searchres, idx) => (
              <li
                className="cursor-pointer p-2 px-3 flex justify-start items-center gap-3 hover:bg-slate-100"
                key={idx}
                onMouseDown={() => {
                  setSearchParams({ topic: searchres.topic });
                }}
              >
                <span className="font-thin text-lg">
                  <i className="bi bi-search"></i>
                </span>
                <b>{searchres?.topic}</b>
              </li>
            ))}
            {/* {isFetching && <Spinner />} */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default memo(SearchBar);
