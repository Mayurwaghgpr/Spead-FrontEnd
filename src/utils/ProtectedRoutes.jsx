import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useContext(UserContext);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
