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
      console.log(action.payload);

      const { role, isVerified } = action.payload;
      state.userInfo = action.payload;
      state.userType = role;
      state.isVerified = isVerified;
      state.isAuthenticated = true;
      state.error = null;
    },
    updateCredentials: (state, action) => {
      console.log("Payload received:", action.payload);

      const { club, ...rest } = action.payload;


      // Update specific fields in userInfo
      state.userInfo = {
        ...state.userInfo,
        ...rest, // Merge additional fields from payload
      };
      console.log(state.userInfo.club);

      // Replace userInfo.club entirely if club is valid
      if (club && typeof club === "object") {
        console.log("Updating club:", club);
        state.userInfo.club = { ...club }; // Ensure a fresh object is assigned
        console.log(state.userInfo.club);

      } else {
        console.warn("Invalid club data:", club);
      }
      state.error = null; // Clear any previous errors
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

    setReviewData: (state, action) => {
      state.reviewData = action.payload;
    },
  },
});

export const { setCredentials, updateCredentials, setReviewData, logout, setLoading, setError, resetError } = authSlice.actions;

export default authSlice.reducer;