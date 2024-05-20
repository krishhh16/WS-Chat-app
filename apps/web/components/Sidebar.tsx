'use client'

// Sidebar.jsx
import { useState } from 'react';
import AddFriend from './AddFriend';


const Sidebar = ({setActiveUser} : {setActiveUser: () => {}}) => {
  const [addFriendModal, setAddFriendModal] = useState(false);
  const [contacts, setContacts] = useState([])
  
    return (
      <div className="w-1/3 h-screen bg-white border-r shadow-lg">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 text-center text-2xl font-bold">
          Contacts
        </div>
        <h1 className="bg-gray-100 flex items-center justify-center">
          {!contacts.length && "No contacts yet"}
        </h1  >
        <div className="p-5 overflow-y-auto">
          {contacts?.map(() => {
            return (
              <div className="space-y-5">
              <div className="flex items-center">
                  <div>
                      <h3 className="text-lg font-semibold">John Doe</h3>
                      <p className="text-gray-500 text-sm">johndoe@example.com</p>
                      <p className="text-gray-500 text-sm">(555) 555-5555</p>
                  </div>
              </div>
              <div className="flex items-center">
                  <div>
                      <h3 className="text-lg font-semibold">Jane Smith</h3>
                      <p className="text-gray-500 text-sm">janesmith@example.com</p>
                      <p className="text-gray-500 text-sm">(555) 555-1234</p>
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
  