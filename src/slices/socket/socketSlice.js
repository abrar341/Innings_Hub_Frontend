// socketSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { updateCredentials } from '../auth/authSlice';

// Initial state
const initialState = {
    socket: null,
    notifications: [],
    completedmatch: [],
    connected: false,
};

// Create the slice
const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
            state.connected = !!action.payload;
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        updateNotification: (state, action) => {
            const { id, notification } = action.payload; // Expects an ID and an object with the fields to update
            console.log(id, notification);

            // Find the index of the notification with the matching _id
            const notificationIndex = state.notifications.findIndex(
                (notif) => notif._id === id
            );
            console.log(notificationIndex);

            if (notificationIndex !== -1) {
                // Update only the specified fields of the notification
                state.notifications[notificationIndex] = {
                    ...state.notifications[notificationIndex],
                    ...notification,
                };
            }
        },
    },
});

export const { setSocket, addNotification, updateNotification, setNotifications, clearNotifications, setConnected } = socketSlice.actions;

// Thunk to initialize the socket
export const initializeSocket = (userInfo) => (dispatch, getState) => {
    const { socket } = getState().socket;

    // Avoid reinitializing if socket already exists
    if (!socket) {
        const newSocket = io('http://localhost:8000', {
            query: { role: userInfo.role, userId: userInfo._id }
        });

        // Dispatch the socket to Redux state
        dispatch(setSocket(newSocket));

        // Set up event listeners
        newSocket.on('connect', () => {
            dispatch(setConnected(true));
            // toast.dismiss();
            // toast.success('Connected to server');
        });

        newSocket.on('disconnect', () => {
            dispatch(setConnected(false));
            // toast.dismiss();
            // toast.error('Disconnected from server');
        });
        // Listen for initial notifications on connect
        newSocket.on('notifications', (notifications) => {
            console.log("notifications", notifications);

            if (Array.isArray(notifications)) {
                // Use setNotifications for an array of notifications
                dispatch(setNotifications(notifications));
                // toast.success(`${notifications.length} notifications received`);
            } else {
                // Fallback if only a single notification is received
                dispatch(addNotification(notifications));
                // toast.success('New notification received');
            }
        });

        newSocket.on('notification', (notification) => {
            dispatch(addNotification(notification));
            toast.dismiss();
            toast.success('New notification received');
            // toast.success(notification.message);
        });

        newSocket.on('update', (updateData) => {
            // Dispatch an action to update credentials
            dispatch(updateCredentials(updateData)); // Replace 'updateCredentials' with your Redux action creator if needed

            // Show a toast message for the update
            toast.dismiss();
            toast.success('A club status update has been received');

            // Optionally include more detailed feedback
            if (updateData.club && updateData.club.name) {
                toast.info(`Status for club "${updateData.club.name}" is now "${updateData.club.status}"`);
            }
        });


    }
};

// Thunk to disconnect the socket
export const disconnectSocket = () => (dispatch, getState) => {
    const { socket } = getState().socket;

    if (socket) {
        socket.disconnect();
        dispatch(setSocket(null)); // Clear the socket from state
        dispatch(setConnected(false));
    }
};

export default socketSlice.reducer;
