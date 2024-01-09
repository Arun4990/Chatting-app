const express=require('express');
const {createServer}=require('http');
const {join}=require('path');
const{Server}=require('socket.io');
const app=express();
const server=createServer(app);
const io=new Server(server);
app.get("/",(req,res)=>{
    res.sendFile(join(__dirname,'index.html'));
})

io.on('connection',(socket)=>{
    socket.broadcast.emit('hi')
    socket.on('chat message',(msg)=>{
        io.emit('chat message', msg);
    })
    socket.on('disconnect',()=>{
        console.log("Disconnected")
    })
})
server.listen(3000,()=>{
    console.log("This Server is Listen");
})