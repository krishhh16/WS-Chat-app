'use client'
import React from 'react';
import Link from 'next/link';
const GoingChat = () => {
  return (
    <div className="w-4/5 mx-auto text-center">
      <h2 className="text-2xl">Welcome to the Sacred chat app</h2>
      <Link href={"/signup"}><h4 className="font-extrabold text-3xl"> Signup </h4></Link>
      <Link href={"/signin"}><h4 className="font-extrabold text-3xl"> Signin </h4></Link>
    </div>
  );
};

export default GoingChat;
