import React, { memo, useCallback, useMemo } from "react";
import userApi from "../../Apis/userApi";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

function Follow({ className, People }) {
  const { user } = useSelector((state) => state.auth);
  const { followUser, unfollowUser } = userApi();
  const queryClient = useQueryClient();
  const invalidateQueries = () => {
    queryClient.invalidateQueries(["userProfile"]);
    queryClient.invalidateQueries(["loggedInUser"]);
  };

  const { mutate: followMutation, isLoading: followLoading } = useMutation(
    followUser,
    {
      onSuccess: invalidateQueries,
      onError: () => console.error("Error following user"),
    }
  );

  const { mutate: unfollowMutation, isLoading: unfollowLoading } = useMutation(
    unfollowUser,
    {
      onSuccess: invalidateQueries,
      onError: (error) => {
        console.error("Error unfollowing user", error);
      },
    }
  );

  const isFollowing = user?.Following?.some(
    (followed) => followed?.id === People?.id
  );

  const handleClick = useCallback(() => {
    if (isFollowing) {
      unfollowMutation({ followerId: user?.id, followedId: People?.id });
    } else {
      followMutation({ followerId: user?.id, followedId: People?.id });
    }
  }, [isFollowing, user?.id, People?.id, unfollowMutation, followMutation]);

  return (
    <div className={className}>
      {followLoading || unfollowLoading ? (
        <div className="w-full relative h-full flex justify-center items-center rounded-3xl bg-inherit transition-all duration-300">
          <div className="dotloader"></div>
        </div>
      ) : People?.id !== user?.id ? (
        <button
          onClick={handleClick}
          className="w-full h-full bg-inherit rounded-3xl transition-all duration-300"
          disabled={followLoading || unfollowLoading}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      ) : (
        <div className="flex justify-center items-center w-full h-full bg-inherit transition-all duration-300 rounded-full">
          You
        </div>
      )}
    </div>
  );
}

export default memo(Follow);
