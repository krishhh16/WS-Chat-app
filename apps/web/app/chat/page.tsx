'use client'

import React from 'react';
import Sidebar from '../../components/Sidebar';
import ChatComponent from '../../components/ChatComponent';

const GoingChat = () => {
  
  return (
    <div className="flex">
    <Sidebar/>
    <ChatComponent/> 
    </div>
  );
};

export default GoingChat;
