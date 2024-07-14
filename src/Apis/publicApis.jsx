import axios from "axios";
// import { Navigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const publiUtilityData = async () => {
  try {
    const result = await axios.get(`${BASE_URL}/public/utildata`, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {}
};

export const fetchDataAll = async ({ pageParam, topic }) => {
  //   const navigate = Navigate();
  console.log(pageParam);
  try {
    const response = await axios.get(`${BASE_URL}/public/posts`, {
      params: {
        limit: 3,
        page: pageParam,
        type: topic,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("AdminProfile");
      localStorage.removeItem("AccessToken");
      localStorage.setItem(
        "Authorization",
        JSON.stringify({
          message: error.response.data.message,
          status: false,
        })
      );
    }
    console.log(error);
  }
};
export const fetchDataById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/:${id}`, {
      withCredentials: true,
    });
    console.log("podtbyis", response);
    if (response.status === 200) return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("AdminProfile");
      localStorage.removeItem("AccessToken");
    }
  }
};
