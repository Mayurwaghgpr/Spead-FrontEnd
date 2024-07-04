import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmBox: {
    message: "",
    status: false,
  },
    isConfirm: {
        status: false
    },
  ErrNotify: { message: "", status: false },
  Notify: {message:"" , status:false}
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setConfirmBox: (state, action) => {
      state.confirmBox = action.payload
    },
    setIsConfirm: (state, action) => {
      state.isConfirm = action.payload;
    },
    setErrNotify: (state, action) => {
      state.ErrNotify = action.payload
    },
    setNotify: (state, action) => {
      state.Notify = action.payload
    }
  },
});

export const { setConfirmBox, setIsConfirm,setErrNotify,setNotify } = uiSlice.actions;

export default uiSlice.reducer;
