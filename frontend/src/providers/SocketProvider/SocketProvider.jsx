import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { SocketContext } from '../../contexts';
import { addMessage } from '../../slices/messagesSlice';
import { addChannel, deleteChannel, updateChannel } from '../../slices/channelsSlice';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('newMessage', (payload) => {
      console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
      dispatch(addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      console.log('newChannel', payload); // { id: 6, name: "new channel", removable: true }
      dispatch(addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(deleteChannel(payload));
    });

    socket.on('renameChannel', (payload) => {
      console.log(payload); // { id: 7, name: "new name channel", removable: true }
      dispatch(updateChannel(payload));
    });
  }, [dispatch, socket]);

  const emit = useCallback((nameEvent, payload) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit(nameEvent, payload, (err, response) => {
      if (response?.status === 'ok') {
        resolve(response);
      } else {
        reject(err);
      }
    });
  }), [socket]);

  const sendMessage = useCallback((payload) => emit('newMessage', payload), [emit]);
  const createChannel = useCallback((payload) => emit('newChannel', payload), [emit]);
  const renameChannel = useCallback((payload) => emit('renameChannel', payload), [emit]);
  const removeChannel = useCallback((payload) => emit('removeChannel', payload), [emit]);

  const value = useMemo(() => ({
    sendMessage, createChannel, renameChannel, removeChannel,
  }), [createChannel, removeChannel, renameChannel, sendMessage]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
