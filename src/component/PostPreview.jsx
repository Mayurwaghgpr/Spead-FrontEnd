import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { format } from "date-fns";
import { DeletPostApi, fetchDataById } from "../Handlers/PostsHandler";
import UserContext from "../context/UserContext";
import ConfirmationBox from "../component/ConfirmationBox";
import { Navigate, useNavigate, Link } from "react-router-dom";

const PostPreview = () => {
  const {
    user,
    setSelectedPost,
    selectedPost,
    data,
    setData,
    isConfirmBox,
    setConfirmBox,
    isConfirm,
    setIsConfirm,
    setTopiclist,
    ProfileId,
    setProfileId,
  } = useContext(UserContext);
  const menuRef = useRef();
  const [menuId, setMenuId] = useState("");
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isConfirm && postIdToDelete) {
      handleDeletePost(postIdToDelete);
      setPostIdToDelete("");
      setIsConfirm(false);
      setTopiclist([]);
    } else {
      console.log("first");
    }
  }, [isConfirm, postIdToDelete]);

  const handleReadMore = useCallback(
    async (postId) => {
      const response = await fetchDataById(postId);
      if (response) {
        setSelectedPost(response);
        localStorage.setItem("selectedPost", JSON.stringify(response));
        navigate("/FullView");
      }
    },
    [data, setSelectedPost]
  );

  const limitWordsAndAddEllipsis = useCallback((text, limit) => {
    if (text) {
      const words = text.split(" ");
      if (words.length > limit) {
        return words.slice(0, limit).join(" ") + "...";
      }
      return text;
    }
  }, []);

  const confirmDeletePost = useCallback((id) => {
    setPostIdToDelete(id);
    setConfirmBox({
      message: "Do you really want to delete the post?",
      status: true,
    });
    setMenuId("");
  }, []);

  const handleDeletePost = useCallback(
    async (id) => {
      try {
        const response = await DeletPostApi(id);
        if (response.status === 200) {
          setData((prevData) => prevData.filter((post) => post.id !== id));
        } else {
          alert("Failed to delete the post.");
        }
      } catch (error) {
        console.error("Error deleting the post:", error);
        alert("An error occurred while deleting the post.");
      }
    },
    [setData]
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
  console.log("prev", data);
  return (
    <>
      {data?.map((post) => (
        <article key={post.id} className="border-b flex w-full mt-1 flex-col ">
          <div className="p-3 flex flex-col h-full  gap-3">
            <div className="flex gap-2  text-sm">
              <Link
                to="/profile"
                state={{ id: post.User?.id }}
                className="flex gap-3"
              >
                <img
                  className="h-[30px] w-[30px] hover:opacity-75 cursor-pointer rounded-full"
                  src={`http://localhost:3000/${post?.User?.userImage}`}
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
            <div
              onClick={() => handleReadMore(post.id)}
              className="cursor-pointer h-full grid grid-cols-12  p-2"
            >
              <div className=" col-span-9 flex flex-col gap-2 me-[4rem]">
                <div className="w-full break-words">
                  <p className="font-extrabold rounded-lg">{post.title}</p>
                </div>
                <div className="w-full break-words ">
                  <p className="hidden sm:block rounded-lg">
                    {limitWordsAndAddEllipsis(post?.subtitelpagraph, 30)}
                  </p>
                </div>
              </div>
              <div className="col-span-3">
                <img
                  className="rounded-sm h-[100px] block"
                  src={`http://localhost:3000/${post?.titleImage}`}
                  alt="Post"
                />
              </div>
            </div>
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
                    {post.User.id.toString() === user.id.toString().trim() && (
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
      {isConfirmBox.status && (
        <ConfirmationBox
          isConfirmBox={isConfirmBox}
          setConfirmBox={setConfirmBox}
          setIsConfirm={setIsConfirm}
        />
      )}
    </>
  );
};

export default PostPreview;
