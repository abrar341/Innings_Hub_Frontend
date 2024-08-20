import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
// Add other reducers as needed

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Handles API slices
        auth: authReducer,                      // Authentication slice
        // Add other reducers here
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
