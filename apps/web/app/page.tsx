'use client'
import React from 'react';
import Link from 'next/link';
const GoingChat = () => {
  return (
    <div>
    <div className="flex bg-blue-400 h-[70px] items-center justify-between text-white font-sans">
      <h2 className="text-2xl ml-[10vw] font-bold w-2/3">Chat-app</h2>
      <div className="flex gap-10 mr-10 justify-around w-1/3">
        <Link href={"/signup"}><h4 className="font-extrabold hover:underline text-3xl"> Signup </h4></Link>
        <Link href={"/signin"}><h4 className="font-extrabold text-3xl hover:underline"> Signin </h4></Link>
      </div>
    </div>
    </div>
  );
};

export default GoingChat;
