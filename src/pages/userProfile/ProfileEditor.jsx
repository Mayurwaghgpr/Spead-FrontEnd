import React, { useEffect, useState } from "react";
import { EditeUserProfile } from "../../Apis/ProfileApis";
import { useDispatch, useSelector } from "react-redux";
import { setuserProfile } from "../../redux/slices/profileSlice";
import profileIcon from "/user.png";
import ProfilImage from "../../component/ProfilImage";
import { setUser } from "../../redux/slices/authSlice";
import { useMutation, useQueryClient } from "react-query";

function ProfileEditor() {
  // Retrieve Admin profile from local storage
  const Admin = JSON.parse(localStorage.getItem("userAccount")) || [];
  const { userProfile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const [newInfo, setNewInfo] = useState({ ...Admin });

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { isSuccess, isLoading, isError, mutate } = useMutation(
    (profileUpdated) => EditeUserProfile(profileUpdated),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
      },
    }
  );

  useEffect(() => {
    if (user) {
      dispatch(setuserProfile(user));
    }
  }, [dispatch, user]);

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
      setNewInfo((prev) => ({
        ...prev,
        NewImageFile: file,
      }));
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

  const RemoveSelecteImage = () => {
    if (newInfo.userImage && newInfo.NewImageFile) {
      delete newInfo.NewImageFile;
      setNewInfo((prev) => ({
        ...prev,
      }));
    } else {
      setNewInfo((prev) => ({ ...prev, removeImage: true }));
    }
  };
  // console.log(newInfo);
  return (
    <div className="flex h-screen justify-center items-start">
      <article className="m-3 flex lg:items-start justify-center items-center flex-col p-5 gap-6">
        <div
          className="border flex justify-start gap-5 w-full rounded-full"
          aria-label="Upload profile picture"
        >
          <ProfilImage
            onClick={triggerFileInput}
            className="h-[100px]   w-[100px] rounded-full p-1"
            imageUrl={
              newInfo.removeImage
                ? profileIcon
                : newInfo.NewImageFile
                ? URL.createObjectURL(newInfo.NewImageFile)
                : newInfo?.userImage !== null
                ? `${import.meta.env.VITE_BASE_URL}/${newInfo?.userImage}`
                : profileIcon
            }
            alt="Profile"
          />
          <div className="py-1">
            <button
              className="rounded-xl px-2"
              onClick={() =>
                (newInfo?.userImage !== null || newInfo?.NewImageFile) &&
                RemoveSelecteImage()
              }
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
          <div className="w-full relative">
            <input
              className="w-full p-3"
              type="text"
              name="userInfo"
              id="userInfo"
              placeholder="About you"
              onChange={handleChange}
              defaultValue={newInfo?.userInfo}
            />
          </div>
          <button className={`p-4`} onClick={() => mutate(newInfo)}>
            {isLoading ? "Updating..." : "Save"}
          </button>
          {isSuccess && (
            <div className="size-full">Profile has been updated</div>
          )}
        </div>
      </article>
    </div>
  );
}

export default ProfileEditor;
