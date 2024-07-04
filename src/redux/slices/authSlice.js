import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

// Retrieve admin profile and token from local storage
const Admin = JSON.parse(localStorage.getItem("Admin profile"));
const token = localStorage.getItem("token");

// Function to check the validity of the token
const tokenCheck = () => {
  if (token) {
    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 > Date.now()) {
        return true;
      } else {
        localStorage.removeItem("token");
        return false;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      return false;
    }
  }
  return false;
};

// Initial state
const initialState = {
  isLogin: tokenCheck(),
  user: Admin || [],
  loading: true,
  token: token || null
};

// Create a slice of the Redux store
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = [];
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("Admin profile");
    },
  },
});

// Export actions and reducer
export const { setIsLogin, setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
