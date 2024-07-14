import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// const getToken = () => localStorage.getItem("token");

export const DeletPostApi = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/posts/${id.trim()}`, {
      withCredentials: true,
    });
    console.log("del", response);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("AdminProfile");
      localStorage.removeItem("AccessToken");
      localStorage.setItem("Authorization", {
        message: error.response.message,
      });
    }
  }
};
