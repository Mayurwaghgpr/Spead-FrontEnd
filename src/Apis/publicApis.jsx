import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Fetch user preferences data
export const userPrepsData = async () => {
  try {
    const result = await axios.get(`${BASE_URL}/public/prepsdata`, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching user preferences data:", error);
    return { error: true, message: error.message };
  }
};

// Fetch all posts with pagination and filtering by topic
export const fetchDataAll = async ({ pageParam, topic }) => {
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
    console.error("Error fetching all posts:", error);
    if (error.response && error.response.status === 404) {
      return null;
    }
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem("userAccount");
      localStorage.removeItem("AccessToken");
      localStorage.setItem(
        "Authorization",
        JSON.stringify({
          message: error.response.data.message,
          status: false,
        })
      );
    } else {
      throw new Error(error);
    }
  }
};

// Fetch data by post ID
export const fetchDataById = async (id) => {
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
    return { error: true, message: error.message };
  }
};

// fetch data search by user

export const fetchSearchData = async (search) => {
  const searchResult = await axios.get(
    `${BASE_URL}/public/search?q=${search}`,
    {
      withCredentials: true,
    }
  );
  return searchResult.data;
};
