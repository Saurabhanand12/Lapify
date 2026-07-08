import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState:{
        user: null,
        isAuthenticated : false,
        loading : false,
        userProfile : null,
    },
    reducers :{
        setAuthUser:(state , action) =>{
            state.user = action.payload,
            state.isAuthenticated = true;
        },
        logoutUser:(state) =>{
            state.user = null,
            state.isAuthenticated = false;
        },
        setLoading:(state,action) => {
            state.loading = action.payload;
        },
        setUserProfile : (state , action ) => {
            state.userProfile= action.payload;
        }
    }
});

export const {setAuthUser, logoutUser, setLoading,setUserProfile} =authSlice.actions;
export default authSlice.reducer;