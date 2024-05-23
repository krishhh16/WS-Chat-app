import axios from "axios";
import { useState } from "react";
const AddFriend = ({ contacts, onClose, setSidebarContacts, setActiveUser, userData }) => {
    const [username, setUserName] = useState("")
    const [result, setResultText] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
        users?.map((item: {groupName: string, createdBy: string}, i: number) => {
          if (userData?.username === username) {
            return
          }else{
          return (
            <div key={i}
              className="w-full max-w-sm p-4 rounded-md shadow-md cursor-pointer bg-gray-100 hover:bg-gray-200 transition duration-300"
              onClick={() =>{ 
        setSidebarContacts([...contacts, {username: item.groupName, userId: item.createdBy, isRoom: true}])
        setActiveUser({username: item.groupName, userId: item.createdBy, isRoom: true})
        console.log(contacts)
       
        onClose();
      }
      
    }
    >
     <p className="text-black font-semibold">{item.groupName}</p>
      <p className="text-black font-light">By:- {item.createdBy}</p>
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
  
  export default AddFriend;
  