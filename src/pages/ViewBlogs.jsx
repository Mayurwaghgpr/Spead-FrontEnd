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
import Aside from "../component/Aside";
import nopost from "../assets/3385493.webp";

function Viewblogs() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLogin, user } = useSelector((state) => state.auth);
  const { userPrepsData, fetchDataAll } = usePublicApis();

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
    ["posts", selectedTopic],
    ({ pageParam = 1 }) => fetchDataAll({ pageParam, topic: selectedTopic }),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage?.length ? allPages.length + 1 : undefined,
      retry: false,
    }
  );

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
    <main className="flex flex-col sm:flex-row justify-center bottom-0 border-inherit transition-all duration-300 ease-in-out dark:border-[#383838]">
      <Aside
        className="lg:flex gap-20 h-screen border-inherit transition-all duration-200 ease-in-out flex-col p-3 hidden text-xl w-full max-w-[350px] fixed top-16 left-0 py-8 border-e px-10 box-border"
        FechingPreps={fetchingPreps}
        isLoadingPreps={isLoadingPreps}
        PrepsData={prepsData}
        handleTopicClick={handleTopicClick}
      />
      <div className=" dark:bg-[#222222] relative bg-white  mt-16">
        <div className="flex transition-all duration-200 dark:border-[#383838] ease-in-out z-[5] bg-inherit border-b px-5 h-[3rem] mb-1 justify-start gap-3 w-full fixed top-16">
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
          className={`relative flex flex-col ${
            !postsData && " py-10 "
          } w-full lg:w-[730px] max-w-[730px] min-h-screen snap-center sm:px-10 dark:border-[#383838]`}
        >
          {!isLoadingPosts
            ? postsData?.pages?.map((page) =>
                page?.map((post, idx) => (
                  <PostPreview
                    className="border-inherit"
                    ref={
                      page?.length > 3 && page?.length === idx + 1
                        ? lastpostRef
                        : null
                    }
                    key={post.id}
                    post={post}
                  />
                ))
              )
            : [...Array(4)].map((_, idx) => (
                <PostPreview className="border-inherit" key={idx} />
              ))}
          {isFetchingNextPage && (
            <div className="w-full flex justify-center items-center h-full p-5">
              <Spinner />
            </div>
          )}
          {!postsData && !isLoadingPosts && (
            <div className="relative w-full flex text-inherit text-black justify-center h-[70vh] flex-col items-center">
              <h1 className="absolute text-6xl font-roboto">No Posts</h1>
              {/* <img className="" src={nopost} alt="No posts" loading="lazy" /> */}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Viewblogs;
