const AddFriend = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Happy Diwali!</h2>
          <p className="text-lg mb-4">Wishing you a joyous Diwali!</p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default AddFriend;
  