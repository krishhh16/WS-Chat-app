import express, {Request, Response, NextFunction} from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import cors from "cors"
import { PrismaClient } from "@prisma/client";
import jwt, {JwtPayload} from 'jsonwebtoken'
import cookieParser from "cookie-parser"

declare module 'express-serve-static-core' {
  interface Request {
    userDetails?: { userID: string; username: string; email: string; password: string; };
  }
}
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

async function validateUser(req: Request, res: Response,next: NextFunction ){
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
    req.userDetails = user ;
    next()
  }} catch (err) {
    console.log(err);
    return res.json({success: false, err});
  }
}

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

app.get("/user", validateUser, async (req, res) => {
 res.json({success: true, username: req.userDetails?.username, userID: req.userDetails?.userID})

})

app.get("/get-user",validateUser, async (req, res) => {
  const {query} = req.body;

  if (!query) {
    return res.json({success: false, msg: "query not provided"})
  }
  
  try {
    const user = await prisma.user.findMany({
      where : {
        OR: [
          {
            username: {
              contains: query,
              mode: "insensitive"
            }
          }
        ]
      }
    })
    const users = user.map((item) => {
      return {username: item.username, userID: item.userID}
    })
    res.json(users)
  
} catch (err) {
  console.error(err);
  return res.send("Internal server error0")
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