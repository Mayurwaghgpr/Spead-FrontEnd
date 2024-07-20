import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import PostPreview from "../../component/postsComp/PostPreview";
import { fetchUserData } from "../../Apis/ProfileApis";
// import { setErrNotify } from "../../redux/slices/uiSlice";
import { setuserProfile } from "../../redux/slices/profileSlice";
import { useFetchUserProfileQuery } from "../../redux/slices/porfileApi";
import ScrollToTopButton from "../../component/otherUtilityComp/ScrollToTopButton";
import ProfileHeader from "./component/ProfileHeader";
import { useInfiniteQuery } from "react-query";
import MainNavBar from "../../component/header/MainNavBar";

function Profile() {
  const dispatch = useDispatch();
  const params = useParams();
  const { userProfile } = useSelector((state) => state.profile);
  const { isLogin, user } = useSelector((state) => state.auth);

  const profileId = params.id || user.id;

  const { data, isError, isLoading } = useFetchUserProfileQuery(profileId, {
    skip: !profileId,
  });

  useEffect(() => {
    if (data) {
      dispatch(setuserProfile(data));
    }
  }, [data, dispatch]);

  const {
    data: postsPage,
    isError: postError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery(
    ["Userposts", profileId],
    ({ pageParam = 1 }) => fetchUserData(profileId, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length ? allPages.length : undefined;
      },
    }
  );
  // console.log("error", error);

  const handleInfinityScroll = useCallback(() => {
    // if (error || postError || !hasNextPage || isFetchingNextPage) return;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, error, postError, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfinityScroll);
    return () => window.removeEventListener("scroll", handleInfinityScroll);
  }, [handleInfinityScroll]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading profile data. Please try again.</h1>;
  }

  return (
    <>
      <MainNavBar />
      <div className="flex justify-end">
        <div className="w-[900px] flex flex-col h-full">
          <div id="Profile" className="flex-grow">
            <ProfileHeader
              userProfile={userProfile}
              profileId={profileId}
              user={user}
            />
            <div className="w-full flex bg-white gap-5 p-2 px-4">
              <div className="w-full flex gap-5">
                <p className="hover:underline cursor-pointer">Home</p>
                <p className="hover:underline cursor-pointer">About</p>
              </div>
            </div>
            <main
              className={`lg:px-5 pt-5 min-h-[50vh] ${
                !postsPage?.pages?.length && "flex justify-center items-center"
              }`}
            >
              {Boolean(postsPage?.pages?.length)
                ? postsPage.pages.flatMap((page, pageIndex) =>
                    page?.posts?.map((post) => (
                      <PostPreview key={post.id} post={post} />
                    ))
                  )
                : profileId === user?.id && (
                    <article className="max-w-[600px] w-[600px] flex flex-col justify-center items-center text-2xl border-dashed border-2 rounded-lg max-h-[300px] h-[300px]">
                      No posts yet{" "}
                      {isLogin && (
                        <Link
                          to="/write"
                          className="text-slate-500 font-thin hover:text-slate-800"
                        >
                          Add New Post +
                        </Link>
                      )}
                    </article>
                  )}
            </main>
          </div>
        </div>
        <div className="lg:block right-0 sticky top-0 bg-gray-400 hidden h-screen max-w-[300px] sm:min-w-[300px]">
          <div className="flex  bg-orange-200 justify-center p-3">
            <h1>Following</h1>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default Profile;
