import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBell } from 'react-icons/fa6';

const NotificationBell = ({ onClose, textColor }) => {
    const notifications = useSelector((state) => state.socket.notifications);
    const unreadNotifications = notifications.filter((notif) => !notif.isRead);
    const unreadCount = unreadNotifications.length;

    useEffect(() => {
        if (onClose) {
            const timer = setTimeout(() => onClose(), 5000);
            return () => clearTimeout(timer);
        }
    }, [onClose]);

    return (
        <div className="relative">
            <Link to="/notifications" className="text-gray-600 text-2xl">
                <FaBell className={textColor} />
            </Link>
            {/* Notification Badge */}
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5 animate-pulse">
                    {unreadCount}
                </span>

            )}
        </div>
    );
};

export default NotificationBell;
