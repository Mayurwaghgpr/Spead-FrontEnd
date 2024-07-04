import React, { useState } from "react";
import axios from "axios";

function CreateBlog() {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const imageInputRef = React.useRef();

  function fillBlog(event) {
    const { value, name, files } = event.target;
    if (name === "image") {
      setBlog((prevState) => ({
        ...prevState,
        image: files[0],
      }));
    } else {
      setBlog((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  async function handleForm(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    formData.append("image", blog.image);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/posts/posts",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Success:", response.data);
        // Handle successful response
        alert("New Blog" + response.data.message + "fully created");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  }

  function handleRemoveImage() {
    setBlog((prevState) => ({ ...prevState, image: null }));
    imageInputRef.current.value = null; // Reset file input value
  }

  return (
    <div className="col h-screen flex justify-center items-center flex-col overflow-x-hidden overflow-y-auto">
      <div className="container flex flex-col m-5 max-w-screen-md p-5 justify-center items-center creat-blog">
        <h1 className="text-lg">New Blog Post</h1>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="form w-full flex flex-col gap-3" id="newPostForm">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            onChange={fillBlog}
            className="form-input rounded-md mb-3"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={blog.title}
            required
          />
          <label htmlFor="image" className="cursor-pointer text-2xl form-label">
            <i className="bi bi-images"></i>
            <i className="bi bi-plus"></i>
          </label>
          <input
            ref={imageInputRef}
            className="hidden border-none"
            name="image"
            type="file"
            id="image"
            accept="image/*"
            onChange={fillBlog}
            required
          />
          {blog.image && (
            <div
              onClick={handleRemoveImage}
              className="h-[150px] w-[150px] relative"
            >
              <img
                className="h-[100%]"
                src={URL.createObjectURL(blog.image)}
                alt="Preview"
              />
            </div>
          )}
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <textarea
            onChange={fillBlog}
            className="form-textarea rounded-md mb-3"
            id="content"
            name="content"
            placeholder="Content"
            value={blog.content}
            required
          ></textarea>
          <button
            onClick={handleForm}
            className="btn rounded-md mt-3"
            type="submit"
          >
            POST
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
