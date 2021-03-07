import React, { useEffect, useState, useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert'
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
function Reciever() {
  
    const classes = useStyles();
  const theme = useTheme();
  const [yourID, setYourID] = useState("");





  const [status, setstatus] = useState("");


  const [dispatvherID, setdispatvherID] = useState("");

  const [allrecentusers, setallrecentusers] = useState([]);

  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);

  const [iscall, setiscall] = useState(false);

  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [switchsecreen, setswitchsecreen] = useState("0");
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
  const peerServer = useRef();





function readytoacceptcall(){
  socket.current = io.connect("http://localhost:5000",{query:'loggeduser=user'})

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
  
             /// host:'helostranger.com',
              /// host:'192.168.1.104',
                 secure:false,
                 port:5000,
                 path:"/mypeer",
                 
             })
             
      const roomID="admin";
  
  
  
  peerServer.current.on('open',(userId)=>{
    ////  alert("dd")
      socket.current.emit('join-room',{userId,roomID})
  
  });
  
  

  socket.current.on('allrecentusers',(allrecentusers)=>{

    setallrecentusers(allrecentusers);
  })

  
  // peerServer.current.on('close', function () {
  //   //// conn = null;
  //    ////alert('Connection destroyed');
  //   //// peerServer.current.destroy();

  //    readytoacceptcall()
  // });
  peerServer.current.on('call',(call)=>{
  
      navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
  
          }
  






          socket.current.on('cancelbyadmin',(message)=>{

         /////   alert("it called")
           
       
           setstatus("");
      
          //// peerServer.current.destroy();
           call.close();
      
         /// readytoacceptcall()
          //// window.location="/reciever"
         
         })



          
          confirmAlert({
              title: 'Confirm to submit',
              message: 'Are you sure to do this.',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => {
                      call.answer(stream)
  
    setstatus("In Call")
     
                      call.on("stream",(patner)=>{
                         
                          if (partnerVideo.current) {
                              partnerVideo.current.srcObject = patner;
                            }
                        ///  alert(stream)
                        
                  
                          
                      })
  
                  }
                },
                {
                  label: 'No',
                  onClick: () => {
                    cancelcall();
  
  
                  }
                }
              ]
            });
  
  
         
      
          
        //   if (userVideo.current) {
        //     userVideo.current.srcObject = stream;
        //   }
        })
  
     
  });
  
  
  
}


  useEffect(() => {
      
    

    ////socket.current = io.connect("https://helostranger.com",{query:'loggeduser=user'})

   
    
    
    
    // socket.current.on('disconnect', function(data) { // handle server/connection falling
    //   console.log('Connection fell or your browser is closing.');
    // });


    readytoacceptcall()

    

    // socket.current.on('user-connected',(userId)=>{ 


    //   ///  alert(userId)
        
    //       //  peerServer.call(userId,stream)
    //     })


	  }, []);


      function acceptit(){
///alert("accept it")
        setCallAccepted(true)
      }


      function cancelcall(){
        ////  peerServer.current.disconnect()
  
          socket.current.emit('calcelbycaller');
         
          setstatus("");
          // peerServer.current.on('close'=>{
           ////// peerServer.disconnect();
            
           //// peerServer.current.destroy()
          // })
        //   peerServer.current.on('close', function () {
        //    //// conn = null;
        //     console.log('Connection destroyed');
        // });
          
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

reciever
<br></br>


{allrecentusers.map((s,i)=>

<>
{s.username}
<br></br>
{s.long}
<br></br>
{s.lat}
<br></br>
{s.datetime}
<br></br>
--------------------------------------------------------
</>

)}



{/* <button onClick={joinroom}>join room</button> */}

{PartnerVideo}

<video playsInline muted ref={userVideo} autoPlay />

{iscall==true? <>
    <button onClick={()=>acceptit()}>accept call</button>
</>:null}

{status=="In Call"? <>
<button onClick={cancelcall}>cancel call</button>
</>:null}


        </div>
    )
}

export default Reciever
