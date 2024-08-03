import React, { memo, useContext } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToast } from "../redux/slices/uiSlice";
const ProtectedRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.auth);
  const { TostState } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const Authorization = JSON.parse(localStorage.getItem("Authorization"));
  console.log(Authorization);
  if (Authorization?.status && !isLogin) {
    dispatch(setToast({ message: Authorization.message }));
    <Navigate to="/signin" replace />;
  }
  console.log("this p", isLogin);
  return isLogin ? children : <Navigate to="/signin" replace />;
};

export default memo(ProtectedRoute);
