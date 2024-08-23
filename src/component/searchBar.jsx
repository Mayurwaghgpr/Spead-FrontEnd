import React, { memo, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../utils/debounce";
import usePublicApis from "../Apis/publicApis";

function SearchBar({
  className,
  disable = true,
  isSearchBar,
  scrollDirection,
}) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchSearchData } = usePublicApis();

  const { data, isFetching } = useQuery({
    queryKey: ["searchQuery", search],
    queryFn: () => search && fetchSearchData(search),
    enabled: !!search,
  });
  const searchDebounce = debounce((value) => {
    console.log(value);
    setSearch(value);
  }, 500);

  return (
    <div
      className={`relative  ${className}    dark:*:border-[#383838]  bg-inherit  `}
    >
      <div
        className={`w-full h-full   flex justify-center pr-3  items-center gap-3 bg-inherit rounded-full border overflow-hidden  `}
      >
        <input
          className="bg-inherit  p-2 pl-3 w-full outline-none   "
          placeholder="search"
          type="search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={({ target: { value } }) => searchDebounce(value.trim())}
          disabled={disable}
        />
        {isSearchBar && (
          <button
            onClick={() => setSearchParams({ topic: search })}
            className=""
            disabled={disable}
          >
            <i className="bi bi-search"></i>
          </button>
        )}
      </div>
      {/* Search Results List */}
      {isFocused && data && (
        <div
          className={`mx-2 absolute top-12 z-50 rounded-xl border bg-white bg-inherit  w-full transition-all duration-700 overflow-hidden  ${
            scrollDirection == "down"
              ? "-translate-y-36 opacity-0 "
              : "translate-y-0 opacity-100"
          }`}
        >
          {data.length > 0 ? (
            <ul className="flex flex-col gap-2 py-3 bg-slate-200 rounded-f">
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
          ) : (
            <div className="cursor-pointer px-3 flex justify-start items-center gap-3 p-3 bg-slate-300 border rounded-xl border-slate-500 ">
              {" "}
              No Result Found{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(SearchBar);
