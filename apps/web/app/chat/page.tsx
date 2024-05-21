'use client'

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ChatComponent from '../../components/ChatComponent';
import axios from 'axios';
import Unauthorized from '../../components/unauthorized';

interface sidebarContacts { 
  username: string;
  userId: string;
}
const GoingChat = () => {
  const [isUser, setIsUser] = useState(false)
  const [contacts, setContacts] = useState<sidebarContacts[]>([])
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
        <Sidebar setActiveUser={setActiveUser}  contacts={contacts} setContacts={setContacts} />
        <ChatComponent contacts={contacts} setContacts={setContacts}  username={activeUser.username}  userId={activeUser.userId} /> 
        </>
        :
        <>
        <Unauthorized/>
        </>
}
    </div>
  );
};

export default GoingChat;
