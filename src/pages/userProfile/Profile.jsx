import React, { useEffect, useCallback, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import PostPreview from "../../component/postsComp/PostPreview";
import { fetchUserData, fetchUserProfile } from "../../Apis/ProfileApis";
import { setuserProfile } from "../../redux/slices/profileSlice";
import ScrollToTopButton from "../../component/otherUtilityComp/ScrollToTopButton";
import ProfileHeader from "./component/ProfileHeader";
import { useInfiniteQuery, useQuery } from "react-query";
import PeoplesList from "../../component/PeoplesList";
import Spinner from "../../component/loaders/Spinner";

function Profile() {
  const dispatch = useDispatch();
  const params = useParams();
  const intObserver = useRef();
  const { isLogin, user } = useSelector((state) => state.auth);

  const profileId = params.id || user?.id;

  const {
    isError,
    isFetching,
    isLoading,
    data: userProfile,
  } = useQuery(
    ["userProfile", profileId],
    async () => fetchUserProfile(profileId),
    {
      onSuccess: async (data) => dispatch(setuserProfile(data)),
    }
  );

  const {
    data: postsData,
    isError: isPostError,
    isFetchingNextPage,
    isLoading: postIsLoading,
    fetchNextPage,
    hasNextPage,
    error: postError,
  } = useInfiniteQuery(
    ["Userposts", profileId],
    ({ pageParam = 1 }) => fetchUserData(profileId, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length ? allPages.length + 1 : undefined;
      },
      retry: false,
    }
  );

  const lastpostRef = useCallback(
    (post) => {
      if (postIsLoading || isFetching || !hasNextPage || isPostError) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
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

  if (isLoading) {
    return <h1>Loading profile data...</h1>;
  }

  if (isError || (isPostError && postError?.message !== "404")) {
    return <h1>Error {postError?.message}. Please try again.</h1>;
  }

  return (
    <div className="flex justify-end">
      <div className="w-[900px] flex flex-col h-full">
        <div id="Profile" className="flex-grow">
          <ProfileHeader
            userProfile={userProfile}
            profileId={profileId}
            user={user}
          />
          <div className="w-full flex  gap-5 p-2 px-4">
            <div className="w-full flex gap-5">
              <p className="hover:underline cursor-pointer">Home</p>
              <p className="hover:underline cursor-pointer">About</p>
            </div>
          </div>
          <div
            className={`lg:px-5 p-3 pt-5 min-h-[50vh] ${
              !postsData?.pages?.length && "flex justify-center items-center"
            }`}
          >
            {postsData?.pages.length > 0 ? (
              postsData?.pages?.map((page) =>
                page?.map((post, idx) => {
                  return (
                    <PostPreview
                      ref={page?.length === idx + 1 ? lastpostRef : null}
                      key={post.id}
                      post={post}
                    />
                  );
                })
              )
            ) : profileId === user?.id ? (
              <div className="max-w-[600px] min-w-[200px] w-full   flex flex-col justify-center items-center text-2xl border-dashed border-2 rounded-lg max-h-[300px] h-full min-h-[200px]">
                No posts yet{" "}
                {isLogin && (
                  <Link
                    to="/write"
                    className="text-slate-500 font-thin hover:text-slate-800"
                  >
                    Add New Post +
                  </Link>
                )}
              </div>
            ) : null}
            {isFetchingNextPage && (
              <div className="w-full flex justify-center items-center h-24 ">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lg:flex flex-col top-0 right-0 sticky text-md   hidden h-screen max-w-[350px] gap-2 mr-2 w-full sm:min-w-[300px]">
        <div className=" flex px-5  flex-col justify-center  mt-2 h-full pt-6  bg-slate-50 rounded-xl border items-start gap-3">
          {/* <div className="flex justify-center items-center gap-1  py-1 px-3 ">
            <span>{postsData?.length || 0}</span>
            <h1>Posts</h1>
          </div> */}
          <div className="flex justify-center items-center h-full  gap-1 py-1 px-3   ">
            <span>{userProfile?.Followers?.length}</span>
            <h1>Followers</h1>
          </div>
          <ul className="flex w-full flex-col items-start px-2 gap-3 min-h-full">
            {userProfile?.Followers?.map((Follower, idx) => (
              <PeoplesList key={Follower.id} people={Follower} index={idx} />
            ))}
          </ul>
        </div>
        <div className="flex px-5 flex-col h-full  bg-slate-50 rounded-xl border  items-start gap-4 p-3">
          <div className=" flex gap-1 justify-center items-center ">
            {" "}
            <span>{userProfile?.Following?.length}</span>
            <h1>Following</h1>
          </div>

          <ul className="flex w-full flex-col items-start px-2 gap-3 min-h-full">
            {userProfile?.Following?.map((followings, idx) => (
              <PeoplesList
                key={followings.id}
                people={followings}
                index={idx}
              />
            ))}
          </ul>
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
}

export default Profile;
