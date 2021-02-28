const  express = require("express");
const  http = require("http");

const  morgan = require("morgan");

const  cors = require("cors");

const app = require('express')()
const  server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
  var path = require('path');

app.use(express.json());



const { ExpressPeerServer } = require("peer");



const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
  generateClientId: customGenerationFunction,
});



app.use(cors());
app.use("/mypeer", peerServer)

app.use(express.static(path.join(__dirname, 'build')));

app.use('*', (req, res) => {

	res.sendFile(path.join(__dirname+'/build/index.html'));

});

const admins = {};

var adminsocket='';
var adminuserid='';
var roomname='';

const port=process.env.PORT || 5000;
server.listen(port,()=> console.log(`server is running ${port}`))
io.on("connection", (socket) => {


    socket.on('disconnect', function () {
        console.log("-------------disconnect---")
        if(socket.id==adminsocket){
             adminsocket='';
             adminuserid='';
             roomname='';
            

        }
    });

  console.log("Connected")
  io.sockets.emit("allUsers", admins);

  socket.on("join-room",({roomID,userId})=>{


if(roomID=='admin'){
    console.log(socket.id)
    console.log(userId)
    
    // admins[socket.id+'#'+userId]=socket.id+'#'+userId;
      roomname=socket.id+'#'+userId;
adminsocket=socket.id;
adminuserid=userId

    socket.join(roomname)
}


 console.log(admins);
// console.log(roomID);




//     socket.join(roomID)
//     //socket.broadcast.to(room).emit('img', data.text);
//     //io.sockets.in(roomID).emit('user-connected',userId);

// socket.to(roomID).broadcast.emit('user-connected',userId)

  })

  
    
  socket.on("callfromcaller",({userId})=>{

console.log("------caller---")

var mylength=0;

if (roomname!=''){
    io.in(roomname).clients((err , clients) => {
    
        if(clients.length==1){  
            console.log("it run")
      socket.join(roomname)
      ///var res = id.split("#");
      io.sockets.in(roomname).emit('user-connected',adminuserid)
        }
        else{
            socket.emit('someproblem','hahahahahahhaha')
        }
        
      });

}
else{
    socket.emit('someproblem','hahahahahahhaha') 
}


  })


})  