import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teams: [],
};

const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        set_Team: (state, action) => {
            state.teams = action.payload.data;
        },
        delete_Team: (state, action) => {
            const teamId = action.payload.id;
            state.teams = state.teams.filter(team => team.id !== teamId);
        },
        update_Team: (state, action) => {
            const updatedTeam = action.payload.data;
            const index = state.teams.findIndex(team => team.id === updatedTeam.id);
            if (index !== -1) {
                state.teams[index] = updatedTeam;
            }
        },
    },
});

// Export actions for use in components
export const { set_Team, delete_Team, update_Team } = teamSlice.actions;

// Export the reducer to be included in the store
export default teamSlice.reducer;
