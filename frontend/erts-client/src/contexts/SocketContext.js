// src/contexts/SocketContext.js
import React, { createContext } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

const socket = io('http://localhost:5000'); // Update with your backend URL

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);
