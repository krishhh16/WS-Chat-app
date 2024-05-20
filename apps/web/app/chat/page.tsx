'use client'

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ChatComponent from '../../components/ChatComponent';
import axios from 'axios';

const GoingChat = () => {
  const [isUser, setIsUser] = useState(false)
  const [activeUser, setActiveUser] = useState({
    username: "",
    userId: ""
  })
  useEffect(() => {
    userDetails();
  }, [])

  async function userDetails() {
    const user = await axios.get('http://localhost:3001/user', {withCredentials: true});

    if (!user.data.success){
      alert("Please login before starting a new Chat")
      return
    }else {
      setIsUser(true)
    }
  }

  return (
    <div className="flex">
      {
        isUser ?
        <>
        <Sidebar/>
        <ChatComponent username={activeUser.username}  userId={activeUser.userId} /> 
        </>
        :
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-700 mb-4">You do not have permission to view this page.</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            onClick={() => window.location.href = '/'}
          >
            Go to Homepage
          </button>
        </div>
      </div>
      }
    </div>
  );
};

export default GoingChat;
