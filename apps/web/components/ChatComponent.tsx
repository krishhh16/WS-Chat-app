import React, {useState, useEffect} from 'react'
import {io, Socket} from 'socket.io-client'

interface MsgType {
  username: string;
  message: string;
  selfEnd: boolean
}

function ChatComponent({username, userId}: {username: string, userId: string}) {
    const [msgs, setMsgs] = useState<MsgType[]>([]);
    const [text, setText] = useState<string>("");
    const [socket, setSocket] = useState<Socket|null>(null);

    

    const arr = msgs
    .map((item) => {
      return (
        <Message username={item.username} text={item.message} selfEnd={item.selfEnd} />
      )
    })
    const handleSubmit = () => {
        setMsgs([...msgs, {username: "Me", message: text , selfEnd: true}]); 
        setText('')
        socket?.emit('message', {msg: text, room: "none"})
      }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 w-2/3">
    <div className="w-full max-w-2xl h-screen border rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 text-center text-2xl font-bold">
        {username ? `Start chatting with ${username}` :  "Chat with your friends!!!"}
      </div>
      <div className="flex-grow p-5 overflow-y-auto bg-gray-50" id="chat-box">
        {arr}
      </div>
      <form
        className="p-5 bg-white flex items-center space-x-3 border-t"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          onChange={(e) => setText(e.target.value)}
          className="flex-grow px-4 py-2 rounded-full border outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={text}
          type="text"
          placeholder="Type your message here..."
        />
        <button
          className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  </div>
  )
}
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

export default ChatComponent
