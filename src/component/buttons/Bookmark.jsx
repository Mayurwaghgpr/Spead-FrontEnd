import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../redux/slices/uiSlice";
import userApi from "../../Apis/userApi";

function Bookmark({ className, post }) {
  const [iconClicked, setIcon] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { ArchivePost, removePostFromArchive } = userApi();
  const queryClient = useQueryClient();

  const addToArchiveMutation = useMutation((id) => ArchivePost(id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["loggedInUser"]);
      dispatch(setToast({ message: data.message, type: "success" }));
      setIcon("");
    },
    onError: (error) => {
      dispatch(
        setToast({
          message: error.response?.error,
          type: "error",
        })
      );
    },
  });

  const removeFromArchiveMutation = useMutation(
    (id) => removePostFromArchive(id),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["loggedInUser"]);
        dispatch(setToast({ message: data.message, type: "success" }));
      },
    }
  );

  const handleSavePost = useCallback(
    (post, icon) => {
      addToArchiveMutation.mutate(post);
      setIcon(`${icon.id}-${post}`);
    },
    [addToArchiveMutation]
  );

  return (
    <div className={`${className}`}>
      {" "}
      <i
        id="bookmark"
        disabled={post?.user?.id === user?.id}
        onClick={(e) => {
          const isPostSaved = user?.SavedPosts?.some(
            (savedPost) => savedPost?.id === post?.id
          );

          if (!isPostSaved) {
            handleSavePost(post?.id, e.target);
          } else {
            removeFromArchiveMutation.mutate(post?.id);
          }
        }}
        className={`bi cursor-pointer transition-all duration-700 ${
          user?.SavedPosts?.some((savedPost) => savedPost?.id === post?.id) ||
          iconClicked === `bookmark-${post?.id}`
            ? "bi-bookmark-fill"
            : "bi-bookmark"
        }`}
      ></i>
    </div>
  );
}

export default Bookmark;
