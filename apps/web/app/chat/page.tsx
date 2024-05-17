'use client'

import React, { useEffect, useState } from 'react';
import {io, Socket} from 'socket.io-client'
import axios from "axios"
interface MsgType {
  username: string;
  message: string;
  selfEnd: boolean
}

const GoingChat = () => {
  const [msgs, setMsgs] = useState<MsgType[]>([]);
  const [text, setText] = useState<string>("");
  const [isUser, setIsUser] = useState<boolean>(false)
  const [socket, setSocket] = useState<Socket|null>(null);
  const arr = msgs
  .map((item) => {
    return (
      <Message username={item.username} text={item.message} selfEnd={item.selfEnd} />
    )
  })

  useEffect(() => {
    socketConnect();
    const socket = io('http://localhost:3001');
    setSocket(socket);
    console.log('connected with the server')
  
    socket?.on('received', ({msg}: {msg: string}) => {
      console.log(`Received message from the server: ${msg}`)
      setMsgs([...msgs, {username: "Dave", message: "msg", selfEnd: false}])
    })
  }, [])

  async function socketConnect() {
    const userData = await axios.get('http://localhost:3001/user')

    if (!userData.data.success){
      alert("Please login before chating with your friends")
      return
    }
    setIsUser(true)

  }
  const handleSubmit = () => {
    setMsgs([...msgs, {username: "Me", message: text , selfEnd: true}]); 
    setText('')

    socket?.emit('message', {msg: text, room: "none"})
     
  }
  
  return (
    
    <div className="flex">
      {/* this is the sidebar */}
    <div className="w-1/3 border-r-4">

    </div>  
    {/* This is the chat window section */}
    {isUser ?
    (
      <div className="flex w-2/3 justify-center items-center min-h-screen bg-gray-100">
      <div className="w-4/5 h-screen border rounded-lg overflow-hidden shadow-lg">
        <div className="bg-blue-500 text-white p-3 text-center">Chat with Dave!</div>
        <div className="p-3 max-h-96 overflow-y-auto min-h-96 ">
          {arr}
        </div>
        <div className="p-3 border-t ">
          <input onChange={(e) => {setText(e.target.value)}} className="w-full px-4 py-2 rounded-lg border outline-none focus:border-blue-500" value={text} type="text" placeholder="Type your message here..." />
          <button className="w-2/3 mx-auto justify-center rounded-xl bg-white font-semibold  text-blue-500" onClick={handleSubmit}  type="submit">Send message</button>
        </div>
      </div>
    </div>
    )  :
    (
      <div>
        <h1 className="font-extrabold">Login before chatting </h1>
      </div>
    )
  }
   
    </div>
  );
};

const Message = ({ username, text, selfEnd }: {username: string, text: string, selfEnd: boolean}) => {
  const alignment = selfEnd ? 'self-end' : 'self-start';
  const bgClass = selfEnd ? 'bg-gray-300 text-gray-800' : 'bg-blue-500 text-white';
  
  return (
    <div className={`mt-2 p-3 rounded-lg max-w-md ${alignment} ${bgClass}`}>
      <div className="text-xs text-gray-500 mb-1">{username}</div>
      <div>{text}</div>
    </div>
  );
};

export default GoingChat;
