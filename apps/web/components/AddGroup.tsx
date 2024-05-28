import axios from "axios";
import { useState } from "react";
import { AddFriendProps as AddGroupProps } from "./AddFriend";

const AddFriend = ({ contacts, onClose, setSidebarContacts, setActiveUser, userData }: AddGroupProps) => {
    const [username, setUserName] = useState("")
    const [result, setResultText] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [addSuccess, setAddSuccess] = useState(true)

    async function handleQuery(e : any) {
      setLoading(true)
      setUserName(e.target.value);
      if (!username) {
        return
      }
      const users = await axios.get('http://localhost:3001/get-groups', {withCredentials: true, params: {query: username}})

      if (!users.data.success){
        setResultText('Internal Server error')
      } else if (users.data.users?.length === 0){
        setResultText('Hmmmm.... No such user')
      } else {
        setResultText("Users:")
        setUsers(users.data.groups)
      }
      setLoading(false)
      return
    }
    return (
      <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Join A Group!</h2>
          <div>
        <label className={"block text-sm font-medium text-gray-700"}>Add Room</label>
        <input className={ "p-2 border border-gray-300 rounded-md shadow-lg focus:outline-none w-full focus:border-indigo-500"} value={username} placeholder={"Please enter the Room's name to join the server"} onChange={handleQuery} />
        { isLoading &&
        <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-500"></div>
    </div>
     }
        <div className={`${result && "p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md"}`}>
     {result && (
        <>
        <p className="text-gray-700 font-semibold">{result}</p>
        <p className="text-gray-700 font-semibold">{users?.length} Groups Found!</p>
        { 
        users?.map(({groupName, createdBy}: {groupName: string, createdBy: string}, i: number) => {
          if (userData.myUsername === username) {
            return
          }else{
          return (
            <div key={i}
              className="w-full max-w-sm p-4 rounded-md shadow-md cursor-pointer bg-gray-100 hover:bg-gray-200 transition duration-300"
              onClick={() =>{
                setSidebarContacts((prevVal) =>{
                  
                  (async () => {
                    try{
                    const response = await axios.post("http://localhost:3001/add-chat", {
                    username: groupName,
                    userId: userData.myUserId,
                    isRoom: true
                  }, {withCredentials: true})
                   if (!response.data.success){
                    alert(response.data.msg)
                    setAddSuccess(false)
                    return
                   } else{
                    alert(`Successfully joined the server ${groupName}` )
                    onClose(false)
                   }} catch(err) {
                    alert("Internal server issues")
                    setAddSuccess(false)
                    return
                   }
                  })()
                  if ((addSuccess && !prevVal.some((item) => item.username === groupName))){
                    return [...prevVal, {username : groupName, userId: "", isRoom: true, unread: false }]
                   }else {
                    return [...prevVal]
                  }
                  })
              setActiveUser({username: groupName, userId: createdBy, isRoom: true, unread: false})
              onClose(false);
      }
      
    }
    >
     <p className="text-black font-semibold">{groupName}</p>
      <p className="text-black font-light">By:- {createdBy}</p>
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
              // setActiveUser({username: item.username, userId: item.userId})
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
  