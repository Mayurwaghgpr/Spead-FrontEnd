import React, { useContext } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.auth);
  console.log("this p", isLogin);
  return isLogin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
