import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function PostsApis() {
  const AddNewPost = async (newPost) => {
    try {
      const result = await axios.post(`${BASE_URL}/posts/posts`, newPost, {
        withCredentials: true,
      });
      return result.data; // Return the actual data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("AdminProfile");
        localStorage.removeItem("AccessToken");
      }
      console.error("AddNewPost error:", error);
      throw error;
    }
  };

  const DeletePostApi = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/posts/${id.trim()}`, {
        withCredentials: true,
      });
      console.log("DeletePostApi response:", response);
      return response.data; // Return the actual data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("AdminProfile");
        localStorage.removeItem("AccessToken");
      }
      console.error("DeletePostApi error:", error);
      throw error;
    }
  };

  return { DeletePostApi, AddNewPost };
}

export default PostsApis;
