import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import userApi from "../Apis/userApi";
import { setIsLogin, setUser } from "../redux/slices/authSlice";

function PersistentUser() {
  const { getLogInUserData } = userApi();
  // const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () => getLogInUserData(),
    onSuccess: (data) => {
      // console.log("user login data:", data);
      dispatch(setIsLogin(true));
      dispatch(setUser(data));
    },
    onError: (error) => {
      dispatch(setIsLogin(false));
      console.error("Error fetching logged-in user data:", error);
    },
    retry: false,
  });

  return null;
}

export default memo(PersistentUser);
