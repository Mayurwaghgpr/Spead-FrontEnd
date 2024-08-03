import React, { useEffect, useCallback, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTopiclist } from "../redux/slices/postSlice";
import ScrollToTopButton from "../component/otherUtilityComp/ScrollToTopButton";
import profileIcon from "/user.png";
import PostPreview from "../component/postsComp/PostPreview";
import { useInfiniteQuery, useQuery } from "react-query";
import { userPrepsData, fetchDataAll } from "../Apis/publicApis";
import SomthingWentWrong from "./ErrorPages/somthingWentWrong";
import FollowPeopleLoader from "../component/loaders/FollowPeopleLoader";
import TopicsSkeletonLoader from "../component/loaders/TopicsSkeletonLoader";
import MainNavBar from "../component/header/MainNavBar";
import userApi from "../Apis/userApi";
import PeoplesList from "../component/PeoplesList";
import Spinner from "../component/loaders/Spinner";

function Viewblogs() {
  const dispatch = useDispatch();
  const intObserver = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  const { topiclist } = useSelector((state) => state.posts);
  const { isLogin, user } = useSelector((state) => state.auth);
  const selectedTopic = searchParams.get("topic");

  const {
    isLoading: isLoadingPreps,
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
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const lastpostRef = useCallback(
    (post) => {
      if (isLoadingPosts || isFetching || !hasNextPage || ispostError) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(
        (entries) => {
          // console.log("entries", entries[0]);
          if (entries[0].isIntersecting && hasNextPage) {
            // console.log("we are near last post");
            fetchNextPage();
          }
        },
        {
          threshold: 1.0,
        }
      );
      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  const handleTopicClick = (topic) => {
    setSearchParams({ topic });
    refetch();
  };

  if (errorPreps || errorPosts) {
    return <SomthingWentWrong />;
  }

  return (
    <div className="flex sm:mx-7">
      <div className="flex w-full sm:items-start">
        <div className="lg:flex justify-between min-h-screen flex-col p-3 hidden text-xl w-full max-w-[368px] border-e sticky top-0 overflow-y-auto">
          <div className="flex flex-col pe-4 w-full h-full items-center text-start gap-2">
            <h1 className="font-medium text-start w-full sm:text-sm lg:text-lg xl:text-xl">
              Trending topics
            </h1>
            <div className="flex justify-center items-end flex-col">
              {!isLoadingPreps ? (
                <ul className="flex justify-start flex-wrap gap-2">
                  {topiclist?.map(({ topic }, index) => (
                    <li
                      key={index}
                      className="border text-sm rounded-2xl bg-slate-100 px-2 py-0.5"
                    >
                      <button
                        className="t-btn"
                        onClick={() => handleTopicClick(topic)}
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
          <div className="h-full text-sm ">
            <h1 className="font-medium text-start w-full sm:text-sm lg:text-lg xl:text-xl">
              Follow People
            </h1>
            {!isLoadingPreps ? (
              <ul className="py-3 w-full flex flex-wrap gap-3">
                {PrepsData?.AllSpreadUsers?.map((el, index) => (
                  <PeoplesList key={el.id} people={el} index={index} />
                ))}
              </ul>
            ) : (
              <FollowPeopleLoader items={5} />
            )}
            <button className="w-full self-center p-1 hover:bg-sky-200 rounded-md transition-all duration-75-200">
              Load more
            </button>
          </div>
        </div>
        <div className="sm:mx-10">
          <ul className="flex z-20 sticky top-0 bg-slate-50 border-b pl-5 pt-4 pb-2 h-[3rem] w-full justify-start items-center gap-3">
            <li className="rounded-full capitalize">
              <button className="t-btn" onClick={() => handleTopicClick("All")}>
                Your Feed
              </button>
            </li>
            <li>
              <Link to="#">Specialization</Link>
            </li>
          </ul>
          <div
            id="PostContainer"
            className="relative flex flex-col lg:min-w-[800px] w-full lg:w-[700px] max-w-[900px]"
          >
            {postsData?.pages?.map((page) =>
              page?.map((post, idx) => {
                return (
                  <PostPreview
                    ref={page?.length === idx + 1 ? lastpostRef : null}
                    key={post.id}
                    post={post}
                  />
                );
              })
            )}
            {isFetchingNextPage && (
              <div className="w-full flex justify-center items-center h-full p-5">
                <Spinner />
              </div>
            )}
          </div>
        </div>
        {!hasNextPage && <ScrollToTopButton />}
      </div>
    </div>
  );
}

export default Viewblogs;
