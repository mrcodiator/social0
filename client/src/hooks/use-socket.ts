// src/hooks/useSocketNotifications.ts
import { useEffect, useState } from 'react';
import { socket } from '../lib/socket';
import { NotifyType } from '../types/notify.type';

export const useSocketNotifications = () => {
    const [notifications, setNotifications] = useState<NotifyType[]>([]);

    useEffect(() => {
        // Handle incoming notifications
        socket.on('notification', (notification: NotifyType) => {
            setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        });

        // Cleanup on unmount
        return () => {
            socket.off('notification');
        };
    }, []);

    return notifications;
};

