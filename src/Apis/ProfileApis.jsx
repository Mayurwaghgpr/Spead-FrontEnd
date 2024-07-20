import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// const getToken = () => localStorage.getItem("token");

export const fetchUserProfile = async (id) => {
  // console.log("use", id);
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
export const fetchUserData = async (profileId, pageParam) => {
  // const token = getToken();
  // console.log(profileId);
  try {
    const response = await axios.get(
      `${BASE_URL}/user/userData/:${profileId}`,
      {
        withCredentials: true,
        params: { pageParam },
      }
    );
    // console.log("hh", response);
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    return err.response;
  }
};

export const EditeUserProfile = async (newData) => {
  const formData = new FormData();
  console.log(newData);
  if (
    newData.userImage &&
    newData.userImage !== "null" &&
    newData.NewImageFile
  ) {
    formData.append("userImage", newData.userImage);
  }
  if (newData.NewImageFile) {
    formData.append("NewImageFile", newData.NewImageFile);
  }
  formData.append("username", newData.username);
  formData.append("email", newData.email);
  if (newData.userInfo) {
    formData.append("userInfo", newData.userInfo);
  }
  if (newData.removeImage) {
    formData.append("userImage", newData.userImage);
    formData.append("removeImage", newData.removeImage);
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/user/EditProfile`,
      formData,
      {
        headers: {
          // Uncomment if you have a method to get the token
          // Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    console.error(
      "Error updating profile:",
      err.response ? err.response.data : err.message
    );
    throw err;
  }
};
