// Sidebar.jsx
const Sidebar = () => {
    return (
      <div className="w-1/3 h-screen bg-white border-r shadow-lg">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 text-center text-2xl font-bold">
          Contacts
        </div>
        <div className="p-5 overflow-y-auto">
          {[1,2,3].map((contact, index) => (
            <div
              key={index}
              className={`p-4 mb-3 rounded-lg cursor-pointer transition ${
                true
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {"something"}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  