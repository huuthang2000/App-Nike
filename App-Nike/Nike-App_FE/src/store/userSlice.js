import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSclice";

const initialState = {
    currentUser: null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logout:(state)=>{
            state.currentUser = null;
            state.errorMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(apiSlice.endpoints.loginUser.matchFulfilled, (state, action) => {
          state.currentUser = action.payload;
        });
      },

})

// Export actions
export const { logout } = userSlice.actions;

// Select state currentUser from slice
export const selectUser = (state) => state.user.currentUser;

// Export reducer
export default userSlice.reducer;
