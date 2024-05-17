// useSocket.ts
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3001'; // Replace with your server URL

const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io(SOCKET_SERVER_URL);

    // Set the socket instance to state
    setSocket(newSocket);

    // Cleanup function to disconnect the socket when the component unmounts
   
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return socket;
};

export default useSocket;
