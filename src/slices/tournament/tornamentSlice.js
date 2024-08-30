import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tournaments: [],
};

const tournamentSlice = createSlice({
    name: 'tournaments',
    initialState,
    reducers: {
        setTournaments: (state, action) => {
            state.tournaments = action.payload.data;
        },
        clearTournaments: (state) => {
            state.tournaments = [];
        },
        deleteSingleTournament: (state, action) => {
            const tournamentId = action.payload.id;
            state.tournaments = state.tournaments.filter(tournament => tournament.id !== tournamentId);
        },
        updateTournament: (state, action) => {
            const updatedTournament = action.payload.data;
            const index = state.tournaments.findIndex(tournament => tournament.id === updatedTournament.id);
            if (index !== -1) {
                state.tournaments[index] = updatedTournament;
            }
        },
    },
});

// Export actions for use in components
export const { setTournaments, clearTournaments, deleteSingleTournament, updateTournament } = tournamentSlice.actions;

// Export the reducer to be included in the store
export default tournamentSlice.reducer;
