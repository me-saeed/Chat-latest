// const  express = require("express");
// const  http = require("http");

// const  morgan = require("morgan");

// const  cors = require("cors");

// const app = require('express')()
// const  server = http.createServer(app);
// var io = require('socket.io')(server);

// app.use(express.json());



// const { ExpressPeerServer } = require("peer");



// const customGenerationFunction = () =>
//   (Math.random().toString(36) + "0000000000000000000").substr(2, 16);
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: "/",
//   generateClientId: customGenerationFunction,
// });



// app.use(cors());
// app.use("/mypeer", peerServer)

// const users = {};

// const port=process.env.PORT || 5000;
// server.listen(port,()=> console.log(`server is running ${port}`))
// io.on("connection", (socket) => {
//   // console.log("Connected")

//   // socket.on("join-room",({roomID,userId})=>{


//   //   console.log("join room called")
//   //   socket.join(roomID)
//   //   //socket.broadcast.to(room).emit('img', data.text);
//   //   io.sockets.in(roomID).emit('user-connected',userId);

//   //   ////socket.to(roomID).broadcast.emit('user-connected',userId)

//   // })

//   if (!users[socket.id]) {
//             users[socket.id] = socket.id;
//         }
//         socket.emit("yourID", socket.id);


//         console.log("------------")
//         socket.emit("chat start", socket.id);
        
//         console.log(users)
//         io.sockets.emit("allUsers", users);
        
//         socket.on('disconnect', () => {
//             delete users[socket.id];
//         })
    
//         socket.on("callUser", (data) => {
//             io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
//         })
    
//         socket.on("acceptCall", (data) => {
//             io.to(data.to).emit('callAccepted', data.signal);
//         })
    



// })  

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
var path = require('path');
const users = {};
var dispatcherid='';
io.on('connection', socket => {
 

  // if(socket.handshake.query.loggeduser=="user"){
   if (!users[socket.id]) {
      users[socket.id] = socket.id;
  }

//   }
// else{
//   dispatcherid= socket.id;
// }





 
    socket.emit("yourID", socket.id);
    console.log(users)
    io.sockets.emit("allUsers", users);
    
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
});


app.use(express.static(path.join(__dirname, 'build')));

app.use('*', (req, res) => {

	res.sendFile(path.join(__dirname+'/build/index.html'));

});



server.listen(5000, () => console.log('server is running on port 5000'));
