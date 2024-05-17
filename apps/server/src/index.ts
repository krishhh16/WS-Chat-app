import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import cors from "cors"
import { PrismaClient } from "@prisma/client";


const port = 3001;
const prisma = new PrismaClient();
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

app.get("/", (req, res) =>{
  res.json({msg: "Hello world"})
})

app.post('/signup', async (req, res) => {
  const {username} = await req.body;
  if(!username){
    return res.status(404).json({success: false})
  }

  try{
    await prisma.user.create({
      data: {
        username
      }
    })

    return res.json({success: true})
  }catch(err){
    console.log(err);
    return res.json({success: false})
  }

})



io.on("connection", (socket) => {
  console.log(`User connected with id ${socket.id} `);

  socket.on("message", ({room, msg}) =>{
    console.log({room, msg})
    io.emit('received', {msg})
    console.log('emitted the message')
  })

})

server.listen(port, () => {
  console.log(`server running on ${port}`)
})