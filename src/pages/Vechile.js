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
function Vechile() {
  
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






  useEffect(() => {
      
    socket.current = io.connect("http://localhost:5000",{query:'loggeduser=vehcile&id=qwerty&name=vechile'})




    socket.current.on('qwerty',(requesteddata)=>{

        if(requesteddata==''){
          /////  alert("i got request from admin")

            var mylat="111"
            var mylong='222'
            var myobj={
                
            mylat:"111",
           mylong:'222',
            }
            socket.current.emit('trackingresults',myobj)



        }
        else{
      alert(requesteddata.lat)
      
 
      confirmAlert({
        title: 'Confirm to submit',
        message: 'lat is:'+requesteddata.lat+"long is:"+requesteddata.long+"name:"+requesteddata.username,
        buttons: [
          {
            label: 'Yes',
            onClick: () => {

                var userid=requesteddata._id
                var vechileid='qwerty';
                var userlat=requesteddata.lat;

                var userlong=requesteddata.long;
                socket.current.emit('acceptedfromvechile',{userid,vechileid,userlat,userlong})



            }
          },
          {
            label: 'No',
            onClick: () => {
            ////  cancelcall();


            }
          }
        ]
      });


    }

      })

    

	  }, []);




    return (
      <div>

vechile
<br></br>




        </div>
    )
}

export default Vechile
