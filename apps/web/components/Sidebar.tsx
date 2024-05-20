'use client'

// Sidebar.jsx
import { useState } from 'react';
import AddFriend from './AddFriend';

interface sidebarContacts { 
  username: string;
  userId: string;
}

const Sidebar = ({setActiveUser} : any) => {
  const [addFriendModal, setAddFriendModal] = useState(false);
  const [contacts, setContacts] = useState<sidebarContacts[]>([])
  
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
            <div>
                  
                <button
                    onClick={() => setAddFriendModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
        >
         
           Add Friend!! 
        </button>
        {addFriendModal && (
          <AddFriend contacts={contacts} setSidebarContacts={setContacts} setActiveUser={setActiveUser} onClose={() => setAddFriendModal(false)} />
        )}
                </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  