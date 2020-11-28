const express = require("express");
const app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
const cors = require("cors");

const router = express.Router();

app.use(cors());


// var queue = [];    // list of sockets waiting for peers
// var rooms = {};    // map socket.id => room
// var names = {};    // map socket.id => name
// var allUsers = {}; // map socket.id => socket



  app.get('/', (req, res) => {
   //// res.sendFile(__dirname + '/index.html');
  });


//   var findPeerForLoneSocket = function(socket) {

//     console.log('this is '+socket.id)
//     // this is place for possibly some extensive logic
//     // which can involve preventing two people pairing multiple times
//     if ( queue.length != 0) {
//         // somebody is in queue, pair them!

//         console.log("quee length:"+queue.length)
//         var peer = queue.pop();
//         console.log(peer+"peer")
//         var room = socket.id + '#' + peer.id;
//         // join them both
//         peer.join(room);

//         socket.join(room);

//         // register rooms to their names
//         rooms[peer.id] = room;
//         rooms[socket.id] = room;
//         // exchange names between the two of them and start the chat
//         peer.emit('chat start', {'name': names[socket.id], 'room':room});
//         socket.emit('chat start', {'name': names[peer.id], 'room':room});
//     } else {
//       console.log("else is called");
//         queue.push(socket);
//     }
// }


// var data = { quee: []}   // initially empty

var roomsarray=[];
var queearray=[];
var usernamearray=[];


var names = {};    // map socket.id => name
var allUsers = {}; // map socket.id => socket


function findpatner(socket){

   //// console.log("Name is "+username +"Socket is "+socketid)

if(queearray.length==0){

   queearray.push(socket)
  //// usernamearray.push(username)
   console.log("data is pushed");
   console.log(names);
   console.log("connected users:"+queearray.length);
}
else{

  console.log("data after pop")
  var peer=queearray.pop();
  var peerusername=  usernamearray.pop();

  ////console.log("peer id is:" +peerid+ "peer username:" +peerusername)
// var roomname=peer.id+"#"+peerusername+"."+username+"#"+socket.id;

var roomname=socket.id + '#' + peer.id;



console.log(roomname);
socket.join(roomname);
peer.join(roomname)

roomsarray[peer.id] = roomname;
roomsarray [socket.id] = roomname;


console.log(names);

peer.emit('chat start', {'name': names[socket.id], 'room':roomname});
      socket.emit('chat start', {'name': names[peer.id], 'room':roomname});



}

}
 
  io.on("connection", (socket) => {
   
 console.log('User '+socket.id + ' connected');
    socket.on('login', function (data) {

        names[socket.id] = data.username;
        allUsers[socket.id] = socket;

findpatner(socket)

        // names[socket.id] = data.username;
        // allUsers[socket.id] = socket;
        // now check if sb is in queue

      /////  findPeerForLoneSocket(socket);
    });




    socket.on('nowait', function (data) {


      const index = names.indexOf(socket.id);
      if (index > -1) {
        names.splice(index, 1);
      }
  
  

      const index1 = allUsers.indexOf(socket.id);
      if (index1 > -1) {
        allUsers.splice(index, 1);

        
      }
  


      // names[socket.id] = data.username;
      // allUsers[socket.id] = socket;


      // names[socket.id] = data.username;
      // allUsers[socket.id] = socket;
      // now check if sb is in queue

    /////  findPeerForLoneSocket(socket);
  });


 






    socket.on('message', function (data) {
        var room = roomsarray[socket.id];
        socket.broadcast.to(room).emit('message', data.text);
    });


    socket.on('typing', function (data) {
      var room = roomsarray[socket.id];
      socket.broadcast.to(room).emit('typing', data.text);
  });








    socket.on('leave room', function () {

        try{
        var room = roomsarray[socket.id];
        socket.broadcast.to(room).emit('chat end');

        console.log("roomname name is "+room)
     
        var peerID = room.split('#');
       

        peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];

        console.log("functionl called")
        // // add both current and peer to the queue
        console.log("peerid name is "+allUsers[peerID])
         findpatner(allUsers[peerID]);
        findpatner(socket);

        }
        catch{
          
          console.log("have some issue")
        
        }
    });




    socket.on('disconnect', function () {
      console.log("disconnect disconnectdisconnectdisconnectdisconnectdisconnectdisconnectdisconnectdisconnectdisconnectdisconnectdisconnectdisconnect") 
        try{
        var room = roomsarray[socket.id];
        socket.broadcast.to(room).emit('chat end');
        var peerID = room.split('#');
        peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
        console.log("disconnect called")    // current socket left, add the other one to the queue
        findpatner(allUsers[peerID]);
        }
        catch{
          
          const index = queearray.indexOf(socket);
          console.log(index)
          if (index > -1) {
            queearray.splice(index, 1);

            console.log("it runnnnnnnnnnnnnnnnnnnn")
          }
          
          
          
          
          
          
          
          
          
          console.log("some issue")}
    });







   











    // socket.on('message', function (data) {
    //     var room = rooms[socket.id];
    //     socket.broadcast.to(room).emit('message', data);
    // });
    // socket.on('leave room', function () {
    //     var room = rooms[socket.id];
    //     socket.broadcast.to(room).emit('chat end');
    //     var peerID = room.split('#');
    //     peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
    //     // add both current and peer to the queue
    //     findPeerForLoneSocket(allUsers[peerID]);
    //     findPeerForLoneSocket(socket);
    // });
    // socket.on('disconnect', function () {
    //     // var room = rooms[socket.id];
    //     // socket.broadcast.to(room).emit('chat end');
    //     // var peerID = room.split('#');
    //     // peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
    //     // // current socket left, add the other one to the queue
    //     // findPeerForLoneSocket(allUsers[peerID]);
    // });
      

});

  
const port = process.env.PORT || 5000;

app.use("/api", router);
server.listen(port, () => console.log(`Listening on port ${port}`));





router.post("/users/signin", async (req, res1) => {

console.log("ajjjjjjjjjjjjjjjjj");

})