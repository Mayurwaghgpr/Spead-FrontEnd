import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userProfile:{},
}

const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
    setuserProfile: (state, action) => {
            state.userProfile = action.payload
        },

    }
})

export const {setuserProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer