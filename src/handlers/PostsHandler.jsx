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
    return error.response;
  }
};

export const fetchDataByTopic = async (Topic) => {
  // const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/posts/posts`, {
      params: { type: Topic },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchDataAll = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/posts`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response;
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
    return error.response;
  }
};
