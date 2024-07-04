import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import PostPreview from "../../component/PostPreview";
import { fetchUserData } from "../../Handlers/ProfileHandler";
import { setErrNotify } from "../../redux/slices/uiSlice";
import { setuserProfile } from "../../redux/slices/profileSlice";
import { setData } from "../../redux/slices/postSlice";
import { useFetchUserProfileQuery } from "../../redux/slices/porfileApi";

function Profile() {
  const dispatch = useDispatch();
  const params = useParams();
  const { userProfile } = useSelector((state) => state.profile);
  const { postsData } = useSelector((state) => state.posts);
  const { isLogin, user } = useSelector((state) => state.auth);

  const [profileId, setProfileId] = useState(params.id || user.id);
  const { data, isError, isLoading } = useFetchUserProfileQuery(profileId, {
    skip: !profileId,
  });

  useEffect(() => {
    if (data) {
      dispatch(setuserProfile(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (params.id) {
      setProfileId(params.id);
    }
  }, [params.id]);

  const fetchData = useCallback(async () => {
    dispatch(setData([]));
    const result = await fetchUserData(profileId);
    if (result.status === 200) {
      dispatch(setData(result.data));
    } else {
      dispatch(
        setErrNotify({
          message: `${result.status} ${result.data}`,
          status: true,
        })
      );
    }
  }, [dispatch, profileId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading profile data. Please try again.</h1>;
  }

  return (
    <main className="grid grid-cols-11 h-screen">
      <div className="col-span-11 lg:col-start-3 lg:col-span-7">
        <div className="flex flex-col gap-4 bg-white border-b p-4">
          <div className="flex w-full justify-between sm:px-3">
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex justify-center min-w-[50px] h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] items-center rounded-full">
                <img
                  className="w-full h-full rounded-full"
                  src={`${import.meta.env.VITE_BASE_URL}/${
                    userProfile?.userImage
                  }`}
                  alt={userProfile?.username}
                />
              </div>
              <div className="flex flex-col lg:gap-2">
                <h1 className="lg:text-2xl text-sm font-bold">
                  {userProfile?.username}
                </h1>
                <div className="flex items-center gap-2">
                  <h1>Followers</h1>
                  <span>22</span>
                </div>
                <div className="flex items-center gap-3">
                  <h1>Posts</h1>
                  <span>{postsData?.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:px-3">
            <p>{userProfile?.userInfo}</p>
          </div>
          <div className="flex justify-between">
            {profileId !== user.id ? (
              <button className="py-2 px-4 w-full sm:w-[150px] bg-orange-400 rounded-3xl hover:outline">
                Follow +
              </button>
            ) : (
              <Link
                to="/profileEditor"
                className="w-[100px] text-sm rounded-lg transition-colors duration-300 hover:text-blue-500 my-2 mx-2"
              >
                Edit Profile
              </Link>
            )}
          </div>
        </div>
        <div className="w-full flex bg-white gap-5 p-2 px-4">
          <div className="w-full flex gap-5">
            <p className="hover:underline cursor-pointer">Home</p>
            <p className="hover:underline cursor-pointer">About</p>
          </div>
        </div>
        <div
          className={`lg:px-5 pt-5 min-h-[50vh] ${
            !postsData?.length && "flex justify-center items-center"
          }`}
        >
          {postsData?.length ? (
            <PostPreview />
          ) : (
            profileId === user.id && (
              <article className="max-w-[600px] w-[600px] flex flex-col justify-center items-center text-2xl border-dashed border-2 rounded-lg max-h-[300px] h-[300px]">
                No post yet{" "}
                {isLogin && (
                  <Link
                    to="/write"
                    className="text-slate-500 font-thin hover:text-slate-800"
                  >
                    Add New Post +
                  </Link>
                )}
              </article>
            )
          )}
        </div>
      </div>
      <div className="lg:col-span-2 lg:block hidden">
        <div className="flex justify-center p-3">
          <h1>Following</h1>
        </div>
      </div>
    </main>
  );
}

export default Profile;
