import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useMarkNotificationAsReadMutation } from "../slices/socket/NotificationApiSlice";
import toast from "react-hot-toast";
import { updateNotification } from "../slices/socket/socketSlice";

export function Notification() {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.socket.notifications);

    // Sort notifications by timestamp (newest first)
    const sortedNotifications = [...notifications].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    const unreadNotifications = sortedNotifications.filter((notif) => !notif.isRead);
    const unreadCount = unreadNotifications.length;

    const [animationParent] = useAutoAnimate();
    const [showUnread, setShowUnread] = useState(false); // Default to showing unread notifications

    const displayedNotifications = showUnread ? unreadNotifications : sortedNotifications;

    const navigate = useNavigate();

    // Mutation for marking notifications as read
    const [markNotificationAsRead] = useMarkNotificationAsReadMutation();

    // Handler for marking notification as read and navigating
    const handleNotificationClick = async (notif) => {
        console.log(notif);

        if (!notif.isRead) {
            try {
                console.log(notif?._id);

                const updatedNotification = await markNotificationAsRead(notif?._id).unwrap();

                // Dispatch the updateNotification action with the entire updated notification
                dispatch(
                    updateNotification({
                        id: notif?._id,
                        notification: updatedNotification?.data?.notification, // Pass the updated object
                    })
                );
            } catch (error) {
                console.error("Error marking notification as read:", error);
            }
        }

        if (notif.redirectUrl) navigate(notif.redirectUrl);
    };

    return (
        <div className="notifications-list p-6 bg-gray-50 rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">
                    {showUnread ? (
                        <>
                            Unread Notifications <span className="text-gray-500">({unreadCount})</span>
                        </>
                    ) : (
                        <>
                            Notifications{" "}
                            <span className="text-gray-500">({sortedNotifications.length})</span>
                        </>
                    )}
                </h2>
                <button
                    className={clsx(
                        "px-4 py-2 rounded-md text-sm font-medium focus:outline-none transition",
                        showUnread
                            ? "bg-gray-800 text-white hover:bg-gray-900"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    )}
                    onClick={() => setShowUnread((prev) => !prev)}
                >
                    {showUnread ? "Show All" : `Show Unread (${unreadCount})`}
                </button>
            </div>

            {/* Notifications List */}
            {displayedNotifications.length > 0 ? (
                <div ref={animationParent} className="space-y-3">
                    {displayedNotifications.map((notif) => (
                        <div
                            key={notif._id}
                            className={clsx(
                                "p-4 rounded-md border transition cursor-pointer",
                                notif.isRead
                                    ? "bg-white border-gray-200"
                                    : "bg-gray-200 border-gray-200"
                            )}
                            onClick={() => handleNotificationClick(notif)}
                        >
                            <div className="flex items-start gap-3">
                                {/* Sender Image */}
                                <img
                                    src={
                                        notif.senderImage ||
                                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                    }
                                    alt={`Profile of ${notif.senderName || "Unknown Sender"}`}
                                    className="w-10 h-10 rounded-full border border-gray-200"
                                />

                                {/* Notification Details */}
                                <div className="flex flex-col w-full">
                                    <p className="text-sm text-gray-800">
                                        {notif.message || "No message available."}
                                    </p>
                                    <span className="text-xs text-gray-500 mt-2">
                                        {new Date(notif.timestamp).toLocaleDateString([], {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}{" "}
                                        at{" "}
                                        {new Date(notif.timestamp).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-sm">
                    {showUnread
                        ? "No unread notifications available."
                        : "No notifications available."}
                </p>
            )}
        </div>
    );
}
