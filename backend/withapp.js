const  express = require("express");
const  http = require("http");
const bodyParser = require("body-parser");
const  morgan = require("morgan");
const register = require("./route/register/register");

const signinuser = require("./route/signin/sigininuser");
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



const router = express.Router();






app.use(cors());





const { ExpressPeerServer } = require("peer");



const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
  generateClientId: customGenerationFunction,
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", peerServer)

register(app);

signinuser(app);
app.use(express.static(path.join(__dirname, 'build')));

app.use('*', (req, res) => {

	res.sendFile(path.join(__dirname+'/build/index.html'));

});

const admins = {};
var adminrealsocket='';
var adminsocket='';
var adminuserid='';
var roomname='';
var usersocket='';


var allrecentusers=[];

var allavailablevechile=[];

var allworkingvechile=[];


const port=process.env.PORT || 5000;
server.listen(port,()=> console.log(`server is running ${port}`))
io.on("connection", (socket) => {



////  io.sockets.emit("allactivevechile", allavailablevechile);

  if(socket.handshake.query.loggeduser=="vehcile"){

    console.log("got vehcile")
    console.log(socket.handshake.query.id)
    var checkit=0;

    // if(allavailablevechile._id.includes(socket.handshake.query.id)){

    // }
    // else{

      for (i = 0; i < allavailablevechile.length; i++) {
      
        if(allavailablevechile[i]._id==socket.handshake.query.id){
          checkit=1;
        }
      }

      if(checkit==0){
    var myobj={
      _id:socket.handshake.query.id,
      socket:socket.id,
      lat:'',
      long:'',
      userlat:'',
      userlong:'',
      name:socket.handshake.query.name
      
    
    }
     
    allavailablevechile.push(myobj);
  
  }
    console.log(allavailablevechile)

  ////  socket.broadcast.emit("allactivevechile", allavailablevechile);
  if(adminrealsocket!=""){
    adminrealsocket.emit('allactivevechile',allavailablevechile);
  }
    }


  console.log("Connected")
  ///io.sockets.emit("allUsers", admins);

  socket.on("join-room",({roomID,userId})=>{
    console.log("join room called")


if(roomID=='admin'){
    console.log(socket.id)
    console.log(userId)
   
    
    // admins[socket.id+'#'+userId]=socket.id+'#'+userId;
      roomname=socket.id+'#'+userId;
adminsocket=socket.id;
adminrealsocket=socket;
adminuserid=userId

    socket.join(roomname)


    adminrealsocket.emit('allactivevechile',allavailablevechile);
  adminrealsocket.emit('allrecentusers',allrecentusers);
}


 console.log(admins);

  })

  
    
  socket.on("callfromcaller",({userId,lat,long,uniqueid,username})=>{




console.log("------caller---")

var mylength=0;

if (roomname!=''){
    io.in(roomname).clients((err , clients) => {
    
        if(clients.length==1){  
            console.log("it run")
      socket.join(roomname)
      ///var res = id.split("#");
      io.sockets.in(roomname).emit('user-connected',adminuserid)


      var meobj={
        lat:lat,
        long:long,
        username:username

      }
      adminrealsocket.emit('upcomingcall',meobj);




      usersocket=socket;

      var currentdate = new Date(); 
      var datetime = "called at: " + currentdate.getDate() + "/"
                      + (currentdate.getMonth()+1)  + "/" 
                      + currentdate.getFullYear() + " time "  
                      + currentdate.getHours() + ":"  
                      + currentdate.getMinutes() + ":" 
                      + currentdate.getSeconds();
var myobj={
  _id:uniqueid,
  username:username,
  lat:lat,
  long:long,
  datetime:datetime

}
 
allrecentusers.push(myobj)
console.log(allrecentusers)
adminrealsocket.emit('allrecentusers',allrecentusers);

        }
        else{
            socket.emit('someproblem','Dispatcher is busy on some other call or may not avaialble.Please try it later')
        }
        
      });

}
else{
    socket.emit('someproblem','Dispatcher is busy on some other call or may not avaialble.Please try it later') 
}


  })


///////////////////close calll//////////





socket.on('calcelbycaller', function () {
  console.log("-------------cancel by seller---")
  

    console.log("user on call is disconnect")
    let namespace = null;
// let ns = _io.of(namespace || "/");
// let socket = ns.connected[usersocket]
usersocket.emit('cancelbyadmin','rejected')
adminrealsocket.emit('cancelbyadmin','rejected')

usersocket.leave(roomname);

   
    
});




//////////////////////// disconnect call

  socket.on('disconnect', function () {
    console.log("-------------disconnect---")
    if(socket.id==adminsocket){
      console.log("admin disconnect")
         adminsocket='';
         adminuserid='';
         roomname='';

         
    }
    if(usersocket==socket){
      console.log("user on call is disconnect")
      let namespace = null;
// let ns = _io.of(namespace || "/");
// let socket = ns.connected[usersocket]
socket.leave(roomname);
     
      }
});

////////////////////////////////send request to vechile/////////


socket.on("requesttovechile",({vechileid,callertodispatcher})=>{

  var indexofvechile=-1;
  var indexofcaller=-1;

  for (i = 0; i < allavailablevechile.length; i++) {
      
    if(allavailablevechile[i]._id==vechileid){
      indexofvechile=i;
    }
  }


  for (i = 0; i < allrecentusers.length; i++) {
      
    if(allrecentusers[i]._id==callertodispatcher){
      indexofcaller=i;
    }
  }




console.log("======================request to vechile")

console.log(allrecentusers[indexofcaller])
console.log(allavailablevechile[indexofvechile])

io.sockets.emit(allavailablevechile[indexofvechile]._id, allrecentusers[indexofcaller]);


})




////////////////accepted from vechile;

socket.on("acceptedfromvechile",({userid,vechileid,userlat,userlong})=>{

  var indexofvechile=-1;
  var indexofcaller=-1;

  for (i = 0; i < allavailablevechile.length; i++) {
      
    if(allavailablevechile[i]._id==vechileid){
      indexofvechile=i;
    }
  }


  for (i = 0; i < allrecentusers.length; i++) {
      
    if(allrecentusers[i]._id==userid){
      indexofcaller=i;
    }
  }




console.log("======================accepted from vechile")

// console.log(allrecentusers[indexofcaller])
console.log(allavailablevechile[indexofvechile])

allavailablevechile[indexofvechile].userlat=userlat;
allavailablevechile[indexofvechile].userlong=userlong;




allworkingvechile.push(allavailablevechile[indexofvechile])


adminrealsocket.emit('allworkingvechile',allworkingvechile);

allavailablevechile.splice(indexofvechile, 1);
console.log(allworkingvechile);
console.log("avalialvle")
console.log(allavailablevechile);




})

////////////////track from admin
socket.on("trackfromadmin",(vechileid)=>{
console.log('track from admin')
console.log(vechileid)
  io.sockets.emit(vechileid, '');

})

socket.on('trackingresults',(data)=>{


  adminrealsocket.emit('trackingresults',(data));



})

})  