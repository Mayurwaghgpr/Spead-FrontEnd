import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  forwardRef,
  memo,
} from "react";
import { format } from "date-fns";
import ConfirmationBox from "../otherUtilityComp/ConfirmationBox";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setConfirmBox,
  setIsConfirm,
  setToast,
} from "../../redux/slices/uiSlice";
import { useQueryClient, useMutation } from "react-query";
import { setTopiclist } from "../../redux/slices/postSlice";
import profileIcon from "/ProfOutlook.png";
import PostsApis from "../../Apis/PostsApis";
import userApi from "../../Apis/userApi";
import useClickOutside from "../../hooks/useClickOutside";
import Bookmark from "../buttons/Bookmark";

const PostPreview = forwardRef(({ post, className, Saved }, ref) => {
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef();
  const queryClient = useQueryClient();
  const { DeletePostApi } = PostsApis();

  const { confirmBox, isConfirm } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  const deletePostMutation = useMutation((id) => DeletePostApi(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: () => {},
  });

  useEffect(() => {
    if (isConfirm.type === "deletepost" && isConfirm.status && postIdToDelete) {
      deletePostMutation.mutate(postIdToDelete);
      setPostIdToDelete("");
      dispatch(setIsConfirm({ type: "", status: false }));
      dispatch(setTopiclist([]));
    }
  }, [isConfirm, postIdToDelete, deletePostMutation, dispatch]);

  const confirmDeletePost = useCallback(
    (id) => {
      dispatch(
        setConfirmBox({
          message: "Do you really want to delete the post?",
          status: true,
          type: "deletepost",
        })
      );
      setPostIdToDelete(id);
      setMenuId("");
    },
    [dispatch]
  );
  const { menuId, setMenuId } = useClickOutside(menuRef);

  return (
    <>
      <article
        ref={ref}
        className={` border-b  flex w-full mt-1 h  flex-col ${className} `}
      >
        <div className="p-3 flex leading-0 flex-col h-full justify-center  gap-3 w-full ">
          <div className="flex gap-2 text-sm justify-start items-center">
            <Link
              to={`/profile/@${post?.user?.username
                .split(" ")
                .slice(0, post?.user?.username?.length - 1)
                .join("")}/${post?.user?.id}`}
              className="flex gap-3"
            >
              <div
                className={`h-[40px] w-[40px] hover:opacity-75 rounded-full `}
              >
                {post ? (
                  <img
                    className="cursor-pointer object-cover object-top h-full w-full rounded-full "
                    src={
                      post?.user?.userImage
                        ? `${post?.user?.userImage}`
                        : profileIcon
                    }
                    loading="lazy"
                    alt={post?.user?.username}
                  />
                ) : (
                  <div className="h-full w-full bg-slate-300 animate-pulse dark:bg-slate-700 bg-inherit rounded-full"></div>
                )}
              </div>
            </Link>
            <div className="text-sm rounded-lg flex  ">
              {post ? (
                <p className="capitalize">{post?.user?.username}</p>
              ) : (
                <span className="w-20 h-3  bg-slate-300 animate-pulse dark:bg-slate-700 bg-inherit rounded-xl"></span>
              )}
            </div>
            <h1 className="text-slate-700 text-sm rounded-lg">{post?.topic}</h1>
          </div>
          <Link
            to={`/FullView/@${post?.user?.username
              .split(" ")
              .slice(0, post?.user?.username.length - 1)
              .join("")}/${post?.id}`}
            className="cursor-pointer h-full flex justify-between items-center gap-3"
          >
            <div className="flex flex-col gap-1 leading-tight ">
              {post ? (
                <>
                  <p className="font-bold text-sm sm:text-2xl overflow-hidden overflow-ellipsis ">
                    {post?.title}
                  </p>
                  <p className="text-sm sm:text-base  font-normal overflow-hidden overflow-ellipsis">
                    {post?.subtitelpagraph}
                  </p>
                </>
              ) : (
                <>
                  <div className="rounded-lg  sm:w-[350px] w-[100px] h-3 sm:h-5 bg-slate-300 dark:bg-slate-700 animate-pulse "></div>
                  <div className="rounded-lg sm:w-[400px] w-[150px] h-5 sm:h-12 bg-slate-200 dark:bg-slate-700 animate-pulse "></div>
                </>
              )}
            </div>

            <div className="rounded-sm   sm:h-[110px] h-[80px] sm:w-[160px] min-w-[100px] sm:max-w-[170px]  bg-slate-200 dark:bg-slate-700">
              {post && (
                <img
                  className="object-cover object-center h-full w-full"
                  src={post?.titleImage && `${post?.titleImage}`}
                  loading="lazy"
                  alt="PreviewImage"
                />
              )}
            </div>
          </Link>
          {post && (
            <div className=" flex w-full h-full justify-between items-center px-4  mt-3">
              <div className=" flex justify-start items-center gap-5">
                <span className=" text-xs rounded-lg ">
                  {post?.createdAt
                    ? format(new Date(post?.createdAt), "LLL-dd-yyyy")
                    : ""}
                </span>
                <div className="flex  cursor-pointer">
                  <button className=" ">
                    <i className="bi bi-hand-thumbs-up"></i>
                  </button>
                </div>
                <div className="flex  cursor-pointer">
                  <button className=" ">
                    <i className="bi bi-chat"></i>
                  </button>
                </div>
              </div>
              <div className="relative  flex justify-center gap-5 items-center">
                <Bookmark post={post || null} />

                <div className="relative flex justify-center items-center">
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setMenuId((prev) => (prev === "" ? post?.id : ""))
                    }
                    type="button"
                  >
                    <i className="bi bi-three-dots-vertical  "></i>
                  </button>
                  {menuId === post?.id && (
                    <div
                      id={post?.id}
                      className="absolute sm:top-5 mt-2 p-1 z-[100] bg-white dark:bg-[#0f0f0f]  border before:content-normal before:absolute before:-top-[0.3rem] before:right-[3rem] before:h-[10px] before:w-[10px] before:rotate-45 before:bg-inherit before:border-l before:border-t border-gray-300 rounded-lg"
                    >
                      <ul
                        ref={menuRef}
                        className="flex flex-col justify-center p-2 w-[100px]"
                      >
                        {post?.user?.id.toString() ===
                          user.id.toString().trim() && (
                          <>
                            <li>
                              <button
                                className="w-full"
                                onClick={() => confirmDeletePost(post?.id)}
                              >
                                Delete Post
                              </button>
                            </li>
                            <li>Edit</li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
      {confirmBox?.status && <ConfirmationBox />}
    </>
  );
});

export default memo(PostPreview);
