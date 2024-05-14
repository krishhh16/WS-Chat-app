'use client'

import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'

export default function page() {
  const [socket, setSocket] = useState<any>(null)
  useEffect(() => {
    const socket = io('http://localhost:3001')
    setSocket(socket)
  }, [])
  return (
    <div style={{width: "80vw", margin: "auto"}}>
      <div className= "" style={{height: "20vh", margin: "15px 20px", textAlign: "center"}}>
        <h2>Your Sacred place to chat with Others!!</h2>
        <p>Not just another Social site</p>
      </div>
    </div>
  )
}
