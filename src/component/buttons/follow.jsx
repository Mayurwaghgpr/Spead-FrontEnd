import React, { useCallback } from "react";
import userApi from "../../Apis/userApi";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

function Follow({ className, profileId }) {
  const { user } = useSelector((state) => state.auth);
  const { followUser, unfollowUser } = userApi();
  const queryClient = useQueryClient();

  const { mutate: followMutation, isLoading: followLoading } = useMutation(
    followUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["loggedInUser"]);
        queryClient.invalidateQueries(["userProfile"]);
      },
      onError: () => console.error("Error following user"),
    }
  );

  const { mutate: unfollowMutation, isLoading: unfollowLoading } = useMutation(
    unfollowUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["loggedInUser"]);
        queryClient.invalidateQueries(["userProfile"]);
      },
      onError: (error) => {
        console.error("Error unfollowing user", error);
      },
    }
  );

  const isFollowing = user?.Following?.some(
    (followedId) => followedId?.id === profileId
  );

  // Memoize handleClick to prevent re-renders
  const handleClick = useCallback(() => {
    console.log("Button clicked"); // Debugging log
    if (isFollowing) {
      unfollowMutation({ followerId: user?.id, followedId: profileId });
    } else {
      followMutation({ followerId: user?.id, followedId: profileId });
    }
  }, [isFollowing, user?.id, profileId]);

  return (
    <div className={className}>
      {followLoading || unfollowLoading ? (
        <div className="w-full relative h-full flex  justify-center items-center rounded-3xl bg-inherit transition-all duration-300">
          <div className="dotloader"></div>
        </div>
      ) : profileId !== user?.id ? (
        <button
          onClick={handleClick}
          className="w-full h-full bg-inherit rounded-3xl transition-all duration-300"
          disabled={followLoading || unfollowLoading} // Disable button during loading
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

export default Follow;
