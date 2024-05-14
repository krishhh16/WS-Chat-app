import React from 'react';

const GoingChat = () => {
  const arr = [
    {username: "John", message: 'What the fuck??', selfEnd: false},
    {username: "John", message: 'What the fuck??', selfEnd: false},
    {username: "Me", message: 'Nothing', selfEnd: true},
  ]
  .map((item) => {
    return (
      <Message username={item.username} text={item.message} selfEnd={item.selfEnd} />
    )
  })
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg border rounded-lg overflow-hidden shadow-lg">
        <div className="bg-blue-500 text-white p-3 text-center">Welcome to the group!</div>
        <div className="p-3 max-h-96 overflow-y-auto">
          {arr}
        </div>
        <div className="p-3 border-t">
          <input className="w-full px-4 py-2 rounded-lg border outline-none focus:border-blue-500" type="text" placeholder="Type your message here..." />
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
