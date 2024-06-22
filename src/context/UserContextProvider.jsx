import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams, useRoutes } from "react-router-dom";

import UserContext from "./UserContext.jsx";

import spinnerImage from "/system-regular-720-spinner-half-circles.gif";

function UserContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [ProfileId, setProfileId] = useState();
  const [data, setData] = useState([]);
  const [topiclist, setTopiclist] = useState(
    () => data?.map((el) => el.topic) || []
  );
  const [isConfirmBox, setConfirmBox] = useState({
    message: "",
    status: false,
  });

  const [isConfirm, setIsConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsLogin(true);
          setUser(decoded);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, [isLogin]);

  const logout = () => {
    setData(null);
    setIsLogin(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("selectedPost");
    localStorage.removeItem("Admin profile");
    localStorage.removeItem("otherUser");
    navigate("/", { replace: true });
  };

  return loading ? (
    <img src={spinnerImage} alt="Loading..." />
  ) : (
    <UserContext.Provider
      value={{
        isLogin,
        setIsLogin,
        user,
        setUser,
        logout,
        submit,
        setSubmit,
        selectedPost,
        setSelectedPost,
        isOpen,
        setIsOpen,
        setData,
        data,
        topiclist,
        setTopiclist,
        isConfirmBox,
        setConfirmBox,
        isConfirm,
        setIsConfirm,
        ProfileId,
        setProfileId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
