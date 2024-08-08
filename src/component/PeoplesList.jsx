import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profileIcon from "/vecteezy_user-profile-vector-flat-illustration-avatar-person-icon_37336395.png";
import ProfilImage from "./ProfilImage";
import userApi from "../Apis/userApi";
import { useMutation } from "react-query";
function PeoplesList({ people, index }) {
  const { user } = useSelector((state) => state.auth);
  const { followUser, unfollowUser } = userApi();
  const followMutation = useMutation((followIds) => followUser(followIds), {
    onSuccess: (data) => {
      // localStorage.setItem("userAccount", JSON.stringify(data));
      dispatch(setUser(data));
      // console.log("success ", data);
    },
    onError: () => {
      console.log("error");
    },
  });
  const unfollowMutation = useMutation((followIds) => unfollowUser(followIds), {
    onSuccess: (data) => {
      // localStorage.setItem("userAccount", JSON.stringify(data.data));
      dispatch(setUser(data.data));
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  // console.log("people?.Followers");
  return (
    <li
      className="flex mt-2 justify-between px-2 w-full  gap-3  capitalize items-center"
      key={people?.id}
      id={people?.id}
    >
      <Link
        className="flex gap-2 justify-between"
        to={`/profile/@${people?.username.split(" ").join("")}/${people?.id}`}
      >
        <ProfilImage
          className="h-[30px] rounded-full w-[30px]"
          imageUrl={
            people?.userImage
              ? `${import.meta.env.VITE_BASE_URL}/${people?.userImage}`
              : profileIcon
          }
          alt={`${people?.username}'s profile picture`}
        />
        <div className="flex ms-3 gap-2  justify-center flex-col items-start">
          <h1 className=" font-bold">{people?.username}</h1>
          <p className="max-w-[127px] max-h-10  overflow-hidden overflow-ellipsis ">
            {people?.userInfo}
          </p>
        </div>
      </Link>
      {user?.Following?.some((followedId) => followedId?.id === people?.id) ? (
        <button
          onClick={() =>
            unfollowMutation.mutate({
              followerId: user.id,
              followedId: people?.id,
            })
          }
          className="bg-sky-100 p-2 max-w-[75px]  overflow-hidden overflow-ellipsis rounded-full"
        >
          Following
        </button>
      ) : (
        <button
          onClick={() =>
            followMutation.mutate({
              followerId: user.id,
              followedId: people?.id,
            })
          }
          className="bg-sky-100 min-w-[75px] p-2 rounded-full"
        >
          Follow
        </button>
      )}
    </li>
  );
}

export default memo(PeoplesList);
