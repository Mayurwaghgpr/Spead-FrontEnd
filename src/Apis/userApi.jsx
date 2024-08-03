import axios from "axios";
import React from "react";

function userApi() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getLogInUserData = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/user/logedInuser`, {
        withCredentials: true,
      });
      console.log(result);
      return result.data;
    } catch (error) {}
  };

  const followUser = async ({ followerId, followedId }) => {
    try {
      const result = await axios.put(
        `${BASE_URL}/user/follow/`,
        { followerId, followedId },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  const unfollowUser = async ({ followerId, followedId }) => {
    try {
      const result = await axios.post(
        `${BASE_URL}/user/unfollow`,
        { followerId, followedId },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.respons);
    }
  };

  const ArchivePost = async (postId) => {
    try {
      const result = await axios.put(
        `${BASE_URL}/user/Archive`,
        { postId },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {}
  };
  const getArchivedPosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/user/ArchivedPost`, {
        withCredentials: true,
      });
      return result.data;
    } catch (error) {}
  };
  return {
    followUser,
    unfollowUser,
    ArchivePost,
    getArchivedPosts,
    getLogInUserData,
  };
}

export default userApi;
