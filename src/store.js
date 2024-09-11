import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import tournamentReducer from './slices/tournament/tornamentSlice';
import { apiSlice } from './slices/apiSlice';
import playerReducer from './slices/player/playerSlice'; // Import the player slice
import teamReducer from './slices/team/teamSlice'; // Import the player slice
import dialogReducer from './slices/dialogbox/dialogSlice'; // Import the player slice

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Handles API slices
        auth: authReducer,                        // Authentication slice
        tournaments: tournamentReducer,           // Tournament slice
        players: playerReducer,                   // Player slice
        teams: teamReducer,                   // Player slice
        dialog: dialogReducer,
        // Add other reducers here
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
