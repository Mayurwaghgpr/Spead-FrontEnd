import React from "react";

import { Link } from "react-router-dom";

import profileIcon from "/user.png";

const ProfileHeader = React.memo(
  ({ userProfile, profileId, user, postsData }) => (
    <div className="flex flex-col gap-4 bg-white border-b p-4">
      <div className="flex w-full justify-between sm:px-3">
        <div className="flex items-center gap-4 w-full">
          <div className="relative z-0 flex justify-center min-w-[50px] h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] items-center rounded-full">
            <img
              className="w-full h-full rounded-full object-cover object-top"
              src={
                userProfile?.userImage
                  ? `${import.meta.env.VITE_BASE_URL}/${userProfile.userImage}`
                  : profileIcon
              }
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
          <button className="py-2 px-4 w-full sm:w-[150px] bg-sky-200 rounded-3xl hover:outline">
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
  )
);

export default ProfileHeader;
