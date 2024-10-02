import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    matches: [],
};

const matchSlice = createSlice({
    name: 'matches',
    initialState,
    reducers: {
        setMatch: (state, action) => {
            state.teams = action.payload.data;
        },
    },
});

// Export actions for use in components
export const { setMatch } = matchSlice.actions;

// Export the reducer to be included in the store
export default matchSlice.reducer;
