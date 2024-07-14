import React, { useContext } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const Authorization = JSON.parse(localStorage.getItem("Authorization"));
  console.log(Authorization);
  if (Authorization?.status && !isLogin) {
    dispatch(
      setNotify({
        message: Authorization.message,
        status: true,
      })
    );
    <Navigate to="/signin" replace />;
  }
  console.log("this p", isLogin);
  return isLogin ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
