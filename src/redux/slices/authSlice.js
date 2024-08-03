import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Retrieve admin profile and token from local storage
// const Admin = JSON.parse(localStorage.getItem("userAccount"));
const token = localStorage.getItem("AccessToken");

// Async thunk for token validation
// export const tokenCheck = () => {
//   if (token) {
//     try {
//       const decoded = jwtDecode(token);
//       if (decoded.exp * 1000 > Date.now()) { 
//         return true;
//       } else {
//         // dispatch(setErrNotify({ message: "Token has expired", status: true }));
//         localStorage.removeItem("AccessToken");
//         return false;
//       }
//     } catch (error) {
//       // console.error("Invalid token:", error);
//       localStorage.removeItem("AccessToken");
//       return false;
//     }
//   }
//   return false;
// };

// Initial state
const initialState = {
  isLogin: token,
  user:  {},
  loading: true,
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
  },
 
});

// Export actions and reducer
export const { setIsLogin, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
