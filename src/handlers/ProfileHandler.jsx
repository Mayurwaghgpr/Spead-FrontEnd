import axios from "axios";

const BASE_URL = "http://localhost:3000/profile";

const getToken = () => localStorage.getItem("token");

export const fetchUserProfile = async (id) => {
  console.log("use", id);
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/:${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    return error.response;
  }
};
export const fetchUserData = async (userId) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/userData/:${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};
