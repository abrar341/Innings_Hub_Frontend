import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import tournamentReducer from './slices/tournament/tornamentSlice';
import playerReducer from './slices/player/playerSlice';
import teamReducer from './slices/team/teamSlice';
import dialogReducer from './slices/dialogbox/dialogSlice';
import clubManagerReducer from './slices/clubManager/clubManagerSlice'; // Import the Club Manager Slice
import adminReducer from './slices/admin/adminSlice'; // Import the Club Manager Slice
import { apiSlice } from './slices/apiSlice';

// Import redux-persist dependencies
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use local storage for persistence

// Persist configuration for the auth slice
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['userInfo', 'isAuthenticated', 'userType', 'isVerified'],
};

const clubManagerPersistConfig = {
    key: 'clubManager',  // A unique key for club manager slice persistence
    storage,
    whitelist: ['players', 'teams'],  // Persist players and teams
};
const adminPersistConfig = {
    key: 'admin',  // A unique key for club manager slice persistence
    storage,
    whitelist: [''],  // Persist players and teams
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedClubManagerReducer = persistReducer(clubManagerPersistConfig, clubManagerReducer);
const persistedadminReducer = persistReducer(adminPersistConfig, adminReducer);

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Handles API slices
        auth: persistedAuthReducer,               // Auth slice with persistence
        tournaments: tournamentReducer,           // Tournament slice
        players: playerReducer,                   // Player slice
        teams: teamReducer,                       // Team slice
        dialog: dialogReducer,                    // Dialog slice
        clubManager: persistedClubManagerReducer, // Club Manager slice with persistence
        admin: persistedadminReducer, // Club Manager slice with persistence
        // Add other reducers here if necessary
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable checks because of redux-persist
        }).concat(apiSlice.middleware),
    devTools: true,
});

const persistor = persistStore(store);

export { store, persistor };
