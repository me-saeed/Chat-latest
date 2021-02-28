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





  const [status, setstatus] = useState("Ringing");


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

  
  useEffect(() => {
      
   

    socket.current = io.connect("https://helostranger.com",{query:'loggeduser=user'})
    socket.current.on("allUsers", (users) => {
        setUsers(users);
      })
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })
    

	  }, []);
      function joinroom(){
        
//         const peerServer=new Peer(undefined,{
//             host:'localhost',
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


      function callpeer(){
       




    
        const peerServer=new Peer({
          config: {
  
            iceServers: [
                {
                    urls:[
                      "stun.l.google.com:19302",
                      "stun1.l.google.com:19302",
                      "stun2.l.google.com:19302",
                      "stun3.l.google.com:19302",
                      "stun4.l.google.com:19302",
                    ]
                    
                },
                
            ]
        },
           // host:'localhost',
           host:'helostranger.com',

            /// host:'192.168.1.104',
               secure:true,
             ////  port:5000,
               path:"/mypeer",
               
           })
           
    const roomID="itsrandom------";



peerServer.on('open',(userId)=>{
  ////  alert("dd")
   /// socket.current.emit('join-room',{userId,roomID})

    socket.current.emit('callfromcaller',{userId});

});


socket.current.on('someproblem',(message)=>{
    alert(message)

 })
socket.current.on('user-connected',(userId)=>{ 
    ////alert(userId)
    

    const call = peerServer.call(userId, stream);
    call.on('stream', (remoteStream) => {
        if (partnerVideo.current) {
                      partnerVideo.current.srcObject = remoteStream;
                       }
    });
      
    //   const callme = peerServer.call(userId,stream)
    //   callme.on('stream', (remoteStream) => {
    //       alert(remoteStream)
    //     if (partnerVideo.current) {
    //         partnerVideo.current.srcObject = remoteStream;
    //       }
      
    //   });
    })

// peerServer.on('call',(call)=>{
//     call.answer(stream)
//     call.on("stream",(stream)=>{
       

//         if (partnerVideo.current) {
//             partnerVideo.current.srcObject = stream;
//           }
      


//     })
// });
    




      }

    return (
      <div>

caller
<button onClick={callpeer}>call now</button>






<video playsInline muted ref={partnerVideo} autoPlay />
        </div>
    )
}

export default Calling
