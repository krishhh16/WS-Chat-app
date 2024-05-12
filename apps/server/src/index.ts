import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import cors from "cors"

const port = 3001;
const app = express();
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials: true
  })
)

io.on("connection", (socket) => {
  console.log(`User connected with id ${socket.id} `);

  socket.on("message", ({room, msg}) =>{
    console.log({room, msg})
    io.to(room).emit('receive message', msg)
  })

  socket.emit('welcome', "Welcome to the server!!")
  socket.broadcast.emit('welcome', `${socket.id} has joined the room`)
})

server.listen(port, () => {
  console.log(`port running on ${port}`)
})