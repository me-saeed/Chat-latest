import React, { useEffect, useState, useRef } from 'react';

import io from "socket.io-client";
import Peer from "simple-peer";

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
	////  const socket1 = io("https://www.helostranger.com");
	  var connectionOptions =  {
		  withCredentials: true,
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
            "timeout" : 10000, //before connect_error and connect_timeout are emitted.
            "transports" : ["websocket"]
        };


    socket.current = io.connect("https://www.helostranger.com",{query:'loggeduser=user'})
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })

    socket.current.on("yourID", (id) => {
     /// alert(id)
      setYourID(id);
    })
    socket.current.on("dispatcherid", (id) => {
      /// alert(id)
       setdispatvherID(id);
     })
     
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    })

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })
  }, []);

  function callPeer(id) {
    setswitchsecreen("1")
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
  
        iceServers: [
            {
                "urls":["stun.l.google.com:19302",
                  "stun1.l.google.com:19302",
                  "stun2.l.google.com:19302",
                  "stun3.l.google.com:19302",
                  "stun4.l.google.com:19302",]
                
            },
            
        ]
    },
      stream: stream,
    });

    peer.on("signal", data => {
      socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
    })

    peer.on("stream", stream => {
      setstatus("In call")
    
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })

  }







  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.current.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <video playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    )
  }

    return (
      <div>

        {switchsecreen=="0"? <>
        <div style={{
            backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
            backgroundImage:
              "url(" + "https://image.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1108.jpg" + ")",
          }}>
              <React.Fragment>
      <CssBaseline />
      
      <Container maxWidth="sm">
      <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
      Available Dispatchers
      </Typography>
      <br/>

      <Grid container spacing={1} >
      <Grid item xs={2}>

      </Grid>


      {Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          return (
            <>
            {/* <button onClick={() => callPeer(key)}>Call {key}</button> */}



            <Grid item xs={10}>
            <Button  onClick={() => callPeer(key)}variant="contained" style={{width:250}} color="primary">
            Call Dispatcher
          </Button>
          </Grid>

</>

          );
        })}
     
      </Grid>



<br/>

     


     

          </div>
      </Container>
      </React.Fragment>
        </div>
        
        </>:<>
        
        
        <div  style={{
            backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
            backgroundImage:
              "url(" + "https://image.freepik.com/free-vector/abstract-blurred-gradient-mesh-background_1159-3175.jpg" + ")",
          }}>
            <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">

      <Grid container spacing={1}>
      <Grid item xs={4}></Grid>
        <Grid item xs={5}>
      <Avatar alt="Remy Sharp" src="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" className={classes.large} />
<br/><br/>
<Typography >Name</Typography>
<Typography >Status:{status}</Typography>
      </Grid>
      </Grid>

 
      <Grid container spacing={3}>
      <Grid item xs={3}></Grid>
        <Grid item xs={5}>
   
      <LinearProgress color="secondary" />
      </Grid>
      </Grid>

      <Grid container spacing={3}>
      <Grid item xs={3}></Grid>
        <Grid item xs={5}>
   
        {UserVideo}
        {PartnerVideo}
      </Grid>
      </Grid>



      <Grid container spacing={3}>
        <Grid item xs={12}>
          
        <Fab color="secondary" aria-label="add" className={classes.fab}>
        <CallEndIcon />
      </Fab>
      

        </Grid>
        </Grid>
      </Container>
    </React.Fragment>
        </div>
        
        
        </>}

        </div>
    )
}

export default Calling
