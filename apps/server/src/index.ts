import express, { Request, Response, NextFunction } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookieParser from "cookie-parser";

declare module 'express-serve-static-core' {
  interface Request {
    userDetails?: { userID: string; username: string; email: string; password: string; };
  }
}

const jwtSec = 'This is a very big secret of my server';
const port = 3001;
const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials: true
  })
);

async function validateUser(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, jwtSec) as JwtPayload;
    const user = await prisma.user.findFirst({
      where: { email: decoded.email }
    });

    if (!user) {
      console.log("user doesn't exist");
      return res.json({ success: false, msg: 'user doesn\'t exist' });
    } else {
      req.userDetails = user;
      next();
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
}

app.get("/", (req, res) => {
  res.json({ msg: "Hello world" });
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(404).json({ success: false });
  }

  try {
    const userExists = await prisma.user.findFirst({
      where: { email }
    });

    if (userExists) {
      return res.json({ success: false, msg: "user already exists" });
    }
    await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    });

    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = await req.body;
  if (!email || !password) {
    return res.status(404).json({ success: false });
  }

  const userExists = await prisma.user.findFirst({
    where: { email, password }
  });

  if (!userExists) {
    return res.json({ success: false });
  }

  try {
    const token = jwt.sign({ email }, jwtSec);
    res.cookie("token", token);

    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false });
  }
});

app.get("/user", validateUser, async (req, res) => {
  res.json({ success: true, username: req.userDetails?.username, userID: req.userDetails?.userID });
});

app.get("/get-user", validateUser, async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.json({ success: false, msg: "query not provided" });
  }

  try {
    const user = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: String(query),
              mode: "insensitive"
            }
          }
        ]
      }
    });
    const users = user.map((item) => {
      return { username: item.username, userID: item.userID };
    });
    res.json({ users, success: true });

  } catch (err) {
    console.error(err);
    return res.send("Internal server error");
  }
});

app.get("/get-groups", validateUser, async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.json({ success: false, msg: "query not provided" });
  }

  try {
    const user = await prisma.groups.findMany({
      where: {
        OR: [
          {
            name: {
              contains: String(query),
              mode: "insensitive"
            }
          }
        ]
      }
    });
    const groups = user.map((item) => {
      return { groupName: item.name, createdBy: item.authorId };
    });
    res.json({ groups, success: true });
  } catch (err) {
    console.error(err);
    return res.send("Internal server error");
  }
});

app.post("/make-groups", validateUser, async (req, res) => {
  const { groupName, bio } = req.body;

  if (!groupName || !bio) {
    return res.json({success: false })
  }

  try{
    const groupExists = prisma.groups.findFirst({
      where: {
        name: groupName
      },
      select: {
        name: true
      }
    })

    if (!groupExists) {
      console.log('error adding the group coz it already exists')
      return res.json({success: false, msg: 'group already exists'})
    }
    
    const authorId: string = await req.userDetails?.userID as string
    await prisma.groups.create({
      data: {
        name: groupName,
        authorId,
        bio
      }
    })

    return res.json({success: true})


  }catch(err){ 
    console.log(err)
    return res.json({success: false, msg: 'internal server error'})
  }

});



interface userObject {
  userId: string;
  socketId: string;
}

class Users {
  private user: userObject[];
  private static instance: Users;

  private constructor() {
    this.user = [];
  }

  public static getInstance(): Users {
    if (!Users.instance) {
      Users.instance = new Users();
    }
    return Users.instance;
  }

  public addUser(userId: string, socketId: string): void {
    const existingUserIndex = this.user.findIndex(item => item.userId === userId);
    if (existingUserIndex !== -1) {
      // Update socketId for the existing user
      this.user[existingUserIndex].socketId = socketId;
    } else {
      // Add new user
      this.user.push({ userId, socketId });
    }
  }

  public removeUser(socketId: string): void {
    const index = this.user.findIndex(item => item.socketId === socketId);
    if (index !== -1) {
      this.user.splice(index, 1);
    }
  }

  public findUser(userId: string): string | undefined {
    return this.user.find(item => item.userId === userId)?.socketId;
  }
}

const users = Users.getInstance();

io.on("connection", (socket) => {
  socket.on('initial_value', (userId: string) => {
    users.addUser(userId, socket.id);
    console.log(`Server Received userId ${userId} with the socket id ${socket.id}`);
  });

  socket.on("message", async ({ fromUserId, msg, fromUser, toUserId }: { toUserId: string; fromUser: string; userId: string; msg: string; fromUserId: string }) => {
    const socketId = users.findUser(toUserId);
    if (socketId) {
      io.to(socketId).emit('private_message', { msg, fromUser, fromUserId, toUserId });
      console.log(`Sent message to ${toUserId} the message ${msg} with the socket id ${socketId}`);
    } else {
      console.log(`User ${toUserId} not found`);
    }

   
  });

  socket.on('disconnect', () => {
    users.removeUser(socket.id);
    console.log(`Socket ${socket.id} disconnected and removed from users list`);
  });
});

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
