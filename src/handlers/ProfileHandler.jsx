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

export const EditeUserProfile = async (newData) => {
  const token = getToken();
  const formData = new FormData();
  console.log("adat", newData.userImage);

  newData.userImage && formData.append("userImage", newData.userImage);
  newData.username && formData.append("username", newData.username);
  newData.email && formData.append("email", newData.email);
  newData.userInfo && formData.append("userInfo", newData.userInfo);

  try {
    const response = await axios.post(`${BASE_URL}/EditProfile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    console.error("Error updating profile:", err);
    throw err;
  }
};
