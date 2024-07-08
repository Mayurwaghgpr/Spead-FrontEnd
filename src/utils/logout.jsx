import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLogin, setUser } from "../redux/slices/authSlice";
import { setData } from "../redux/slices/postSlice";
import { setConfirmBox } from "../redux/slices/uiSlice";
import Cookies from "js-cookie";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/auth/logout`, null, {
        withCredentials: true,
      });
      dispatch(setData(null));
      dispatch(setIsLogin(false));
      dispatch(setUser(null));
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("selectedPost");
      localStorage.removeItem("Admin profile");
      localStorage.removeItem("otherUser");
      // Cookies.remove("token");
      setConfirmBox({});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
