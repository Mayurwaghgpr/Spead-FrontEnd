import axios from "axios";
import { useDispatch } from "react-redux";
import { setToast } from "../redux/slices/uiSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function usePublicApis() {
  const dispatch = useDispatch();
  // Fetch user preferences data
  const userPrepsData = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/public/prepsdata`, {
        withCredentials: true,
      });
      return result.data;
    } catch (error) {
      console.error("Error fetching user preferences data:", error);
      throw { error: true, message: error.message };
    }
  };

  // Fetch all posts with pagination and filtering by topic
  const fetchDataAll = async ({ pageParam, topic }) => {
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
      if (error.response && error.response.status === 401) {
        // localStorage.removeItem("userAccount");
        // dispatch(setToast({ message: error.response.data, type: "error" }));
        localStorage.removeItem("AccessToken");
      } else {
        throw error.response;
      }
    }
  };

  // Fetch data by post ID
  const fetchDataById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching post by ID:", error);

      if (error.response && error.response.status === 401) {
        // localStorage.removeItem("userAccount");
        localStorage.removeItem("AccessToken");
      }
      throw { error: true, message: error.message };
    }
  };

  // fetch data search by user

  const fetchSearchData = async (search) => {
    const searchResult = await axios.get(
      `${BASE_URL}/public/search?q=${search}`,
      {
        withCredentials: true,
      }
    );
    return searchResult.data;
  };

  return { userPrepsData, fetchDataAll, fetchDataById, fetchSearchData };
}

export default usePublicApis;
