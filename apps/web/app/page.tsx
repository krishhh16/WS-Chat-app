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
    <React.StrictMode>
    <div>
      Hello world
    </div>
    </React.StrictMode>
  )
}
