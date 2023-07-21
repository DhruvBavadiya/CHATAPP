const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes")
const messageRoute = require("./Routes/messageRoutes")
const socket = require("socket.io");
const app = express();
require("dotenv").config();
app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

mongoose.connect(process.env.Mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected");
}).catch((err) => {
    console.log(err.message);
});

const server = app.listen(process.env.Port, () => {
    console.log(`connected at port ${process.env.Port} `)
    // console.log(`connected at ${process.env.Mongo_url}`)
})

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials : true,
    },
});

global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        // console.log("sendmsg",{data});
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieved",data.message)
        }
    });
    // console.log(onlineUsers)
});