import React from "react";

import { Link } from "react-router-dom";

import profileIcon from "/vecteezy_user-profile-vector-flat-illustration-avatar-person-icon_37336395.png";

const ProfileHeader = React.memo(
  ({ userProfile, profileId, user, postsData }) => (
    <div className="flex flex-col justify-evenly  border  rounded-xl mt-2 bg-slate-100 sm:mx-2 p-4 ">
      <div className="flex w-full justify-start items-center flex-col gap-2 sm:px-3">
        <div className="relative flex sm:flex-row h-full border-b p-2  w-full justify-start min-w-20 items-center   gap-2 sm:gap-8">
          <div className="flex  w-full justify-start items-center gap-3 ">
            <img
              className="sm:w-[80px] sm:h-[80px] h-[60px] w-[60px]  items-center  cursor-pointer rounded-full   object-cover object-top  "
              src={
                userProfile?.userImage
                  ? `${import.meta.env.VITE_BASE_URL}/${userProfile.userImage}`
                  : profileIcon
              }
              alt={userProfile?.username}
            />
            <div className="">
              <h1 className="lg:text-5xl text-sm font-medium">
                {userProfile?.username}
              </h1>
              <span className=" font-light sm:text-md text-sm">he/him</span>
            </div>
          </div>
          {profileId === user.id && (
            <Link
              to="/profileEditor"
              className="w-[100px] text-2xl absolute top-0 right-0  rounded-lg transition-colors duration-300 text-blue-600 my-2 mx-2"
            >
              <i className="bi bi-pencil"></i>
            </Link>
          )}
          <div className="flex sm:hidden font-light  justify-start  items-start h-full  gap-1 px-3  ">
            <span>{userProfile?.Followers?.length}</span>
            <h1>Followers</h1>
          </div>
        </div>
      </div>
      <div className="sm:px-3 font-light py-4 text-sm max-w-[60%] min-h-10 h-full  my-1 ">
        <p className=" h-full lg:block hidden  break-words ">
          {userProfile?.userInfo} Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Suscipit, aliquid. Molestiae quas mollitia veniam
          amet nam repellat, saepe temporibus incidunt consequuntur quasi
        </p>
      </div>
      <div className="flex justify-between ">
        {profileId !== user.id && (
          <button className="py-1 px-4 text-md sm:max-w-[100px]  w-full shadow-inner  font-light  bg-sky-200 rounded-3xl hover:bg-sky-300  transition-all duration-300 ">
            Follow +
          </button>
        )}
      </div>
    </div>
  )
);

export default ProfileHeader;
