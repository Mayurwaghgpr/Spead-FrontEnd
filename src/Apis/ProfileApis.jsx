import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchUserProfile = async (id) => {
  console.log("use", id);
  try {
    const response = await axios.get(`${BASE_URL}/user/profile/:${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const fetchUserData = async (profileId, pageParam) => {
  console.log(profileId, pageParam);
  try {
    const response = await axios.get(`${BASE_URL}/user/userData/${profileId}`, {
      withCredentials: true,
      params: {
        limit: 3,
        page: pageParam,
      },
    });
    return response.data;
  } catch (error) {
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
    }
    console.log(error.response);
    if (error.response && error.response.status === 404) {
      throw new Error(error.response.status);
    }
    throw new Error(error.response);
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
