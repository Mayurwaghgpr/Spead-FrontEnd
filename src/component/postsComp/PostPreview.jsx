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
import profileIcon from "/user.png";
import PostsApis from "../../Apis/PostsApis";
import ProfilImage from "../ProfilImage";
import userApi from "../../Apis/userApi";

const PostPreview = forwardRef(({ post, className }, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef();
  const queryClient = useQueryClient();
  const { DeletePostApi } = PostsApis();
  const { ArchivePost } = userApi();

  const [menuId, setMenuId] = useState("");
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const { confirmBox, isConfirm } = useSelector((state) => state.ui);
  const { postsData } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const deletePostMutation = useMutation((id) => DeletePostApi(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: () => {},
  });

  const addToArchiveMutation = useMutation((id) => ArchivePost(id), {
    onSuccess: (data) => {
      dispatch(setToast({ message: data.message, type: "success" }));
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuId("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <article
        ref={ref}
        className={`border-b flex w-full mt-1 flex-col min-h-[248px] bg-inherit ${className}`}
      >
        <div className="">
          <div className="p-3 flex leading-0 flex-col h-full gap-3 w-full ">
            <div className="flex gap-2 text-sm">
              <Link
                to={`/profile/@${post?.user?.username
                  .split(" ")
                  .slice(0, post?.user?.username?.length - 1)
                  .join("")}/${post?.user?.id}`}
                className="flex gap-3"
              >
                <div className={``}>
                  <img
                    className="h-[40px] w-[40px] hover:opacity-75 cursor-pointer object-cover object-top rounded-full"
                    src={
                      post?.user?.userImage
                        ? `${import.meta.env.VITE_BASE_URL}/${
                            post?.user?.userImage
                          }`
                        : profileIcon
                    }
                    alt={post?.user?.username}
                  />
                </div>
              </Link>
              <div className="text-sm rounded-lg flex">
                <p className="capitalize">{post?.user?.username}</p>
              </div>
              <h1 className="text-slate-700 text-sm rounded-lg">
                {post?.topic}
              </h1>
            </div>
            <Link
              to={`/FullView/@${post?.user?.username
                .split(" ")
                .slice(0, post?.user?.username.length - 1)
                .join("")}/${post?.id}`}
              className="cursor-pointer h-full flex justify-between p-2"
            >
              <div className="flex flex-col gap-1 leading-tight">
                <p className="font-bold rounded-lg text-sm sm:text-2xl overflow-hidden overflow-ellipsis">
                  {post?.title}
                </p>
                <p className="rounded-lg text-sm sm:text-base text-gray-500 font-light overflow-hidden overflow-ellipsis">
                  {post?.subtitelpagraph}
                </p>
              </div>
              <div className="col-span-3">
                <img
                  className="rounded-sm sm:h-[110px] h-[70px] w-[150px] min-w-[100px] sm:max-w-[170px] object-cover"
                  src={
                    post?.titleImage &&
                    `${import.meta.env.VITE_BASE_URL}/${post?.titleImage}`
                  }
                  alt="PreviewImage"
                />
              </div>
            </Link>
          </div>
          <div className="mb-1 flex w-full items-center p-3">
            <div className="w-[50%] flex justify-start items-center gap-5">
              <p className="text-slate-700 text-sm mx-2 rounded-lg">
                {post?.createdAt
                  ? format(new Date(post?.createdAt), "LLL-dd-yyyy")
                  : ""}
              </p>
              <div className="flex mb-1 cursor-pointer">
                <button className=" ">
                  <i className="bi bi-hand-thumbs-up"></i>
                </button>
              </div>
              <div className="flex mb-1 cursor-pointer">
                <button className=" ">
                  <i className="bi bi-chat"></i>
                </button>
              </div>
            </div>
            <div className="relative w-[50%] flex justify-center gap-5 items-center">
              <button
                disabled={post?.user?.id === user?.id}
                onClick={() => addToArchiveMutation.mutate(post?.id)}
                className="flex cursor-pointer"
              >
                <i className="bi bi-bookmark"></i>
              </button>
              <div className="relative flex justify-center items-center">
                <button
                  onClick={() =>
                    setMenuId((prev) => (prev === "" ? post?.id : ""))
                  }
                  type="button"
                >
                  <i className="bi bi-three-dots-vertical cursor-pointer "></i>
                </button>
                {menuId === post?.id && (
                  <div
                    id={post?.id}
                    className="absolute sm:top-5 mt-2 p-1 bg-white border before:content-normal before:absolute before:-top-[0.3rem] before:right-[3rem] before:h-[10px] before:w-[10px] before:rotate-45 before:bg-white before:border-l before:border-t border-gray-300 rounded-lg"
                  >
                    <ul
                      ref={menuRef}
                      className="flex flex-col justify-center p-2 w-[100px]"
                    >
                      {post?.user?.id.toString() ===
                        user.id.toString().trim() && (
                        <>
                          <li>
                            <button onClick={() => confirmDeletePost(post?.id)}>
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
        </div>
      </article>
      {confirmBox?.status && <ConfirmationBox />}
    </>
  );
});

export default memo(PostPreview);
