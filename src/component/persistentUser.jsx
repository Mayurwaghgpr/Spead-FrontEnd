import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import userApi from "../Apis/userApi";
import { setUser } from "../redux/slices/authSlice";

function PersistentUser() {
  const { getLogInUserData } = userApi();
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () => getLogInUserData(),
    onSuccess: (data) => {
      console.log("user login data:", data);
      dispatch(setUser(data));
    },
    onError: (error) => {
      localStorage.removeItem("AccessToken");
      console.error("Error fetching logged-in user data:", error);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!isLogin, // Fetch data only if isLogin is true
  });

  return null;
}

export default memo(PersistentUser);
