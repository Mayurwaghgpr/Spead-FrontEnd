import React, { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setData, setTopiclist } from "../redux/slices/postSlice";
import ScrollToTopButton from "../component/otherUtilityComp/ScrollToTopButton";
import profileIcon from "/user.png";
import PostPreview from "../component/postsComp/PostPreview";
import { useInfiniteQuery, useQuery } from "react-query";
import { publiUtilityData, fetchDataAll } from "../Apis/publicApis";
import SomthingWentWrong from "./ErrorPages/somthingWentWrong";
import FollowPeopleLoder from "../component/loaders/FollowPeopleLoder";
import TopicsSkeletonLoader from "../component/loaders/TopicsSkeletonLoader";
import MainNavBar from "../component/header/MainNavBar";

function Viewblogs() {
  const dispatch = useDispatch();
  const { postsData, topiclist } = useSelector((state) => state.posts);
  const { isLogin, user } = useSelector((state) => state.auth);
  const [selectedTopic, setSelectedTopic] = useState("");

  const {
    isLoading,
    error,
    data: utilsData,
  } = useQuery("/utilsData", publiUtilityData, {
    onSuccess: (data) => {
      dispatch(setTopiclist(data.topics));
    },
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });

  const {
    data,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ["posts", selectedTopic],
    ({ pageParam = 1 }) => fetchDataAll({ pageParam, topic: selectedTopic }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length ? allPages?.length + 1 : undefined;
      },
      onSuccess: ({ pages }) => {
        // console.log("suss", pages);
        dispatch(setData(...pages));
      },
    }
  );

  const handleInfinityScroll = useCallback(
    (e) => {
      if (error || isError) {
        e.preventDefault();
      }
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage, error, isError]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleInfinityScroll);
    return () => window.removeEventListener("scroll", handleInfinityScroll);
  }, [handleInfinityScroll]);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    refetch();
  };

  if (error || isError) {
    return <SomthingWentWrong />;
  }
  return (
    <>
      {" "}
      <MainNavBar />
      <div className="flex sm:mx-7">
        <div className="flex w-full sm:items-start">
          <div className="sm:flex justify-between h-screen flex-col p-3 hidden text-xl w-full max-w-[368px] border-e sticky top-0 overflow-y-auto">
            <div className="flex flex-col pe-4 w-full h-full items-center text-start gap-2">
              <h1 className="font-medium text-start w-full sm:text-sm lg:text-lg xl:text-xl">
                Trending topics
              </h1>
              <div className="flex justify-center items-end flex-col">
                {!isLoading ? (
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
              {!isLoading ? (
                <ul className="py-3 w-full flex flex-wrap gap-3">
                  {utilsData?.AllSpreadUsers.map((el, index) => (
                    <li
                      className="flex mt-2 justify-between px-2 w-full  gap-3 items-start capitalize"
                      key={index}
                      id={el.id}
                    >
                      <Link
                        className="flex gap-2 justify-between"
                        to={`/profile/@${el.username.split(" ").join("")}/${
                          el.id
                        }`}
                      >
                        <img
                          className="h-[30px] rounded-full w-[30px]"
                          src={
                            el?.userImage
                              ? `${import.meta.env.VITE_BASE_URL}/${
                                  el.userImage
                                }`
                              : profileIcon
                          }
                          alt={`${el.username}'s profile picture`}
                        />
                        <div className="flex ms-3 gap-2  justify-center flex-col items-start">
                          <h1 className=" font-bold">{el?.username}</h1>
                          <p className="max-w-[127px] max-h-10  overflow-hidden overflow-ellipsis ">
                            {el.userInfo}
                          </p>
                        </div>
                      </Link>
                      <button className="bg-slate-100 p-2 rounded-full">
                        {" "}
                        Follow
                      </button>
                    </li>
                  ))}
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-100 to-transparent pointer-events-none rounded-bl-sm rounded-br-sm"></div>
                </ul>
              ) : (
                <FollowPeopleLoder items={5} />
              )}
              <button className="w-full self-center p-1 hover:bg-sky-200 rounded-md transition-all duration-75-200">
                Load more
              </button>
            </div>
          </div>
          <main className="sm:mx-10">
            <ul className="flex z-20 sticky top-0 bg-slate-50 border-b pl-5 pt-4 pb-2 h-[3rem] w-full justify-start items-center gap-3">
              <li className="rounded-full capitalize">
                <button className="t-btn" onClick={() => handleTopicClick("")}>
                  Your Feed
                </button>
              </li>
              <li>
                <Link to="#">Specialization</Link>
              </li>
            </ul>
            <div
              id="PostContainer"
              className="flex flex-col sm:min-w-[800px] w-full sm:w-[700px] max-w-[900px]"
            >
              {data?.pages?.map(
                (page, pageIndex) =>
                  Array.isArray(page) &&
                  page.map((post) => <PostPreview key={post.id} post={post} />)
              )}
            </div>
            {isFetching && <div>Loading.....</div>}
          </main>
          {!hasNextPage && <ScrollToTopButton />}
        </div>
      </div>
    </>
  );
}

export default Viewblogs;
