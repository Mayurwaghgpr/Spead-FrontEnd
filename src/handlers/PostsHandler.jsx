import axios from "axios";

const BASE_URL = "http://localhost:3000/posts";

const getToken = () => localStorage.getItem("token");

export const DeletPostApi = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await axios.delete(`${BASE_URL}/${id.trim()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("del", response);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchDataByTopic = async (Topic) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      params: { type: Topic },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchDataAll = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
export const fetchDataById = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/:${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("podtbyis", response);
    if (response.status === 200) return response.data;
  } catch (error) {
    return error.response;
  }
};
