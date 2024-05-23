import axios from "axios";
import { useState } from "react";
const NewGroup = ({ contacts, onClose, setSidebarContacts, setActiveUser, userData }) => {
    const [username, setUserName] = useState("")
    const [formData, setForm] = useState({
        username: "",
        email: ""
    }) 
    async function handleSubmit() {
        
        try{
        const response = await axios.post('http://localhost:3001/add-group', formData)
        if(!response.data.success) {
            alert("the group with this name already exists")
            return
        }else {
            alert("Group created successfully!")
            window.location.href = 'http://localhost:3000/signin'
            onClose(); 
        }
    }catch (err){   

    }
    }
    const inputLabel = "block text-sm font-medium text-gray-700"
    const inputClassName = "p-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:border-indigo-500"
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-6" >
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add Group</h1>
      <form onSubmit={handleSubmit} >
        <div>
            <label className={inputLabel}>Group Name</label>
            <input className={inputClassName} value={formData.username} placeholder='Please enter your username' onChange={(e) => {setForm({...formData, username: e.target.value})}} />
        </div>
        <div>
            <label className={inputLabel}>A short bio</label>
            <input className={inputClassName} value={formData.email} placeholder='Please enter your username' onChange={(e) => {setForm({...formData, email: e.target.value})}} />
        </div>
        <div className="flex mt-4 justify-center">
        <button onClick={() => {handleSubmit()}} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out" >Submit</button>
        </div>
      </form>
    </div>
    <button
            onClick={() => {
              // setActiveUser({username: item.username, userId: item.userId})
              onClose()
            }}
            className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Close
    </button>
    </div>
      </div>
    );
  };
  
  export default NewGroup;
  