import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { EditeUserProfile } from "../../Handlers/ProfileHandler";

function ProfileEditor() {
  const { userProfile, setuserProfile } = useContext(UserContext);
  const [newInfo, setNewInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const Admin = JSON.parse(localStorage.getItem("Admin profile")) || [];

  useEffect(() => {
    if (Admin.length > 0 && userProfile.length === 0) {
      console.log(Admin); // Debugging: Check Admin value
      setuserProfile(Admin);
    }
  }, []); // Empty dependency array
  console.log(newInfo);
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
      event.target.value = ""; // Reset file input
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
      setIsLoading(true); // Set loading to true
      setSuccessMessage(""); // Reset success message
      try {
        const result = await EditeUserProfile(newInfo);
        if (result.status === 200) {
          setuserProfile([result.data]);
          localStorage.setItem("Admin profile", JSON.stringify([result.data]));
          setSuccessMessage("Profile updated successfully!");

          // Set success message
        }
      } catch (err) {
        console.error("Error updating profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  if (successMessage !== "") {
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  }

  return (
    <main className="flex h-screen justify-center items-start">
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <article className="m-3 flex lg:items-start justify-center items-center flex-col p-5 gap-6">
          <div
            className="border w-full rounded-full"
            onClick={triggerFileInput}
            style={{ cursor: "pointer" }}
            aria-label="Upload profile picture"
          >
            {userProfile.length > 0 && (
              <img
                className="h-[100px] w-[100px] rounded-full"
                src={
                  newInfo.userImageFile ||
                  `http://localhost:3000/${userProfile[0]?.userImage}`
                }
                alt="Profile"
                loading="lazy"
              />
            )}
          </div>
          <div className="flex flex-col w-[300px] items-end h-full lg:w-[700px] gap-2">
            <div className="w-full">
              <input
                className="w-full p-3"
                type="text"
                name="username"
                defaultValue={userProfile[0]?.username}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <input
                className="w-full p-3"
                type="text"
                name="email"
                defaultValue={userProfile[0]?.email}
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
                defaultValue={userProfile[0]?.userInfo}
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
