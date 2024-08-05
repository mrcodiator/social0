import { useEffect, useState } from 'react';
import { socket } from '../lib/socket';
import { NotifyType } from '../types/notify.type';

export const useSocketNotifications = () => {
    const [notifications, setNotifications] = useState<NotifyType[]>([]);

    useEffect(() => {
        // Handle incoming notifications
        const handleNewNotification = (notification: NotifyType) => {
            setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        };

        const handleDeleteNotification = (notificationId: string) => {
            setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification._id !== notificationId));
        };

        socket.on('notification', handleNewNotification);
        socket.on('delete-notification', handleDeleteNotification);

        // Cleanup on unmount
        return () => {
            socket.off('notification', handleNewNotification);
            socket.off('delete-notification', handleDeleteNotification);
        };
    }, []);

    return notifications;
};
