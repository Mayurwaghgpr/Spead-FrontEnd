import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  forwardRef,
} from "react";
import { format } from "date-fns";
import ConfirmationBox from "../otherUtilityComp/ConfirmationBox";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmBox, setIsConfirm } from "../../redux/slices/uiSlice";
import { useQueryClient, useMutation } from "react-query";
import { setTopiclist, FilterData } from "../../redux/slices/postSlice";
import profileIcon from "/user.png";
import PostsApis from "../../Apis/PostsApis";

const PostPreview = forwardRef(({ post }, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef();
  const queryClient = useQueryClient();
  const { DeletPostApi } = PostsApis();

  const [menuId, setMenuId] = useState("");
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const { confirmBox, isConfirm } = useSelector((state) => state.ui);
  const { postsData } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const deletePostMutation = useMutation((id) => DeletPostApi(id), {
    onSuccess: (data) => {
      dispatch(FilterData(data.id));
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
  }, [isConfirm, postIdToDelete, dispatch, deletePostMutation]);

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

  const PostsBody = (
    <>
      <div className="p-3 flex flex-col h-full gap-3 w-full">
        <div className="flex gap-2 text-sm">
          <Link
            to={`/profile/@${post?.user?.username
              .split(" ")
              .slice(0, post?.user?.username?.length - 1)
              .join("")}/${post?.user?.id}`}
            className="flex gap-3"
          >
            <div
              className={`${
                deletePostMutation.isLoading && "bg-slate-400 animate-pulse "
              } h-[30px] w-[30px] rounded-full `}
            >
              {!deletePostMutation.isLoading && (
                <img
                  className="h-[30px] w-[30px] hover:opacity-75 cursor-pointer rounded-full object-cover object-top"
                  src={
                    post?.user?.userImage
                      ? `${import.meta.env.VITE_BASE_URL}/${
                          post?.user?.userImage
                        }`
                      : profileIcon
                  }
                  alt="Author"
                />
              )}
            </div>
          </Link>
          <div className="text-sm rounded-lg flex">
            <p className="capitalize">{post?.user?.username}</p>
          </div>
          <h1 className="text-slate-700 text-sm rounded-lg">{post?.topic}</h1>
        </div>
        <Link
          to={`/FullView/@${post?.user?.username
            .split(" ")
            .slice(0, post?.user?.username.length - 1)
            .join("")}/${post?.id}`}
          className="cursor-pointer h-full flex justify-between p-2"
        >
          <div className=" flex flex-wrap gap-1 me-2">
            <div className="w-full ">
              <p className="font-extrabold rounded-lg text-sm sm:text-2xl  overflow-hidden overflow-ellipsis">
                {post?.title}
              </p>
            </div>
            <div className="w-full ">
              <p className="rounded-lg text-sm sm:text-lg  overflow-hidden overflow-ellipsis">
                {post?.subtitelpagraph}
              </p>
            </div>
          </div>
          <div className="col-span-3">
            <img
              className="rounded-sm sm:h-[110px] h-[70px] w-[150px] min-w-[100px] sm:max-w-[170px]  object-cover"
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
            <i class="bi bi-hand-thumbs-up"></i>
          </div>
          <div className="flex mb-1 cursor-pointer">
            <i class="bi bi-chat"></i>
          </div>
        </div>

        <div className="relative w-[50%] flex justify-center  gap-5 items-center">
          <div className="flex cursor-pointer">
            <i class="bi bi-bookmark"></i>
          </div>
          <div className=" relative flex justify-center items-center">
            <button
              onClick={() => setMenuId((prev) => (prev === "" ? post?.id : ""))}
              type="button"
            >
              <i className="bi bi-three-dots-vertical cursor-pointer "></i>
            </button>
            {menuId === post?.id && (
              <div
                id={post?.id}
                className={`absolute sm:top-5 mt-2 p-1 bg-white border before:content-normal before:absolute before:-top-[0.3rem] before:right-[3rem] before:h-[10px] before:w-[10px] before:rotate-45 before:bg-white before:border-l before:border-t border-gray-300 rounded-lg`}
              >
                <ul
                  ref={menuRef}
                  className="flex flex-col justify-center p-2 w-[100px]"
                >
                  {post?.user?.id.toString() === user.id.toString().trim() && (
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
    </>
  );

  const content = ref ? (
    <article ref={ref} className="border-b flex w-full mt-1 flex-col">
      {PostsBody}
    </article>
  ) : (
    <article className="border-b flex w-full mt-1 flex-col">
      {PostsBody}
    </article>
  );
  return (
    <>
      {content}
      {confirmBox?.status && <ConfirmationBox />}
    </>
  );
});

export default PostPreview;
