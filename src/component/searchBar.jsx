import React, { memo, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../utils/debounce";
import { fetchSearchData } from "../Apis/publicApis";
import Spinner from "./loaders/Spinner";

function SearchBar() {
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
    <div className="relative flex flex-col justify-center items-start gap-1">
      <div className="lg:w-[600px] w-full md:w-[500px] flex justify-center sm:border pr-3 rounded-full items-center gap-3">
        <input
          className="bg-inherit p-2 pl-3 rounded-l-xl w-full outline-none"
          placeholder="search"
          type="search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={({ target: { value } }) => searchDebounce(value.trim())}
        />
        <button>
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
                <b>{searchres.topic}</b>
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
