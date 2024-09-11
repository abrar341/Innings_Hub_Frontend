import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoginDialogOpen: false,
    isSignupDialogOpen: false,
    isVerifyDialogOpen: false,
    // Add more dialog states as needed
};

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        showLoginDialog: (state) => {
            state.isLoginDialogOpen = true;
        },
        hideLoginDialog: (state) => {
            state.isLoginDialogOpen = false;
        },
        showSignupDialog: (state) => {
            state.isSignupDialogOpen = true;
        },
        hideSignupDialog: (state) => {
            state.isSignupDialogOpen = false;
        },
        showVerifyDialog: (state) => {
            state.isVerifyDialogOpen = true;
        },
        hideVerifyDialog: (state) => {
            state.isVerifyDialogOpen = false;
        },
        // Add more dialog show/hide actions here as needed
    },
});

export const {
    showLoginDialog,
    hideLoginDialog,
    showSignupDialog,
    hideSignupDialog,
    showVerifyDialog,
    hideVerifyDialog,
} = dialogSlice.actions;

export default dialogSlice.reducer;
