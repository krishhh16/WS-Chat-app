'use client'

// Sidebar.jsx
import React, { useState } from 'react';
import AddFriend from './AddFriend';
import AddGroup from './AddGroup';
import NewGroup from './NewGroup';
interface userType {
  username: string;
  userId: string
}

interface SidebarPropType {
  setActiveUser: React.Dispatch<React.SetStateAction<userType>>;
  setContacts: React.Dispatch<React.SetStateAction<userType>>;
  contacts: userType[];
  userData: {myUsername: string,myUserId: string}
}

const Sidebar = ({setActiveUser, setContacts, contacts, userData}: SidebarPropType) => {
  const [addFriendModal, setAddFriendModal] = useState(false);
  const [addFriendModal2, setAddFriendModal2] = useState(false);
  const [addFriendModal3, setAddFriendModal3] = useState(false);
 
    return (
      <div className="w-1/3 h-screen bg-white border-r shadow-lg">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 text-center text-2xl font-bold">
          Contacts
        </div>
        <h1 className="bg-gray-100 flex items-center justify-center">
          {!contacts.length && "No contacts yet"}
        </h1  >
        <div className="p-5 overflow-y-auto">
          {contacts?.map((item, i) => {
            return (
              <div
              onClick={() => setActiveUser({ username: item.username, userId: item.userId })} 
              key={i} 
              className="p-4 mb-7 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer space-y-3"
            >
              <div className="flex items-center">
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.username}</h3>
                </div>
              </div>
            </div>
            
            )   
          }) 
        }
        <div className="justify-around flex" >
            <div className='mb-5'>
                <button
                    onClick={() => setAddFriendModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Add Friend
                </button>
          {addFriendModal && (
            <AddFriend userData={userData} contacts={contacts} setSidebarContacts={setContacts} setActiveUser={setActiveUser} onClose={() => setAddFriendModal(false)} />
          )}
                </div>
            <div className='mb-5'>
                <button
                  onClick={() => setAddFriendModal2(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                >
               Add Group
                </button>
                {addFriendModal2 && (
                <AddGroup userData={userData} contacts={contacts} setSidebarContacts={setContacts} setActiveUser={setActiveUser} onClose={() => setAddFriendModal2(false)} />
                 )}
            </div>
            <div className="" >
                <button
                  onClick={() => setAddFriendModal3(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                >
               Create Group
                </button>
                {addFriendModal3 && (
                <NewGroup userData={userData} contacts={contacts} setSidebarContacts={setContacts} setActiveUser={setActiveUser} onClose={() => setAddFriendModal3(false)} />
                 )}
            </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  