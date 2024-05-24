'use client'

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ChatComponent from '../../components/ChatComponent';
import axios from 'axios';
import Unauthorized from '../../components/unauthorized';
import GroupChatComponent from '../../components/GroupChatComponent';

interface SelfData{
  myUsername: string;
  myUserId: string;
}
interface userType {
  username: string;
  userId: string
  isRoom: boolean
}
const GoingChat = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isUser, setIsUser] = useState<SelfData>({
    myUsername: "",
    myUserId: "",
  })
  const [contacts, setContacts] = useState<userType[]>([])
  const [activeUser, setActiveUser] = useState({
    username: "",
    userId: "",
    isRoom: false,
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
      setIsUser({myUsername: user.data.username, myUserId: user.data.userID})
      setIsLoggedIn(true)
    }
  }

  return (
    <div className="flex">
      {
        isLoggedIn 
        ?
        <>
        <Sidebar setActiveUser={setActiveUser} userData={isUser}  contacts={contacts} setContacts={setContacts} />
        {activeUser.isRoom ? <GroupChatComponent setContacts={setContacts}  setActiveUser={setActiveUser} username={activeUser.username} /> : <ChatComponent setActiveUser={setActiveUser}   myUsername={isUser.myUsername} myUserId={isUser.myUserId} contacts={contacts} setContacts={setContacts}  username={activeUser.username}  userId={activeUser.userId} /> }
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