import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pendingClubs: [],
    clubs: [],
    approvedClubs: [],
    rejectedClubs: [],
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setClubs: (state, action) => {
            state.clubs = action.payload.data;
        },
        clearClubs: (state) => {
            state.clubs = initialState.clubs; // Reset to initial state
        },
    },
});

// Export actions for use in components
export const {
    setClubs, clearClubs
} = adminSlice.actions;

// Export the reducer to be included in the store
export default adminSlice.reducer;
