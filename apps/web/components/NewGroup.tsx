import axios from "axios";
import React, { useState } from "react";
import { AddFriendProps as NewGroupProps } from "./AddFriend";

const NewGroup = ({ onClose, setSidebarContacts, setActiveUser }: NewGroupProps) => {
    const [formData, setForm] = useState({
        groupName: "",
        bio: ""
    })
    async function handleSubmit(e: any) {
        e.preventDefault();
        try{
        const response = await axios.post('http://localhost:3001/make-groups', formData, {withCredentials: true})
        if(!response.data.success) {
            alert("the group with this name already exists")
            return
        }else {
            alert("Group created successfully!")
            const res = await axios.get('http://localhost:3001/user', {withCredentials: true})
            setSidebarContacts(prevVal => [...prevVal, {username : formData.groupName, userId: res.data?.userId, isRoom: true }] )
            setActiveUser({username : formData.groupName, userId: res.data?.userId, isRoom: true})
            onClose(false);
        }
    }catch (err: any){   
      alert(err.message)
    }
    }
    const inputLabel = "block text-sm font-medium text-gray-700"
    const inputClassName = "p-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:border-indigo-500"
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-6" >
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add Group</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label className={inputLabel}>Group Name</label>
            <input className={inputClassName} value={formData.groupName} placeholder='Please enter your username' onChange={(e) => {setForm({...formData, groupName: e.target.value})}} />
        </div>
        <div>
            <label className={inputLabel}>A short bio</label>
            <input className={inputClassName} value={formData.bio} placeholder='Please enter your username' onChange={(e) => {setForm({...formData, bio: e.target.value})}} />
        </div>
        <div className="flex mt-4 justify-center">
        <button  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out" >Submit</button>
        </div>
      </form>
      <div className="flex justify-center items-center">
    <button
        onClick={() => {
        onClose(false)
        }}
        className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
    >
        Close
    </button>
    </div>
    </div>
      </div>
    );
  };
  
  export default NewGroup;
  