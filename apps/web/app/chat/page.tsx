'use client'

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ChatComponent from '../../components/ChatComponent';
import axios from 'axios';
import Unauthorized from '../../components/unauthorized';
import GroupChatComponent from '../../components/GroupChatComponent';

export interface SelfData{
  myUsername: string;
  myUserId: string;
}
export interface userType {
  username: string;
  userId: string,
  isRoom: boolean,
  unread: boolean
}
const GoingChat = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isUser, setIsUser] = useState<SelfData>({
    myUsername: "",
    myUserId: "",
  })
  const [contacts, setContacts] = useState<userType[]>([])
  const [activeUser, setActiveUser] = useState<userType>({
    username: "",
    userId: "",
    isRoom: false,
    unread: false
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
      setIsLoading(!isLoading)
    }
  }

  return (
    <div className="flex">
      {
        ( !isLoading )
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