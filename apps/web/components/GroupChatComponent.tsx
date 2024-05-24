import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface MsgType {
  username: string;
  message: string;
  selfEnd: boolean;
}

interface SelfData {
  myUsername: string;
  myUserId: string;
}

function GroupChatComponent({ username, userId, setActiveUser, setContacts }: any) {
  const [msgs, setMsgs] = useState<MsgType[]>([]);
  const [text, setText] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [selfData, setSelf] = useState<SelfData>({ myUsername: "", myUserId: "" });

  const socketSetup = useCallback(async () => {
    const userData = await axios.get('http://localhost:3001/user', { withCredentials: true });

    if (!userData.data.success) {
      alert('Please Login before sending messages');
      return;
    }

    setSelf({ myUsername: userData.data.username, myUserId: userData.data.userID });

    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('join_room', username);
    });

    newSocket.on("group_message", ({ msg, fromUser }: { toUserId: string, msg: string; fromUser: string, fromUserId: string }) => {
      console.log(`You've received a message ${msg} from Group ${username} from User ${fromUser} `);
      setMsgs(prevMsgs => [...prevMsgs, { username: fromUser, message: msg, selfEnd: false }]);
     
    });

    return () => {
      newSocket.disconnect();
    };
  }, [setContacts, setActiveUser]);

  useEffect(() => {
    socketSetup();
  }, [socketSetup]);

  const handleSubmit = async () => {
    if (text.trim() === "") return;
    setMsgs(prevMsgs => [...prevMsgs, { username: "Me", message: text, selfEnd: true }]);
    const msgPayload = { fromUserId: selfData.myUserId, msg: text, fromUser: selfData.myUsername, toUserId: userId };
    setText('');
    socket?.emit('message', msgPayload);
    await axios.post('http://localhost:3001/messages', msgPayload, { withCredentials: true });
    };

  return (
    <div className="flex justify-center items-center min-w-full min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 w-2/3">
      <div className="w-full max-w-2xl h-screen border rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col">
        <div key="chat-interface" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 text-center text-2xl font-bold">
          {
          username
          ?
          `Start chatting with ${username} as ${selfData.myUsername}`
          :
          "Chat with your friends!!!"
          }
        </div>
        <div className="flex-grow p-5 overflow-y-auto bg-gray-50">
          {msgs
          .map((item, i) =>
          (
            <Message key={i} index={i} username={item.username} text={item.message} selfEnd={item.selfEnd} />
          ))
          }
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
            placeholder={!username ? "Select a chat to get started" : "Type your message here..."}
            disabled={!username}
          />
          <button
            className={`px-6 py-2 rounded-full ${username ? "bg-blue-500" : "bg-red-500"} text-white font-semibold hover:bg-blue-600 transition`}
            type="submit"
            disabled={!username}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

const Message = ({ index, username, text, selfEnd }: { index: number; username: string; text: string; selfEnd: boolean }) => {
  const alignment = selfEnd ? 'self-end' : 'self-start';
  const bgClass = selfEnd ? 'bg-gray-300 text-gray-800' : 'bg-blue-500 text-white';

  return (
    <div key={index} className={`mt-2 p-3 rounded-lg max-w-md ${alignment} ${bgClass}`}>
      <div className="text-xs text-gray-500 mb-1">{username}</div>
      <div>{text}</div>
    </div>
  );
};

export default GroupChatComponent;
