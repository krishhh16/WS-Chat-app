'use client'

import React, { useState } from 'react';

interface MsgType {
  username: string;
  message: string;
  selfEnd: boolean
}

const GoingChat = () => {
  
  const [msgs, setMsgs] = useState<MsgType[]>([]);
  
  const [text, setText] = useState<string>("");
  const arr = msgs
  .map((item) => {
    return (
      <Message username={item.username} text={item.message} selfEnd={item.selfEnd} />
    )
  })
  return (
    <div className="flex">
      {/* this is the sidebar */}
    <div className="w-1/3 border-r-4">

    </div>  
    {/* This is the chat window section */}
    <div className="flex w-2/3 justify-center items-center min-h-screen bg-gray-100">
      <div className="w-4/5 h-screen border rounded-lg overflow-hidden shadow-lg">
        <div className="bg-blue-500 text-white p-3 text-center">Chat with Dave!</div>
        <div className="p-3 max-h-96 overflow-y-auto min-h-96 ">
          {arr}
        </div>
        <div className="p-3 border-t ">
          <input onChange={(e) => {setText(e.target.value)}} className="w-full px-4 py-2 rounded-lg border outline-none focus:border-blue-500" value={text} type="text" placeholder="Type your message here..." />
          <button className="w-2/3 mx-auto justify-center rounded-xl bg-white font-semibold  text-blue-500" onClick={() => {
            setMsgs([...msgs, {username: "Me", message: text , selfEnd: true}]); 
            console.log('Set msgs completed')
            setText('')
            console.log('setText complete')
            }} type="submit">Send message</button>
        </div>
      </div>
    </div>
    </div>
  );
};

const Message = ({ username, text, selfEnd }) => {
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
