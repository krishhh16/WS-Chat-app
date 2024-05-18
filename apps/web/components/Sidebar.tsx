'use client'

// Sidebar.jsx
import { useState } from 'react';
import AddFriend from './AddFriend';


const Sidebar = () => {
  const [showDiwaliModal, setShowDiwaliModal] = useState(false);
    const arr = []
    .map((c, i) => (
        <div
        key={i}
        className={`p-4 mb-3 rounded-lg cursor-pointer transition ${
          true
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        {"something"}
      </div> 
    ))
    return (
      <div className="w-1/3 h-screen bg-white border-r shadow-lg">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 text-center text-2xl font-bold">
          Contacts
        </div>
        <div className="p-5 overflow-y-auto">
          {arr.length ?
            (
                <div>
                    I am zero true    
                </div>
            )  
            :
            (
            <div>
                  
                <button
                    onClick={() => setShowDiwaliModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Add Friend
        </button>
        {showDiwaliModal && (
          <AddFriend onClose={() => setShowDiwaliModal(false)} />
        )}
                </div>
            )
        }
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  