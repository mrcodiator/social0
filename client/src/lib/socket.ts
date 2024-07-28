import { io } from 'socket.io-client';
import { baseUrl } from './base-url';

export const socket = io(baseUrl.replace('/api', ''));

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
