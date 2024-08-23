import React, { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import userApi from "../Apis/userApi";
import PostPreview from "../component/postsComp/PostPreview";
import Spinner from "../component/loaders/Spinner";
import useLastPostObserver from "../hooks/useLastPostObserver";
import emptyPage from "../assets/empty-page.png";

const ReadList = () => {
  const { getArchivedPosts } = userApi();
  const {
    data,
    error,
    isError,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteQuery(
    ["posts"],
    ({ pageParam = 1 }) => getArchivedPosts({ pageParam }),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage?.length ? allPages.length + 1 : undefined,
      retry: false,
    }
  );

  const pages = useMemo(() => data?.pages || [], [data?.pages]);
  const hasPosts = pages?.some((page) => page?.length > 0);

  const { lastpostRef } = useLastPostObserver(
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage
  );

  return (
    <div className="relative w-full flex justify-center mt-6 items-center flex-col bg-inherit bg-white dark:*:border-[#383838] dark:bg-[#222222]">
      <div className="h-full flex justify-center flex-col items-center sm:w-[60%] w-full bg-inherit">
        <div className="sticky top-0 text-3xl font-medium z-[1] flex justify-start items-center border rounded-b-lg my-8 min-h-32 w-full bg-inherit">
          <div className="w-full px-5 h-full bg-inherit">
            <h1>Read List</h1>
          </div>
        </div>
        {hasPosts ? (
          <div
            id="PostContainer"
            className="relative flex flex-col h-full w-full px-3"
          >
            {pages.map(
              (page) =>
                Array.isArray(page) &&
                page.map((post, idx) => (
                  <PostPreview
                    className={" "}
                    ref={page.length === idx + 1 ? lastpostRef : null}
                    key={post.id}
                    post={post}
                    Saved={true}
                  />
                ))
            )}
            {isFetchingNextPage && (
              <div className="w-full flex justify-center items-center h-full p-5">
                <Spinner />
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full text-5xl font-light text-center h-[65vh] mt-9">
            <div className="relative w-full h-full">
              <img
                className="w-full h-full bg-inherit object-center object-scale-down"
                src={emptyPage}
                alt="Empty Page"
              />
            </div>
            <div className="w-full h-full absolute top-0 left-0 bottom-0 right-0">
              <h1>Empty!</h1>
              <p>Nothing to Read</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadList;
