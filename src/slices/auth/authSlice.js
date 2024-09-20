import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  userType: null,
  isVerified: false,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { role, isVerified } = action.payload;
      state.userInfo = action.payload;
      state.userType = role;
      state.isVerified = isVerified;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.userInfo = null;
      state.userType = null;
      state.isVerified = false;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, logout, setLoading, setError, resetError } = authSlice.actions;

export default authSlice.reducer;
