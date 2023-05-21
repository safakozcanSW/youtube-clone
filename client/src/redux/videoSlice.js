import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentvideo = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logOut: (state) => {
            state.currentvideo = null;
            state.loading = false;
            state.error = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logOut } = videoSlice.actions;

export default videoSlice.reducer;
