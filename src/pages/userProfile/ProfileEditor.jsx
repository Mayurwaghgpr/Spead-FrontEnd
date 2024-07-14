import React, { useEffect, useState } from "react";
import { EditeUserProfile } from "../../Apis/ProfileApis";
import { useDispatch, useSelector } from "react-redux";
import { setuserProfile } from "../../redux/slices/profileSlice";
import profileIcon from "/user.png";

function ProfileEditor() {
  // Retrieve Admin profile from local storage
  const Admin = JSON.parse(localStorage.getItem("AdminProfile")) || [];
  const { userProfile } = useSelector((state) => state.profile);

  const [newInfo, setNewInfo] = useState({ ...Admin });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (Admin && userProfile) {
      dispatch(setuserProfile(Admin));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userProfile) {
      setNewInfo({ ...userProfile });
    }
  }, [userProfile]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewInfo((prev) => ({
          ...prev,
          userImage: file,
          userImageFile: reader.result,
        }));
      };

      reader.readAsDataURL(file);
      event.target.value = "";
    } else {
      setNewInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleSave = async () => {
    if (Object.keys(newInfo).length > 0) {
      setIsLoading(true);
      setSuccessMessage("");
      try {
        const result = await EditeUserProfile(newInfo);
        if (result.status === 200) {
          dispatch(setuserProfile(result.data));
          localStorage.setItem("AdminProfile", JSON.stringify(result.data));
          setSuccessMessage("Profile updated successfully!");
        }
      } catch (err) {
        console.error("Error updating profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (successMessage !== "") {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const RemoveSelecteImage = () => {
    if (newInfo.userImage && newInfo.userImageFile) {
      setNewInfo((prev) => ({
        ...prev,
        userImage: null,
        userImageFile: null,
      }));
    } else {
      dispatch(setuserProfile({ ...userProfile, userImage: null }));
      setNewInfo((prev) => ({ ...prev, removeImage: true }));
    }
  };

  return (
    <div className="flex h-screen justify-center items-start">
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <article className="m-3 flex lg:items-start justify-center items-center flex-col p-5 gap-6">
          <div
            className="border flex justify-start gap-5 w-full rounded-full"
            aria-label="Upload profile picture"
          >
            {userProfile && (
              <img
                onClick={triggerFileInput}
                className="h-[100px] w-[100px] rounded-full p-1 cursor-pointer"
                src={
                  newInfo?.userImageFile ||
                  `${import.meta.env.VITE_BASE_URL}/${userProfile?.userImage}`
                }
                alt="Profile"
              />
            )}
            <div className="py-1">
              <button
                className="rounded-xl px-2"
                onClick={() => RemoveSelecteImage()}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="flex flex-col w-[300px] items-end h-full lg:w-[700px] gap-2">
            <div className="w-full">
              <input
                className="w-full p-3"
                type="text"
                name="username"
                defaultValue={newInfo?.username}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <input
                className="w-full p-3"
                type="text"
                name="email"
                defaultValue={newInfo?.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <input
                className="w-full p-3"
                id="fileInput"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="w-full">
              <textarea
                className="w-full p-3"
                type="text"
                name="userInfo"
                id="biotext"
                placeholder="Profile Bio"
                onChange={handleChange}
                defaultValue={newInfo?.userInfo}
              />
            </div>
            <button className="p-4" onClick={handleSave}>
              Save
            </button>
            <div className={`${successMessage ? "size-full" : "size-0"}`}>
              {successMessage}
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

export default ProfileEditor;
