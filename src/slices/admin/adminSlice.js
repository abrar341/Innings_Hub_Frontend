import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clubs: [],
    squads: [], // Each squad refers to a team
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setClubs: (state, action) => {
            state.clubs = action.payload.data;
        },
        setSquads: (state, action) => {
            state.squads = action.payload.data;
        },
        clearClubs: (state) => {
            state.clubs = initialState.clubs; // Reset to initial state
        },
        addSquad: (state, action) => {
            const newSquad = action.payload; // New squad data
            state.squads.push(newSquad); // Add the new squad (team) to the list
        },
        removeSquad: (state, action) => {
            const squadId = action.payload; // Squad ID to remove
            state.squads = state.squads.filter(squad => squad._id !== squadId); // Remove squad by ID
        },
        updateSquad: (state, action) => {
            const updatedSquad = action.payload;
            const squadIndex = state.squads.findIndex(squad => squad._id === updatedSquad._id);
            if (squadIndex !== -1) {
                state.squads[squadIndex] = updatedSquad; // Update squad details
            }
        },
    },
});

// Export actions for use in components
export const {
    setClubs, clearClubs, setSquads, addSquad, removeSquad, updateSquad
} = adminSlice.actions;

// Export the reducer to be included in the store
export default adminSlice.reducer;
