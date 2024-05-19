'use client'

import React, { useState } from 'react'
import axios from 'axios'
function page() {
    const [formData, setForm] = useState({
        email: "",
        password:"",
    })
    async function handleSubmit(e: any) {
        e.preventDefault();
        try{
        const response = await axios.post('http://localhost:3001/signin', formData, {withCredentials: true}) 
        if(!response.data.success) {
            alert("Invalid user credentials")
            return
        }else {
            alert("user signed up successfully!")
            window.location.href = 'http://localhost:3000/chat'
        }
    }catch (err){   
        alert("Something went wrong, please try again later");
    }
    }

    const inputLabel = "block text-sm font-medium text-gray-700"
    const inputClassName = "p-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:border-indigo-500"
  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-6" >
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up Page</h1>
      <form onSubmit={handleSubmit} >
        <div>
        <label className={inputLabel}>Email</label>
        <input className={inputClassName} type="email" value={formData.email} placeholder='Please enter your username' onChange={(e) => {setForm({...formData, email: e.target.value})}} />
        </div>
        <div>
        <label className={inputLabel}>Password</label>
        <input className={inputClassName} type="password"  value={formData.password} placeholder='Please enter your username' onChange={(e) => {setForm({...formData, password: e.target.value})}} />
        </div>
        <div className="flex mt-4 justify-center">
        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"  type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default page
