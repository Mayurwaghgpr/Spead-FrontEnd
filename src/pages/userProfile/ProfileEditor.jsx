import React, { useEffect, useState } from "react";
import { EditeUserProfile } from "../../Handlers/ProfileHandler";
import { useDispatch, useSelector } from "react-redux";
import { setuserProfile } from "../../redux/slices/profileSlice";

function ProfileEditor() {
  const Admin = JSON.parse(localStorage.getItem("Admin profile")) || [];
  // Access user profile from the Redux store
  const { userProfile } = useSelector((state) => state.profile);

  // Local state to hold new profile information and loading status
  const [newInfo, setNewInfo] = useState({ ...Admin });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Retrieve Admin profile from local storage

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch Admin profile to Redux store on component mount
    if (Admin && userProfile) {
      console.log(Admin); // Debugging: Check Admin value
      dispatch(setuserProfile(Admin));
    }
  }, []); // Empty dependency array to run only once

  // Handle input changes
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        // Update newInfo with image file and base64 string
        setNewInfo((prev) => ({
          ...prev,
          userImage: file,
          userImageFile: reader.result,
        }));
      };

      reader.readAsDataURL(file);
      event.target.value = ""; // Reset file input
    } else {
      // Update newInfo with other input values
      setNewInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  // Handle profile save
  const handleSave = async () => {
    if (Object.keys(newInfo).length > 0) {
      setIsLoading(true); // Set loading to true
      setSuccessMessage(""); // Reset success message
      try {
        const result = await EditeUserProfile(newInfo);
        if (result.status === 200) {
          // Update Redux store and local storage with new profile data
          dispatch(setuserProfile([result.data]));
          localStorage.setItem("Admin profile", JSON.stringify(result.data));
          setSuccessMessage("Profile updated successfully!"); // Set success message
        }
      } catch (err) {
        console.error("Error updating profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Clear success message after 2 seconds
  if (successMessage !== "") {
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  }

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
  console.log("userp", userProfile);
  console.log(newInfo);

  return (
    <main className="flex h-screen justify-center items-start">
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <article className="m-3 flex lg:items-start justify-center items-center flex-col p-5 gap-6">
          <div
            className="border flex justify-start gap-5    w-full  rounded-full"
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
                // loading="lazy"
              />
            )}
            <div className="py-1">
              <button
                className=" rounded-xl px-2 "
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
    </main>
  );
}

export default ProfileEditor;
