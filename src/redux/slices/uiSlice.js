import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  confirmBox: {
    message: "",
    status: false,
  },
  isConfirm: {
    status: false,
  },
  ToastState: [
   

  ],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setConfirmBox: (state, action) => {
      state.confirmBox = action.payload;
    },
    setIsConfirm: (state, action) => {
      state.isConfirm = action.payload;
    },
    setToast: (state, action) => {
      state.ToastState.push({ id: uuidv4(), ...action.payload });
    },
    removeToast: (state, action) => {
      state.ToastState = state.ToastState.filter(el => el.id !== action.payload);
    },
  },
});

export const { setConfirmBox, setIsConfirm, setToast, removeToast } = uiSlice.actions;

export default uiSlice.reducer;
