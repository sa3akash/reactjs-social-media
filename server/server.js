import express from "express";
const app = express();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import {customErrorHandler} from "./middlewares/errorHandler.js";
import cors from "cors";
import Router from "./routes/Routes.js";
import upload from "./middlewares/upload.js"

// socket io connection
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});


// cors
app.use(cors({origin: "http://localhost:3000", credentials: true}))

// middleware for creating app
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use("/api",Router)
app.use("/api",upload)

// static file
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected...");
  });



  let activeUser = [];
  // socket io works
  io.on("connection", (socket) => {

    // user connection
    socket.on("new_user_add", (newUserId)=>{
      // if already in socket
      if(!activeUser.some(user=>user.id===newUserId)){
        activeUser.push({
          userId: newUserId,
          socketId: socket.id
        })
      }
      console.log("Connected User", activeUser)
      io.emit("get_users", activeUser)

    })

    // disconnect 
    socket.on("disconnected",()=>{
      activeUser = activeUser.fillter(user=>user.socketId !== socket.id)
      console.log("User Disconnected", activeUser);
    })

    // send message
    socket.on("send_message",(data)=>{
      const {receiverId} = data;
      const user = activeUser.find(i=>i.userId===receiverId)
      if(user){
        socket.to(user.socketId).emit("receive_message",data)
      }
    })


  });




// error handler
app.use(customErrorHandler)

httpServer.listen(process.env.PORT, ()=>{
    console.log(`server listening on ${process.env.PORT}`);
})








