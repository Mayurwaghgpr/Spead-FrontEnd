import React, { useEffect, useState, Suspense, lazy, useContext } from "react";
import image from "../../assets/siginimage.png";
import PostPriview from "../../component/PostPreview";
import { fetchUserData, fetchUserProfile } from "../../Handlers/ProfileHandler";
import UserContext from "../../context/UserContext";
import { useLocation, Link, Outlet } from "react-router-dom";
function Profile() {
  const { user, data, setData, isLogin, userProfile, setuserProfile } =
    useContext(UserContext);

  const location = useLocation();
  const Admin = localStorage.getItem("Admin profile");
  const otherUser = localStorage.getItem("otherUser");

  const fetchUser = async (id, storagekey) => {
    const response = await fetchUserProfile(id);
    if (response.status === 200) {
      localStorage.setItem(storagekey, JSON.stringify(response.data));
      setuserProfile(response.data);
    } else if (response.status === 404) {
    }
  };

  useEffect(() => {
    if (!Admin && location.state.id === user.id) {
      fetchUser(location.state.id, "Admin profile");
    } else if (Admin && location.state.id === user.id) {
      setuserProfile(JSON.parse(Admin));
    }
    if (!otherUser && location.state.id !== user.id) {
      fetchUser(location.state.id, "otherUser");
    } else if (otherUser && location.state.id !== user.id) {
      setuserProfile(JSON.parse(otherUser));
    }
  }, [location.state.id, otherUser, Admin, setuserProfile]);
  useEffect(() => {
    try {
      async function fetchdata() {
        const result = await fetchUserData(location.state.id);
        setData(result?.data);
      }
      fetchdata();
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log(userProfile.userImage);
  return (
    <main className="grid  grid-cols-11   h-screen ">
      <div className="h-screen col-span-11 lg:col-start-3 lg:col-span-7 ">
        <div className="flex flex-col gap-4 bg-white border-b p-4">
          <div className="flex justify-between gap-4 sm:px-3 ">
            <div className="flex gap-3 items-center sm:justify-start justify-between  w-full sm:items-start ">
              <div className="relative  flex justify-center min-w-[50px] h-[60px] w-[60px]  lg:h-[100px] lg:w-[100px]  items-center rounded-full">
                <img
                  className=" w-full h-full object-fill rounded-full"
                  src={"http://localhost:3000/" + userProfile[0]?.userImage}
                  alt=""
                />
              </div>
              <div className="flex flex-col lg:gap-3">
                <div className="w-full flex">
                  <h1 className="lg:text-2xl text-sm  font-bold ">
                    {userProfile[0]?.username}
                  </h1>
                </div>
                <div className="w-full flex   items-center gap-2">
                  <h1 className=" ">followers</h1>
                  <span>22</span>
                </div>
              </div>
            </div>
            <div className="w-full p-2 px-4 ">
              <div className="sm:flex hidden w-full sm:gap-3  sm:text-2xl">
                <h1 className=" ">Blogs</h1>
                <span>43</span>
              </div>
            </div>
          </div>
          <div className=" sm:px-3">
            {/* <p>{userProfile[0]?.userInfo}</p> */}
          </div>
          <div className="h-full w-full flex justify-between ">
            <div className=" w-full">
              {!location.state.id === user.id && (
                <button className="cursor-pointer py-2 px-4 w-full sm:w-[150px] hover:outline bg-orange-400 rounded-3xl">
                  follow +
                </button>
              )}{" "}
            </div>
            <div className="w-full flex justify-end">
              {location.state.id === user.id && (
                <Link
                  to={"/profileEditor"}
                  className="w-[100px] text-sm   text-lg rounded-lg transition-colors duration-300 hover:text-blue-500 my-2 mx-2 "
                >
                  Edit Profile
                </Link>
              )}{" "}
            </div>
          </div>
        </div>
        <div className="w-full flex bg-white gap-5  p-2 px-4 ">
          <div className=" w-full flex gap-5">
            <p className="hover:underline underline-offset-[10px] cursor-pointer ">
              Home
            </p>
            <p className="hover:underline underline-offset-[10px] cursor-pointer ">
              About
            </p>
          </div>

          <div className="flex sm:hidden w-full justify-end  items-center gap-2 ">
            <h1 className="">Blogs</h1>
            <span>43</span>
          </div>
        </div>
        <div
          className={`px-5 pt-5 min-h-[50vh] ${
            !data?.length > 0 && "flex justify-center items-center "
          }`}
        >
          {data?.length > 0 ? (
            <PostPriview />
          ) : (
            location.state.id === user.id && (
              <article className=" max-w-[600px] w-[600px] flex flex-col justify-center items-center text-2xl border-dashed border-2  rounded-lg max-h-[300px] h-[300px]">
                {" "}
                No post till yet{" "}
                {isLogin && (
                  <Link
                    className="text-slate-500 font-thin hover:text-slate-800"
                    to="/write"
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
