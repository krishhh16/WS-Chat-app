'use client'
import React from 'react';
import Link from 'next/link';
const GoingChat = () => {
  return (
    <div>
    <div className="flex bg-blue-400 justify-between text-white font-sans">
      <h2 className="text-2xl">Welcome to the Sacred chat app</h2>
      <div className="flex justify-around w-1/3" >
        <Link href={"/signup"}><h4 className="font-extrabold text-3xl"> Signup </h4></Link>
        <Link href={"/signin"}><h4 className="font-extrabold text-3xl"> Signin </h4></Link>
      </div>
    </div>
    </div>
  );
};

export default GoingChat;
