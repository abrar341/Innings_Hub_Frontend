import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    players: [],
    teams: []
};

const clubManagerSlice = createSlice({
    name: 'clubManager',
    initialState,
    reducers: {
        setPlayers: (state, action) => {
            state.players = action.payload.data;
        },
        clearPlayers: (state) => {
            state.players = initialState.players; // Reset to initial state
        },
        deletePlayer: (state, action) => {
            const playerId = action.payload.id;
            state.players = state.players.filter(player => player.id !== playerId);
        },
        updatePlayer: (state, action) => {
            const updatedPlayer = action.payload.data;
            const index = state.players.findIndex(player => player.id === updatedPlayer.id);
            if (index !== -1) {
                state.players[index] = updatedPlayer;
            }
        },
        setTeams: (state, action) => {
            state.teams = action.payload.data;
        },
        deleteTeam: (state, action) => {
            const teamId = action.payload.id;
            state.teams = state.teams.filter(team => team.id !== teamId);
        },
        updateTeam: (state, action) => {
            const updatedTeam = action.payload.data;
            const index = state.teams.findIndex(team => team.id === updatedTeam.id);
            if (index !== -1) {
                state.teams[index] = updatedTeam;
            }
        },
        clearPlayers: (state) => {
            state.players = [];
        },
        clearTeams: (state) => {
            state.teams = [];
        },
    },
});

// Export actions for use in components
export const {
    setPlayers,
    clearPlayers,
    deletePlayer,
    updatePlayer,
    setTeams,
    deleteTeam,
    updateTeam,
    clearTeams
} = clubManagerSlice.actions;

// Export the reducer to be included in the store
export default clubManagerSlice.reducer;
