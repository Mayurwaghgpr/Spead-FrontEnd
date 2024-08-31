import axios from "axios";
import React from "react";

function userApi() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getLogInUserData = async () => {
    console.log("persisted");
    try {
      const result = await axios.get(`${BASE_URL}/user/loggedInUser`, {
        withCredentials: true,
      });
      console.log(result);
      return result.data;
    } catch (error) {
      throw error;
    }
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
      throw new Error(error.respons);
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
  const getArchivedPosts = async ({ pageParam }) => {
    try {
      const result = await axios.get(`${BASE_URL}/user/archivedPosts`, {
        withCredentials: true,
        params: {
          page: pageParam,
          limit: 3,
        },
      });
      return result.data;
    } catch (error) {}
  };
  const removePostFromArchive = async (id) => {
    console.log(id);
    try {
      const result = await axios.delete(
        `${BASE_URL}/user/removeFromArchive?id=${id}`,
        {
          withCredentials: true,
        }
      );
      console.log({ result });
      return result.data;
    } catch (error) {}
  };

  const fetchFollowInfo = async ({ FollowInfo, profileId }) => {
    console.log({ FollowInfo, profileId });
    try {
      const result = await axios.get(
        `${BASE_URL}/user/${FollowInfo}/${profileId}`,
        {
          withCredentials: true,
        }
      );
      return result.data;
    } catch (error) {}
  };
  return {
    followUser,
    unfollowUser,
    ArchivePost,
    getArchivedPosts,
    getLogInUserData,
    removePostFromArchive,
    fetchFollowInfo,
  };
}

export default userApi;
