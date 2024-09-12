import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import tournamentReducer from './slices/tournament/tornamentSlice';
import playerReducer from './slices/player/playerSlice';
import teamReducer from './slices/team/teamSlice';
import dialogReducer from './slices/dialogbox/dialogSlice';
import { apiSlice } from './slices/apiSlice';

// Import redux-persist dependencies
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use local storage for persistence

// Persist configuration for the auth slice
const authPersistConfig = {
    key: 'auth',        // The key to be stored in local storage
    storage,            // Use local storage
    whitelist: ['isAuthenticated', 'userType', 'isVerified'], // Only persist specific parts of the state
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Handles API slices
        auth: persistedAuthReducer,               // Auth slice with persistence
        tournaments: tournamentReducer,           // Tournament slice
        players: playerReducer,                   // Player slice
        teams: teamReducer,                       // Team slice
        dialog: dialogReducer,                    // Dialog slice
        // Add other reducers here
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable checks because of redux-persist
        }).concat(apiSlice.middleware),
    devTools: true,
});

const persistor = persistStore(store);

export { store, persistor };
