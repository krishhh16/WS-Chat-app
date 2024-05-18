'use client'

import React from 'react';
import Sidebar from '../../components/Sidebar';
import ChatComponent from '../../components/ChatComponent';

interface MsgType {
  username: string;
  message: string;
  selfEnd: boolean
}

const GoingChat = () => {
  
  return (
    <div className="flex">
      {/* this is the sidebar */}
    <Sidebar/>
    <ChatComponent/> 
    </div>
  );
};

export default GoingChat;
