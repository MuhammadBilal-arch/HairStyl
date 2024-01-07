import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { showToast } from '../utils/functions';
import { TOAST_TYPE } from '../utils/constants';
import { fetchNotifications } from '../redux/slices/notifications';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/urls';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.User);
  const dispatch = useDispatch<any>();
  // useEffect(() => {
  //   const socketConnection = io.connect(BASE_URL);
  //   setSocket(socketConnection);

  //   socketConnection.on('connect', () => {
  //     console.log('Connected to the server');
  //   });

  //   socketConnection.on('disconnect', () => {
  //     console.log('Disconnected from the server');
  //   });

  //   socketConnection.on('error', (error) => {
  //     console.error('Socket error:', error);
  //   });

  //   return () => {
  //     socketConnection.disconnect();
  //   };
  // }, [user]);

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.emit('orderNotificationRoom', user?.dispensary?._id);
  //   const handleMessage = ({ orderId, status }) => {
  //     dispatch(fetchNotifications());
  //     showToast(
  //       `Order (ID ${orderId}) status updated to : ${status}`,
  //       TOAST_TYPE.info
  //     );
  //   };

  //   socket?.on('orderStatusUpdated', handleMessage);
  //   return () => {
  //     socket?.off('orderStatusUpdated', handleMessage);
  //   };
  // }, [socket]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
