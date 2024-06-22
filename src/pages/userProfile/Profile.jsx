import React, { useEffect, useState, Suspense, lazy, useContext } from "react";
import image from "../../assets/siginimage.png";
import PostPriview from "../../component/PostPreview";
import { fetchUserProfile } from "../../Handlers/ProfileHandler";
import UserContext from "../../context/UserContext";
import { useLocation, Link } from "react-router-dom";
function Profile() {
  const { user, data, setData, isLogin } = useContext(UserContext);
  const [userProfile, setuserProfile] = useState([]);
  const location = useLocation();
  const Admin = localStorage.getItem("Admin profile");
  const otherUser = localStorage.getItem("otherUser");
  const fetchUser = async (id, storagekey) => {
    const response = await fetchUserProfile(location.state.id);
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
  // useEffect(() => {}, []);
  console.log("this", userProfile[0]);
  return (
    <main className="grid  grid-cols-11   h-screen ">
      <div className="h-screen col-span-11 lg:col-start-3 lg:col-span-7 ">
        <div className="flex flex-col gap-4 bg-white border-b">
          <div className="grid grid-flow-col grid-cols-5 items-center ">
            <div className="flex p-3 flex-col col-span-1 gap-2 justify-center items-center">
              <div className="relative flex justify-center  items-center h-[90px] w-[90px] rounded-full bg-slate-500">
                <img
                  className="h-[80px] w-[80px] rounded-full"
                  src={image}
                  alt=""
                />
                <span className="absolute flex justify-center items-center bg-lime-200 rounded-full h-[20px] w-[20px] bottom-0 right-1">
                  +
                </span>
              </div>
              <h1 className="">{userProfile[0]?.username}</h1>
            </div>
            <div className="flex col-span-4 ps-5 justify-start items-center text-3xl">
              <h1>
                Posts <span></span>
              </h1>
            </div>
          </div>
          <div className="h-full w-full px-3">
            {" "}
            {location.state.id === user.id && (
              <span className=" border w-full block text-center rounded-lg transition-colors duration-300 hover:bg-slate-200 my-2 ">
                Edit Profile
              </span>
            )}{" "}
          </div>
        </div>
        <div
          className={`px-5 pt-5 min-h-[50vh] ${
            !data.length > 0 && "flex justify-center items-center "
          }`}
        >
          {data.length > 0 ? (
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
    </main>
  );
}

export default Profile;
