import React, { useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTopiclist } from "../redux/slices/postSlice";
import ScrollToTopButton from "../component/otherUtilityComp/ScrollToTopButton";
import PostPreview from "../component/postsComp/PostPreview";
import { useInfiniteQuery, useQuery } from "react-query";
import SomthingWentWrong from "./ErrorPages/somthingWentWrong";
import FollowPeopleLoader from "../component/loaders/FollowPeopleLoader";
import TopicsSkeletonLoader from "../component/loaders/TopicsSkeletonLoader";
import PeoplesList from "../component/PeoplesList";
import Spinner from "../component/loaders/Spinner";
import useLastPostObserver from "../hooks/useLastPostObserver";
import useScrollDirection from "../hooks/useScrollDirection";
import { setToast } from "../redux/slices/uiSlice";
import nopost from "../assets/3385493.webp";
import usePublicApis from "../Apis/publicApis";

function Viewblogs() {
  const { maintransformY } = useScrollDirection();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { topiclist } = useSelector((state) => state.posts);
  const { isLogin, user } = useSelector((state) => state.auth);

  const { userPrepsData, fetchDataAll } = usePublicApis();

  const selectedTopic = searchParams.get("topic");

  const {
    isLoading: isLoadingPreps,
    isFetching: FechingPreps,
    error: errorPreps,
    data: PrepsData,
  } = useQuery("userPreps", userPrepsData, {
    onSuccess: (data) => {
      dispatch(setTopiclist(data.topics));
    },
    staleTime: 1000 * 60 * 10,
  });

  const {
    data: postsData,
    error: errorPosts,
    isError: ispostError,
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
      onError: () => {},
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
  console.log(errorPosts);
  if (
    errorPreps !== null ||
    (errorPosts !== null && errorPosts?.status !== 404)
  ) {
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
  console.log(postsData);
  return (
    <main
      className="flex flex-col sm:flex-row  bottom-0 border-inherit transition-all duration-300 ease-in-out dark:border-[#383838]"
      style={{
        transform: `translateY(${maintransformY}px)`,
      }}
    >
      <aside
        className={`lg:flex gap-20 h-screen border-inherit transition-all duration-200 ease-in-out flex-col p-3 hidden text-xl w-full max-w-[368px] sticky top-0 py-8 border-e px-10 box-border`}
      >
        <div className="flex flex-col w-full h-full items-center text-start gap-2">
          <h1 className="font-normal text-start w-full sm:text-sm lg:text-md xl:text-lg">
            Suggested topics
          </h1>
          <div className="flex justify-center items-end flex-col">
            {!FechingPreps ? (
              <ul className="flex justify-start flex-wrap gap-2">
                {topiclist?.map(({ topic }, index) => (
                  <li
                    key={index}
                    className="text-[14px] font-normal rounded-full dark:bg-gray-600 bg-gray-100 px-3 py-1"
                  >
                    <button
                      className="t-btn"
                      onClick={() => handleTopicClick(topic)}
                      aria-label={`Select topic ${topic}`}
                    >
                      <span>{topic}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <TopicsSkeletonLoader items={7} />
            )}
          </div>
        </div>
        <div className="sticky flex flex-col justify-end h-full">
          <div className="h-full text-sm">
            <h1 className="font-normal text-start w-full sm:text-sm lg:text-md xl:text-lg">
              Follow People
            </h1>
            {!isLoadingPreps ? (
              <ul className="py-3 w-full flex flex-wrap gap-3">
                {PrepsData?.AllSpreadUsers?.map((el, index) => (
                  <PeoplesList key={el.id} people={el} index={index} />
                ))}
              </ul>
            ) : (
              <FollowPeopleLoader
                items={3}
                className={"flex h-8 w-full gap-2 my-4  "}
              />
            )}
            <button className="w-full self-center p-1 transition-all ease-in-out duration-300">
              See More
            </button>
          </div>
        </div>
      </aside>
      <div className="dark:bg-[#0f0f0f] bg-white">
        <div
          className={`flex transition-all duration-200 dark:border-[#383838] ease-in-out z-[5] bg-inherit border-b px-5 h-[3rem] mb-1 justify-start gap-3 sticky top-0`}
        >
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
                    className={"border-inherit"}
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
                <PostPreview className={"border-inherit"} key={idx} />
              ))}
          {isFetchingNextPage && (
            <div className="w-full flex justify-center items-center h-full p-5">
              <Spinner />
            </div>
          )}
          {!postsData && !isLoadingPosts && (
            <div className=" relative w-full flex text-inherit text-black justify-center flex-col items-center">
              <h1 className=" absolute text-2xl">Nod Post</h1>
              <img className="" src={nopost} alt="nopost" loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Viewblogs;
