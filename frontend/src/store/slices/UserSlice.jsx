import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isLoading : true,
}

const UserSlice =  createSlice({
    name:'user',
    initialState,
    reducers: {
        loadUser : (state,action)=>{
            state.user = action.payload;
            state.isLoading = false;
        },
        loading : (state,action)=>{
            state.isLoading = action.payload;
        }
    }
})

export const {loadUser,loading} = UserSlice.actions;
export default UserSlice.reducer;