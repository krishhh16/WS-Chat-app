import axios from "axios";
import React, { useState } from "react";
import { userType } from "../app/chat/page";
import { SelfData } from "../app/chat/page";
export interface AddFriendProps {
  contacts: userType[],
  onClose: React.Dispatch<React.SetStateAction<boolean>>,
  setSidebarContacts: React.Dispatch<React.SetStateAction<userType[]>>
  setActiveUser: React.Dispatch<React.SetStateAction<userType>>,
  userData: SelfData,
}
const AddFriend = ({ contacts, onClose, setSidebarContacts, setActiveUser, userData }: AddFriendProps) => {
    const [username, setUserName] = useState("")
    const [isClicked, setIsClicked] = useState(false);
    const [result, setResultText] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    async function handleQuery(e : any) {
      setLoading(true)
      setUserName(e.target.value);
      if (!username) {
        return
      }
      const users = await axios.get('http://localhost:3001/get-user', {withCredentials: true, params: {query: username}})

      if (!users.data.success){
        setResultText('Internal Server error')
      } else if (users.data.users?.length === 0){
        setResultText('Hmmmm.... No such user')
      } else {
        setResultText("Users:")
        setUsers(users.data.users)
      }
      setLoading(false)
      return
    }
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Talk to your friend!</h2>
          <div>
        <label className={"block text-sm font-medium text-gray-700"}>Add user</label>
        <input className={ "p-2 border border-gray-300 rounded-md shadow-lg focus:outline-none w-full focus:border-indigo-500"} value={username} placeholder={"Please enter your friend's username"} onChange={handleQuery} />
        { isLoading &&
        <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-500"></div>
    </div>
     }
        <div className={`${result && "p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md"}`}>
     {
     result && (
        <>
        <p className="text-gray-700 font-semibold">{result}</p>
        <p className="text-gray-700 font-semibold">{users?.length} Users Found!</p>
        { 
        users.map(({username, userID}: {username: string, userID: string}, i: number) => {
          if (userData.myUsername === username) {
            return 
          } else{

          return (
            <div key={i}
              className="w-full max-w-sm p-4 rounded-md shadow-md cursor-pointer bg-gray-100 hover:bg-gray-200 transition duration-300"
              onClick={() =>{ 
                setSidebarContacts((prevVal) =>{
                  (async () => {
                    try{
                    const response = await axios.post("http://localhost:3001/add-chat", {
                    username: username,
                    userId: userData.myUserId,
                    isRoom: false
                  }, {withCredentials: true})
                   if (!response.data.success){
                    alert("Unable to Join the server")
                    return
                   } else{
                    alert(`Successfully created the server ${username}` )
                    onClose(true)
                   }} catch(err) {
                    alert("Internal server issues")
                    return
                   }
                  })()
                  return [...prevVal, {username, userId: userID, isRoom: true }]
                  })
                  setActiveUser({username: username, userId: userID, isRoom: false})
                  console.log(contacts)
                  setIsClicked(!isClicked)
                  onClose(false);
            }
    }
    >
      <p className="text-black font-semibold">{username}</p>
    </div>
          )}
        })
        }
        </>
        )}
      </div>
        </div>
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
    );
  };
  
  export default AddFriend;