import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    players: [],
};

const playerSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setPlayers: (state, action) => {
            state.players = action.payload.data;
        },
        delete_Player: (state, action) => {
            const playerId = action.payload.id;
            state.players = state.players.filter(player => player.id !== playerId);
        },
        update_Player: (state, action) => {
            const updatedPlayer = action.payload.data;
            const index = state.players.findIndex(player => player.id === updatedPlayer.id);
            if (index !== -1) {
                state.players[index] = updatedPlayer;
            }
        },
    },
});

// Export actions for use in components
export const { setPlayers, clearPlayers, delete_Player, update_Player } = playerSlice.actions;

// Export the reducer to be included in the store
export default playerSlice.reducer;
