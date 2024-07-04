import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// const getToken = () => localStorage.getItem("token");

export const fetchUserProfile = async (id) => {
  console.log("use", id);
  // const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/profile/:${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
export const fetchUserData = async (userId) => {
  // const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/userData/:${userId}`, {
      withCredentials: true,
    });
    console.log("hh", response);
    if (response.status == 200) {
      return response;
    }
  } catch (err) {
    return err.response;
  }
};

export const EditeUserProfile = async (newData) => {
  // const token = getToken();
  const formData = new FormData();
  console.log("adat", newData.userImage);

  formData.append("userImage", newData.userImage);
  formData.append("username", newData.username);
  formData.append("email", newData.email);
  newData.userInfo && formData.append("userInfo", newData.userInfo);
  console.log("removeimage", newData.removeImage);
  newData.removeImage && formData.append("removeImage", newData.removeImage);

  try {
    const response = await axios.post(
      `${BASE_URL}/profile/EditProfile`,
      formData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    console.error("Error updating profile:", err);
    throw err;
  }
};
