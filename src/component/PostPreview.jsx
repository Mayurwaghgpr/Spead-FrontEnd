import React, { useEffect, useState, useCallback, useRef, memo } from "react";
import { format } from "date-fns";
import ConfirmationBox from "../component/ConfirmationBox";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmBox, setIsConfirm } from "../redux/slices/uiSlice";
import { useDeletPostApiQuery } from "../redux/slices/postsApi";
import { setTopiclist } from "../redux/slices/postSlice";

const PostPreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef();

  const [menuId, setMenuId] = useState("");
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const { confirmBox, isConfirm } = useSelector((state) => state.ui);
  const { postsData } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const { data, status, isSuccess, error } = useDeletPostApiQuery(
    postIdToDelete,
    {
      skip: !isConfirm.status,
    }
  );

  // console.log(error);

  // Handle post delete confirmation
  useEffect(() => {
    if (isConfirm.type === "deletepost" && isConfirm.status && postIdToDelete) {
      setPostIdToDelete("");
      dispatch(setIsConfirm({ type: "", status: false }));

      dispatch(setTopiclist([]));
    }
  }, [isConfirm, postIdToDelete, dispatch]);

  // Limit words in a text and add ellipsis if exceeds limit
  const limitWordsAndAddEllipsis = useCallback((text, limit) => {
    if (text) {
      const words = text.split(" ");
      if (words.length > limit) {
        return words.slice(0, limit).join(" ") + "...";
      }
      return text;
    }
  }, []);

  // Confirm post delete action
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

  // Handle click outside the menu to close it
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
      {Array.isArray(postsData) &&
        postsData.map((post) => (
          <article key={post.id} className="border-b flex w-full mt-1 flex-col">
            <div className="p-3 flex flex-col h-full gap-3">
              <div className="flex gap-2 text-sm">
                <Link
                  to={`/profile/@${post?.User?.username
                    .split(" ")
                    .slice(0, post?.User?.username.length - 1)
                    .join("")}/${post?.User?.id}`}
                  className="flex gap-3"
                >
                  <img
                    className="h-[30px] w-[30px] hover:opacity-75 cursor-pointer rounded-full"
                    src={`${import.meta.env.VITE_BASE_URL}/${
                      post?.User?.userImage
                    }`}
                    alt="Author"
                  />
                </Link>
                <div className="text-sm rounded-lg flex">
                  <p className="capitalize">{post.User?.username}</p>
                </div>
                <h1 className="text-slate-700 text-sm rounded-lg">
                  {post.topic}
                </h1>
              </div>
              <Link
                to={`/FullView/@${post?.User?.username
                  .split(" ")
                  .slice(0, post?.User?.username.length - 1)
                  .join("")}/${post?.id}`}
                className="cursor-pointer h-full grid grid-cols-12 p-2"
              >
                <div className="col-span-9 flex flex-col gap-2 me-[4rem]">
                  <div className="w-full break-words">
                    <p className="font-extrabold rounded-lg text-2xl">
                      {post.title}
                    </p>
                  </div>
                  <div className="w-full break-words">
                    <p className="hidden sm:block rounded-lg">
                      {limitWordsAndAddEllipsis(post?.subtitelpagraph, 30)}
                    </p>
                  </div>
                </div>
                <div className="col-span-3">
                  <img
                    className="rounded-sm h-[100px] block"
                    src={`${import.meta.env.VITE_BASE_URL}/${post?.titleImage}`}
                    alt="Post"
                  />
                </div>
              </Link>
            </div>
            <div className="mb-1 flex w-full items-center sm:p-5 p-3">
              <div className="w-[50%]">
                <p className="text-slate-700 text-sm mx-2 rounded-lg">
                  {post.createdAt
                    ? format(new Date(post.createdAt), "LLL-dd-yyyy")
                    : format(new Date(post.date), "LLL-dd-yyyy")}
                </p>
              </div>
              <div className="relative w-[50%] flex justify-center items-center">
                <button
                  onClick={() =>
                    setMenuId((prev) => (prev === "" ? post.id : ""))
                  }
                  type="button"
                >
                  <i className="bi bi-three-dots-vertical cursor-pointer"></i>
                </button>
                {menuId === post.id && (
                  <div
                    id={post.id}
                    className="absolute sm:top-5 mt-2 p-1 bg-white border before:content-normal before:absolute before:-top-[0.3rem] before:right-[3rem] before:h-[10px] before:w-[10px] before:rotate-45 before:bg-white before:border-l before:border-t border-gray-300 rounded-lg"
                  >
                    <ul
                      ref={menuRef}
                      className="flex flex-col justify-center p-2 w-[100px]"
                    >
                      {post.User.id.toString() ===
                        user.id.toString().trim() && (
                        <>
                          <li>
                            <button onClick={() => confirmDeletePost(post.id)}>
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
          </article>
        ))}
      {confirmBox.status && <ConfirmationBox />}
    </>
  );
};

export default PostPreview;
