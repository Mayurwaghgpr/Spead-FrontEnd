import React, { memo, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToast } from "../redux/slices/uiSlice";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Authorization = JSON.parse(localStorage.getItem("Authorization"));

  if (Authorization?.status === false) {
    dispatch(
      setToast({
        message: Authorization?.message || "Unauthorized",
        type: "error",
      })
    );
    navigate("/signin", { replace: true });
  }

  return !isLogin ? <Navigate to="/signin" replace /> : children;
};

export default memo(ProtectedRoute);
