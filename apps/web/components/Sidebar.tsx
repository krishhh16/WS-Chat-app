'use client'

// Sidebar.jsx
import React, { useEffect, useState } from 'react';
import AddFriend from './AddFriend';
import AddGroup from './AddGroup';
import NewGroup from './NewGroup';
import { userType } from '../app/chat/page';
import axios from 'axios';

export interface SidebarProps extends userType {
  unread: boolean;
  msg ?: string;
}

interface SidebarPropType {
  setActiveUser: React.Dispatch<React.SetStateAction<userType>>;
  setContacts: React.Dispatch<React.SetStateAction<SidebarProps[]>>;
  contacts: userType[];
  userData: {myUsername: string,myUserId: string}
}

const Sidebar = ({setActiveUser, setContacts, contacts, userData}: SidebarPropType) => {
    const [addFriendModal, setAddFriendModal] = useState(false);
    const [addFriendModal2, setAddFriendModal2] = useState(false);
    const [addFriendModal3, setAddFriendModal3] = useState(false);

    useEffect(() => {
      (async () => {
        const chats = await axios.get('http://localhost:3001/get-chats', {withCredentials: true})
        if (!chats.data.success){
          alert('unable to fetch user data')
        }else{
          console.log(chats.data);
          chats.data.chats.map(({username, followUserId, isRoom}: {username: string, followUserId: string, isRoom: boolean}) => {
            setContacts((prevData) =>{ 
            if (!prevData?.some(contact => contact.username === username)){
              return [...prevData, {username, userId: followUserId, isRoom, unread: false}]
            } else {
              return [...prevData]
            }
          })
          })
        }
      })()
    }, [])

    return (
      <div className="w-1/3  h-screen bg-white border-r shadow-lg">
        <div className=" bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 text-center text-lg font-bold">
          Contacts
        </div>
        <h1 className="bg-gray-100 flex items-center justify-center">
          {!contacts.length ? "No contacts yet": "Recently added"}
        </h1  >
        <div className="p-5 overflow-y-auto">
          {contacts?.map((item: {username: string, userId: string, isRoom: boolean, unread: boolean}, i) => {
            return (
              <div
              onClick={() => {
                console.log(item);
                setActiveUser({ username: item.username, userId: item.userId, isRoom: item.isRoom, unread: false });
                setContacts(prevContacts => {
                  
                  prevContacts[i].unread = false;
                  return [...prevContacts]
                })
              }}
              key={i}
              className="p-4 mb-7 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer space-y-3"
            >
              <div className="flex items-center">
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.username}</h3>
                  {item.unread && (
                    <span className="text-sm text-red-500">Unread Message</span>
                  )}
                </div>
              </div>
            </div>
        
            )
          }) 
       }
        <div className="flex justify-evenly w-[100%]" >
            <div className=''>
                <button
                    onClick={() => setAddFriendModal(true)}
                    className="z-0 px-1 py-1 text-sm bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Add Friend
                </button>
          {addFriendModal && (
            <AddFriend userData={userData} contacts={contacts} setSidebarContacts={setContacts} setActiveUser={setActiveUser} onClose={setAddFriendModal} />
          )}
                </div>
            <div className='mb-5'>
                <button
                  onClick={() => setAddFriendModal2(true)}
                  className="py-1 px-1 text-sm bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                >
               Add Group
                </button>
                {addFriendModal2 && (
                <AddGroup userData={userData} contacts={contacts} setSidebarContacts={setContacts} setActiveUser={setActiveUser} onClose={setAddFriendModal2} />
                 )}
            </div>
            <div className="" >
                <button
                  onClick={() => setAddFriendModal3(true)}
                  className="py-1 px-1 z-0 text-sm bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                >
               Create Group
                </button>
                {addFriendModal3 && (
                <NewGroup userData={userData} contacts={contacts} setSidebarContacts={setContacts} setActiveUser={setActiveUser} onClose={setAddFriendModal3} />
                 )}
            </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  