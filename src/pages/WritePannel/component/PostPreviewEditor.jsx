import React, { useRef, useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  setSubmit,
  setElements,
  setBeforeSubmit,
} from "../../../redux/slices/postSlice";
import { setToast } from "../../../redux/slices/uiSlice";
import { useMutation, useQueryClient } from "react-query";
import PostsApis from "../../../Apis/PostsApis";

const DEFAULT_ELEMENT = { type: "text", data: "", id: uuidv4(), index: 0 };

function PostPreviewEditor({
  handleContentEditableChange,
  imageFiles,
  setImageFiles,
  handleTextChange,
}) {
  const dispatch = useDispatch();
  const [Topic, setTopic] = useState();
  const { submit, elements, beforeSubmit } = useSelector(
    (state) => state.posts
  );
  const { TostState } = useSelector((state) => state.ui);

  const { user } = useSelector((state) => state.auth);
  const { AddNewPost } = PostsApis();
  const queryClient = useQueryClient();

  const mutation = useMutation((NewPosts) => AddNewPost(NewPosts), {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["posts"]);
      dispatch(
        setToast({
          message: `New Blog ${response.message} fully created`,
          type: "success",
        })
      );
      dispatch(setBeforeSubmit(false));
      dispatch(setElements([DEFAULT_ELEMENT]));
      dispatch(setSubmit(false));
    },
    onError: (error) => {
      const errorMessage =
        error.response?.error || "An error occurred. Please try again.";
      dispatch(setToast({ message: errorMessage, type: "error" }));
      dispatch(setBeforeSubmit(false));
      dispatch(setSubmit(false));
      dispatch(setElements([DEFAULT_ELEMENT]));
    },
  });
  const EditTitleImage = useCallback(
    (id, index, el) => {
      const newImage = el.files[0];
      const updatedElements = elements.map((el) =>
        el.index === index ? { ...el, file: URL.createObjectURL(newImage) } : el
      );
      const updatedImageFiles = imageFiles.map((file) =>
        file.index === index ? { ...file, file: newImage } : file
      );
      setImageFiles(updatedImageFiles);
      dispatch(setElements(updatedElements));
    },
    [dispatch, elements, imageFiles, setImageFiles]
  );

  useEffect(() => {
    if (elements.some((el) => el.data === "")) {
      dispatch(setSubmit(false));
    }

    if (submit && !beforeSubmit) {
      const formData = new FormData();
      const textElements = elements.filter((el) => el.type !== "image");
      formData.append("blog", JSON.stringify(textElements));
      formData.append("Topic", Topic);
      imageFiles.forEach((el, idx) => {
        formData.append(`image-${el.index}`, el.file);
        formData.append(`description-${el.index}`, el.data);
      });

      mutation.mutate(formData);
    }
  }, [submit, beforeSubmit, dispatch, elements, imageFiles, Topic, mutation]);

  const imageElements = elements?.filter((el) => el.type === "image");

  return (
    <main className="fixed top-0 right-0 left-0 z-[100] bg-white bottom-0 w-full h-screen flex justify-center flex-col gap-5 items-center">
      <div className="w-full max-w-[900px] text-center ">
        <div className="w-full text-end">
          <button onClick={() => dispatch(setBeforeSubmit(false))}> X</button>
        </div>
        <hgroup>
          <h1 className="text-2xl font-light text-black">
            Define your Preview
          </h1>
          <p className=" text-slate-700">
            Define your posts preview and Add topice to know whats your post
            content about
          </p>
        </hgroup>
      </div>

      <article
        aria-disabled={mutation.isLoading}
        className="max-h-[500px] h-full w-full max-w-[900px] flex gap-2  "
      >
        <div className=" w-full flex flex-col justify-center items-center">
          <h1 className="w-full text-lg mb-2">Post Preview</h1>
          <div className="w-full h-[300px]  bg-slate-100 flex justify-center items-center">
            <label className=" w-full h-full " htmlFor="titleimage">
              {imageElements?.length > 0 ? (
                <img
                  className=" w-full h-full "
                  src={imageElements[0]?.file}
                  alt="title image"
                />
              ) : null}
            </label>
            <input
              hidden
              type="file"
              name=""
              id="titleimage"
              accept="image/*"
              onChange={(el) =>
                EditTitleImage(
                  imageElements[0]?.id,
                  imageElements[0]?.index,
                  el.target
                )
              }
            />
          </div>
          <div className="w-full h-full gap-1 flex flex-col justify-start items-center ">
            <input
              className=" p-2 w-full border-b placeholder:text-sm  outline-none focus:border-black"
              type="text"
              name="title"
              defaultValue={elements[0]?.data}
              title=""
              placeholder="Write Preview title"
              onChange={(e) =>
                handleTextChange(elements[0]?.id, e.target.value)
              }
            />
            <input
              className=" p-2 w-full border-b placeholder:text-sm  outline-none focus:border-black"
              type="text"
              name="subtitle"
              defaultValue={elements[1]?.data}
              placeholder=" Write Preview Subtitle"
              onChange={(e) =>
                handleTextChange(elements[1]?.id, e.target.value)
              }
            />
          </div>
        </div>
        <div className="w-full flex  flex-col  px-3">
          <div className="h-full flex  flex-col gap-3">
            <div>
              <h2 className="">Add Topics </h2>
              <p className="text-md font-thin"></p>
            </div>
            <div>
              <input
                className=" p-2 w-full border-b placeholder:text-sm  outline-none focus:border-black"
                type="text"
                placeholder="Add Topics ..."
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className=" flex justify-start items-center  gap-1">
              <h1>Author :</h1>
              <p>{user.username}</p>
            </div>
          </div>
          <div className="h-full flex px-5 gap-3 items-start">
            <button
              className={`flex ${
                mutation.isLoading ? "bg-orange-100 text-slate-400" : ""
              } bg-orange-300 px-4 py-2 rounded-lg`}
              onClick={() => dispatch(setSubmit(true))}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {mutation.isLoading ? `Submitting...` : "Submit"}
            </button>

            <button
              className=" bg-slate-200 px-4 py-2 rounded-lg"
              onClick={() => dispatch(setBeforeSubmit(false))}
            >
              Cancel
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}

export default PostPreviewEditor;
