import React, { useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useInfiniteQuery, useQuery } from "react-query";

// import ScrollToTopButton from "../component/otherUtilityComp/ScrollToTopButton";
import PostPreview from "../component/postsComp/PostPreview";
import SomthingWentWrong from "./ErrorPages/somthingWentWrong";
import Spinner from "../component/loaders/Spinner";
import useLastPostObserver from "../hooks/useLastPostObserver";
import usePublicApis from "../Apis/publicApis";
import Aside from "../component/homeComp/Aside";
import PostsApis from "../Apis/PostsApis";

function Viewblogs() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLogin, user } = useSelector((state) => state.auth);
  const { userPrepsData } = usePublicApis();
  const { fetchDataAll } = PostsApis();

  const selectedTopic = searchParams.get("topic");

  const {
    isLoading: isLoadingPreps,
    isFetching: fetchingPreps,
    error: errorPreps,
    data: prepsData,
  } = useQuery("userPreps", userPrepsData, {
    staleTime: 1000 * 60 * 10,
  });

  const {
    data: postsData,
    error: errorPosts,
    isError: isPostError,
    isFetching,
    isFetchingNextPage,
    isLoading: isLoadingPosts,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ["Allposts", selectedTopic],
    ({ pageParam = 1 }) => fetchDataAll({ pageParam, topic: selectedTopic }),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage?.length ? allPages.length + 1 : undefined,
      retry: false,
    }
  );
  console.log(postsData);

  const { lastpostRef } = useLastPostObserver(
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage
  );

  const handleTopicClick = useCallback(
    (topic) => {
      setSearchParams({ topic });
      refetch();
    },
    [setSearchParams, refetch]
  );

  if (errorPreps || (errorPosts && errorPosts?.status !== 404)) {
    return (
      <SomthingWentWrong
        cause={errorPosts?.status || errorPreps?.status}
        message={
          errorPreps?.data ||
          errorPosts?.data ||
          "An error occurred while loading content. Please try again later."
        }
      />
    );
  }

  return (
    <main className="flex flex-col relative sm:flex-row   justify-end  w-full bottom-0 border-inherit transition-all duration-300 ease-in-out dark:border-[#383838]">
      {/* <div className=" relative  w-[20rem] lg:block hidden">
        <Aside
          className="lg:flex hidden  flex-col w-full px-10 py-3 justify-center border sticky  top-16  "
          FechingPreps={fetchingPreps}
          isLoadingPreps={isLoadingPreps}
          PrepsData={prepsData}
          handleTopicClick={handleTopicClick}
        />
      </div> */}
      <div className="flex flex-col items-end dark:bg-[#222222] relative bg-white mt-5 w-[43rem]  mx-10">
        <div className="flex transition-all duration-200 dark:border-[#383838] ease-in-out z-[5] bg-inherit border rounded-lg  items-center px-5 py-2  justify-start gap-3 w-full overflow-auto sticky top-20  no-scrollbar">
          <ul className="flex gap-3 h-full mt-2 border-inherit">
            <li className="rounded-full capitalize">
              <button
                className="t-btn"
                onClick={() => handleTopicClick("All")}
                aria-label="Select all topics"
              >
                All
              </button>
            </li>
            <li>
              <Link to="#" aria-label="Specialization">
                Specialization
              </Link>
            </li>
          </ul>
        </div>
        <div
          id="PostContainer"
          className={`relative flex flex-col gap-3  mt-16 ${
            !postsData && " py-10 "
          } w-full lg:w-[730px] max-w-[730px] min-h-screen snap-center sm:px-10 dark:border-[#383838]`}
        >
          {!isLoadingPosts
            ? postsData?.pages?.map((page) =>
                page.map((post, idx, arr) => (
                  <PostPreview
                    className="border-inherit p-3"
                    ref={
                      arr?.length > 3 && arr?.length === idx + 1
                        ? lastpostRef
                        : null
                    }
                    key={post?.id}
                    post={post}
                  />
                ))
              )
            : [...Array(10)].map((_, idx) => (
                <PostPreview className="border-inherit" key={idx} />
              ))}
          {isFetchingNextPage && (
            <div className="w-full flex justify-center items-center h-full p-5">
              <Spinner />
            </div>
          )}
          {!postsData && (
            <div className="flex justify-center items-center w-full h-full text-3xl ">
              <h2>No posts</h2>
            </div>
          )}
        </div>
      </div>
      <div className="relative border-inherit">
        {" "}
        <Aside
          className="lg:flex hidden  border-inherit flex-col w-[24rem] min-h-screen px-10 py-3 justify-start sticky gap-5  top-16  "
          FechingPreps={fetchingPreps}
          isLoadingPreps={isLoadingPreps}
          PrepsData={prepsData}
          handleTopicClick={handleTopicClick}
        />
      </div>
    </main>
  );
}

export default Viewblogs;
