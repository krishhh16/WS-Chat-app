import React from 'react'

function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-700 mb-4">You do not have permission to view this page.</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        onClick={() => window.location.href = '/'}
      >
        Go to Homepage
      </button>
    </div>
  </div>
  )
}

export default Unauthorized
