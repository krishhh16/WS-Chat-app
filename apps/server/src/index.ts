import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import cors from "cors"
import { PrismaClient } from "@prisma/client";
import jwt, {JwtPayload} from 'jsonwebtoken'
import cookieParser from "cookie-parser"

const jwtSec = 'This is a very big secret of my server'
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

app.use(express.json())
app.use(cookieParser())
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
  const {username, email, password} =  req.body;
  if(!username || !email || !password){
    return res.status(404).json({success: false})
  }

  try{
  const userExists = await prisma.user.findFirst({
    where: {email}
  })

  if (userExists){
    return res.json({success: false, msg: "user already exists"})
  }
    await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    })

    return res.json({success: true})
  }catch(err){
    console.log(err);
    return res.json({success: false})
  }

})
app.post('/signin', async (req, res) => {
  const {email, password} = await req.body;
  if(!email || !password){
    return res.status(404).json({success: false})
  }

  const userExists = await prisma.user.findFirst({
    where: {email, password}
  })

  if (!userExists) {
    return res.json({success: false})
  }

  try{
    const token = jwt.sign({email} , jwtSec);
    res.cookie("token", token)

    return res.json({success: true})
  }catch(err){
    console.log(err);
    return res.json({success: false})
  }

})

app.get("/user", async (req, res) => {
  const token = req.cookies.token;
  console.log(`this is the token that I've provided ${token}`)
  try {
  const decoded = jwt.verify(token, jwtSec) as JwtPayload;
  const user = await prisma.user.findFirst({
    where: {email: decoded.email}
  })
  
  if (!user){
    console.log("user doesn't exist")
    return res.json({success: false, msg: 'user doesn\'t exist'})
  } else {
    console.log('user exists');
    return res.json({success: true, username: user.username, userID: user.userID})
  }
} catch (err) {
  console.log(err);
  return res.json({success: false, err});
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