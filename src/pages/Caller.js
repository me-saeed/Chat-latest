import React, { useEffect, useState, useRef } from 'react';

import io from "socket.io-client";
import Peer from 'peerjs';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
   
    fab: {
      position: 'absolute',
      bottom: theme.spacing(6),
      right: theme.spacing(20),
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        top: theme.spacing(6),
      },
  }));
function Calling() {
    const classes = useStyles();
  const theme = useTheme();
  const [yourID, setYourID] = useState("");





  const [status, setstatus] = useState("");


  const [dispatvherID, setdispatvherID] = useState("");

  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [switchsecreen, setswitchsecreen] = useState("0");
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
  const peerServer = useRef();

  
  useEffect(() => {
      
   

   //// socket.current = io.connect("https://helostranger.com",{query:'loggeduser=user'})


    socket.current = io.connect("http://localhost:5000",{query:'loggeduser=user'})

    socket.current.on('disconnect', function(data) { // handle server/connection falling
      console.log('Connection fell or your browser is closing.');
    });
    socket.current.on("allUsers", (users) => {
        setUsers(users);
      })
   
    


	  }, []);
      function joinroom(){
        
//         const peerServer=new Peer(undefined,{
//             host:'localhost',y
//             /// host:'192.168.1.104',
//                secure:false,
//                port:5000,
//                path:"/mypeer"
//            })
           
//     const roomID="itsrandom------";



// peerServer.on('open',(userId)=>{
//   ////  alert("dd")
//     socket.current.emit('join-room',{userId,roomID})

// });


// // socket.current.on('user-connected',(userId)=>{ 
// //     ////alert(userId)
    
      
// //       const call = peerServer.call(userId,stream)
// //       call.on('stream', (remoteStream) => {
// //         if (partnerVideo.current) {
// //             partnerVideo.current.srcObject = remoteStream;
// //           }
      
// //       });
// //     })

// // peerServer.on('call',(call)=>{
// //     call.answer(stream)
// //     call.on("stream",(stream)=>{
       

// //         if (partnerVideo.current) {
// //             partnerVideo.current.srcObject = stream;
// //           }
      


// //     })
// // });
          
      }

      function cancelcall(){
  
        socket.current.emit('calcelbycaller');
       
        setstatus("");
      
      }


      function callpeer(){
       


        navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
          setstatus("Ringing")
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;

          }
              
         peerServer.current=new Peer({
          config: {
  
            iceServers: [
              {
              urls: [
              "stun:65.1.136.15:3478",
              ],
              },
              {
              username: "user",
              credential: "password",
              urls: [
              "turn:65.1.136.15:3478?transport=udp",
              "turn:65.1.136.15:3478?transport=tcp",
              "turns:65.1.136.15:5349?transport=tcp",
              ],
              },
              ]
        },
            host:'localhost',
         ////  host:'helostranger.com',

            /// host:'192.168.1.104',
               secure:false,
              port:5000,
               path:"/",
               
           })
           
    const roomID="itsrandom------";



peerServer.current.on('open',(userId)=>{
  
   /// socket.current.emit('join-room',{userId,roomID})
   var uniqueid="abcd"

   var username="saeed"
   var lat="111";
   var long="565"
   socket.current.emit('callfromcaller',{userId,lat,long,uniqueid,username})

});

peerServer.current.on('close', function () {
  //// conn = null;
   ////alert('Connection destroyed');
   peerServer.current.destroy();

   ////readytoacceptcall()
});

socket.current.on('someproblem',(message)=>{
    alert(message)

 })

 socket.current.on('cancelbyadmin',(message)=>{
  //// alert("cancel now")
  peerServer.current.destroy()
  setstatus("");

})
socket.current.on('user-connected',(userId)=>{ 
    ////alert(userId)
    

    const call = peerServer.current.call(userId, stream);
    call.on('stream', (remoteStream) => {
      setstatus("In Call")
        if (partnerVideo.current) {
                      partnerVideo.current.srcObject = remoteStream;
                       }
    });
      
   
    })


        })

      




      }
      let UserVideo;
     
      UserVideo = (
        <video playsInline muted ref={userVideo} autoPlay />
      );
    
  
    let PartnerVideo;
   
      PartnerVideo = (
        <video playsInline ref={partnerVideo} autoPlay />
      );
    

    return (
      <div>



status:{status}

<br></br>

{status==""? <>
caller
<button onClick={callpeer}>call now</button>
</>:null}

{status=="In Call"? <>
<button onClick={cancelcall}>cancel call</button>
</>:null}

{PartnerVideo}

        </div>
    )
}

export default Calling
