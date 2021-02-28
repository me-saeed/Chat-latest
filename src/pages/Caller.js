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
                    { url: 'stun:stun.1und1.de:3478' },
 { url: 'stun:stun.gmx.net:3478' },
 { url: 'stun:stun.l.google.com:19302' },
 { url: 'stun:stun1.l.google.com:19302' },
 { url: 'stun:stun2.l.google.com:19302' },
 { url: 'stun:stun3.l.google.com:19302' },
 { url: 'stun:stun4.l.google.com:19302' },
 { url: 'stun:23.21.150.121:3478' },
 { url: 'stun:iphone-stun.strato-iphone.de:3478' },
 { url: 'stun:numb.viagenie.ca:3478' },
 { url: 'stun:stun.12connect.com:3478' },
 { url: 'stun:stun.12voip.com:3478' },
 { url: 'stun:stun.1und1.de:3478' },
 { url: 'stun:stun.2talk.co.nz:3478' },
 { url: 'stun:stun.2talk.com:3478' },
 { url: 'stun:stun.3clogic.com:3478' },
 { url: 'stun:stun.3cx.com:3478' },
 { url: 'stun:stun.a-mm.tv:3478' },
 { url: 'stun:stun.aa.net.uk:3478' },
 { url: 'stun:stun.acrobits.cz:3478' },
 { url: 'stun:stun.actionvoip.com:3478' },
 { url: 'stun:stun.advfn.com:3478' },
 { url: 'stun:stun.aeta-audio.com:3478' },
 { url: 'stun:stun.aeta.com:3478' },
 { url: 'stun:stun.altar.com.pl:3478' },
 { url: 'stun:stun.annatel.net:3478' },
 { url: 'stun:stun.antisip.com:3478' },
 { url: 'stun:stun.arbuz.ru:3478' },
 { url: 'stun:stun.avigora.fr:3478' },
 { url: 'stun:stun.awa-shima.com:3478' },
 { url: 'stun:stun.b2b2c.ca:3478' },
 { url: 'stun:stun.bahnhof.net:3478' },
 { url: 'stun:stun.barracuda.com:3478' },
 { url: 'stun:stun.bluesip.net:3478' },
 { url: 'stun:stun.bmwgs.cz:3478' },
 { url: 'stun:stun.botonakis.com:3478' },
 { url: 'stun:stun.budgetsip.com:3478' },
 { url: 'stun:stun.cablenet-as.net:3478' },
 { url: 'stun:stun.callromania.ro:3478' },
 { url: 'stun:stun.callwithus.com:3478' },
 { url: 'stun:stun.chathelp.ru:3478' },
 { url: 'stun:stun.cheapvoip.com:3478' },
 { url: 'stun:stun.ciktel.com:3478' },
 { url: 'stun:stun.cloopen.com:3478' },
 { url: 'stun:stun.comfi.com:3478' },
 { url: 'stun:stun.commpeak.com:3478' },
 { url: 'stun:stun.comtube.com:3478' },
 { url: 'stun:stun.comtube.ru:3478' },
 { url: 'stun:stun.cope.es:3478' },
 { url: 'stun:stun.counterpath.com:3478' },
 { url: 'stun:stun.counterpath.net:3478' },
 { url: 'stun:stun.datamanagement.it:3478' },
 { url: 'stun:stun.dcalling.de:3478' },
 { url: 'stun:stun.demos.ru:3478' },
 { url: 'stun:stun.develz.org:3478' },
 { url: 'stun:stun.dingaling.ca:3478' },
 { url: 'stun:stun.doublerobotics.com:3478' },
 { url: 'stun:stun.dus.net:3478' },
 { url: 'stun:stun.easycall.pl:3478' },
 { url: 'stun:stun.easyvoip.com:3478' },
 { url: 'stun:stun.ekiga.net:3478' },
 { url: 'stun:stun.epygi.com:3478' },
 { url: 'stun:stun.etoilediese.fr:3478' },
 { url: 'stun:stun.faktortel.com.au:3478' },
 { url: 'stun:stun.freecall.com:3478' },
 { url: 'stun:stun.freeswitch.org:3478' },
 { url: 'stun:stun.freevoipdeal.com:3478' },
 { url: 'stun:stun.gmx.de:3478' },
 { url: 'stun:stun.gmx.net:3478' },
 { url: 'stun:stun.gradwell.com:3478' },
 { url: 'stun:stun.halonet.pl:3478' },
 { url: 'stun:stun.hellonanu.com:3478' },
 { url: 'stun:stun.hoiio.com:3478' },
 { url: 'stun:stun.hosteurope.de:3478' },
 { url: 'stun:stun.ideasip.com:3478' },
 { url: 'stun:stun.infra.net:3478' },
 { url: 'stun:stun.internetcalls.com:3478' },
 { url: 'stun:stun.intervoip.com:3478' },
 { url: 'stun:stun.ipcomms.net:3478' },
 { url: 'stun:stun.ipfire.org:3478' },
 { url: 'stun:stun.ippi.fr:3478' },
 { url: 'stun:stun.ipshka.com:3478' },
 { url: 'stun:stun.irian.at:3478' },
 { url: 'stun:stun.it1.hr:3478' },
 { url: 'stun:stun.ivao.aero:3478' },
 { url: 'stun:stun.jumblo.com:3478' },
 { url: 'stun:stun.justvoip.com:3478' },
 { url: 'stun:stun.kanet.ru:3478' },
 { url: 'stun:stun.kiwilink.co.nz:3478' },
 { url: 'stun:stun.l.google.com:19302' },
 { url: 'stun:stun.linea7.net:3478' },
 { url: 'stun:stun.linphone.org:3478' },
 { url: 'stun:stun.liveo.fr:3478' },
 { url: 'stun:stun.lowratevoip.com:3478' },
 { url: 'stun:stun.lugosoft.com:3478' },
 { url: 'stun:stun.lundimatin.fr:3478' },
 { url: 'stun:stun.magnet.ie:3478' },
 { url: 'stun:stun.mgn.ru:3478' },
 { url: 'stun:stun.mit.de:3478' },
 { url: 'stun:stun.mitake.com.tw:3478' },
 { url: 'stun:stun.miwifi.com:3478' },
 { url: 'stun:stun.modulus.gr:3478' },
 { url: 'stun:stun.myvoiptraffic.com:3478' },
 { url: 'stun:stun.mywatson.it:3478' },
 { url: 'stun:stun.nas.net:3478' },
 { url: 'stun:stun.neotel.co.za:3478' },
 { url: 'stun:stun.netappel.com:3478' },
 { url: 'stun:stun.netgsm.com.tr:3478' },
 { url: 'stun:stun.nfon.net:3478' },
 { url: 'stun:stun.noblogs.org:3478' },
 { url: 'stun:stun.noc.ams-ix.net:3478' },
 { url: 'stun:stun.nonoh.net:3478' },
 { url: 'stun:stun.nottingham.ac.uk:3478' },
 { url: 'stun:stun.nova.is:3478' },
 { url: 'stun:stun.on.net.mk:3478' },
 { url: 'stun:stun.ooma.com:3478' },
 { url: 'stun:stun.ooonet.ru:3478' },
 { url: 'stun:stun.oriontelekom.rs:3478' },
 { url: 'stun:stun.outland-net.de:3478' },
 { url: 'stun:stun.ozekiphone.com:3478' },
 { url: 'stun:stun.personal-voip.de:3478' },
 { url: 'stun:stun.phone.com:3478' },
 { url: 'stun:stun.pjsip.org:3478' },
 { url: 'stun:stun.poivy.com:3478' },
 { url: 'stun:stun.powerpbx.org:3478' },
 { url: 'stun:stun.powervoip.com:3478' },
 { url: 'stun:stun.ppdi.com:3478' },
 { url: 'stun:stun.qq.com:3478' },
 { url: 'stun:stun.rackco.com:3478' },
 { url: 'stun:stun.rapidnet.de:3478' },
 { url: 'stun:stun.rb-net.com:3478' },
 { url: 'stun:stun.rixtelecom.se:3478' },
 { url: 'stun:stun.rockenstein.de:3478' },
 { url: 'stun:stun.rolmail.net:3478' },
 { url: 'stun:stun.rynga.com:3478' },
 { url: 'stun:stun.schlund.de:3478' },
 { url: 'stun:stun.services.mozilla.com:3478' },
 { url: 'stun:stun.sigmavoip.com:3478' },
 { url: 'stun:stun.sip.us:3478' },
 { url: 'stun:stun.sipdiscount.com:3478' },
 { url: 'stun:stun.sipgate.net:10000' },
 { url: 'stun:stun.sipgate.net:3478' },
 { url: 'stun:stun.siplogin.de:3478' },
 { url: 'stun:stun.sipnet.net:3478' },
 { url: 'stun:stun.sipnet.ru:3478' },
 { url: 'stun:stun.siportal.it:3478' },
 { url: 'stun:stun.sippeer.dk:3478' },
 { url: 'stun:stun.siptraffic.com:3478' },
 { url: 'stun:stun.skylink.ru:3478' },
 { url: 'stun:stun.sma.de:3478' },
 { url: 'stun:stun.smartvoip.com:3478' },
 { url: 'stun:stun.smsdiscount.com:3478' },
 { url: 'stun:stun.snafu.de:3478' },
 { url: 'stun:stun.softjoys.com:3478' },
 { url: 'stun:stun.solcon.nl:3478' },
 { url: 'stun:stun.solnet.ch:3478' },
 { url: 'stun:stun.sonetel.com:3478' },
 { url: 'stun:stun.sonetel.net:3478' },
 { url: 'stun:stun.sovtest.ru:3478' },
 { url: 'stun:stun.speedy.com.ar:3478' },
 { url: 'stun:stun.spokn.com:3478' },
 { url: 'stun:stun.srce.hr:3478' },
 { url: 'stun:stun.ssl7.net:3478' },
 { url: 'stun:stun.stunprotocol.org:3478' },
 { url: 'stun:stun.symform.com:3478' },
 { url: 'stun:stun.symplicity.com:3478' },
 { url: 'stun:stun.t-online.de:3478' },
 { url: 'stun:stun.tagan.ru:3478' },
 { url: 'stun:stun.teachercreated.com:3478' },
 { url: 'stun:stun.tel.lu:3478' },
 { url: 'stun:stun.telbo.com:3478' },
 { url: 'stun:stun.telefacil.com:3478' },
 { url: 'stun:stun.tng.de:3478' },
 { url: 'stun:stun.twt.it:3478' },
 { url: 'stun:stun.u-blox.com:3478' },
 { url: 'stun:stun.ucsb.edu:3478' },
 { url: 'stun:stun.ucw.cz:3478' },
 { url: 'stun:stun.uls.co.za:3478' },
 { url: 'stun:stun.unseen.is:3478' },
 { url: 'stun:stun.usfamily.net:3478' },
 { url: 'stun:stun.veoh.com:3478' },
 { url: 'stun:stun.vidyo.com:3478' },
 { url: 'stun:stun.vipgroup.net:3478' },
 { url: 'stun:stun.viva.gr:3478' },
 { url: 'stun:stun.vivox.com:3478' },
 { url: 'stun:stun.vline.com:3478' },
 { url: 'stun:stun.vo.lu:3478' },
 { url: 'stun:stun.vodafone.ro:3478' },
 { url: 'stun:stun.voicetrading.com:3478' },
 { url: 'stun:stun.voip.aebc.com:3478' },
 { url: 'stun:stun.voip.blackberry.com:3478' },
 { url: 'stun:stun.voip.eutelia.it:3478' },
 { url: 'stun:stun.voiparound.com:3478' },
 { url: 'stun:stun.voipblast.com:3478' },
 { url: 'stun:stun.voipbuster.com:3478' },
 { url: 'stun:stun.voipbusterpro.com:3478' },
 { url: 'stun:stun.voipcheap.co.uk:3478' },
 { url: 'stun:stun.voipcheap.com:3478' },
 { url: 'stun:stun.voipfibre.com:3478' },
 { url: 'stun:stun.voipgain.com:3478' },
 { url: 'stun:stun.voipgate.com:3478' },
 { url: 'stun:stun.voipinfocenter.com:3478' },
 { url: 'stun:stun.voipplanet.nl:3478' },
 { url: 'stun:stun.voippro.com:3478' },
 { url: 'stun:stun.voipraider.com:3478' },
 { url: 'stun:stun.voipstunt.com:3478' },
 { url: 'stun:stun.voipwise.com:3478' },
 { url: 'stun:stun.voipzoom.com:3478' },
 { url: 'stun:stun.vopium.com:3478' },
 { url: 'stun:stun.voxox.com:3478' },
 { url: 'stun:stun.voys.nl:3478' },
 { url: 'stun:stun.voztele.com:3478' },
 { url: 'stun:stun.vyke.com:3478' },
 { url: 'stun:stun.webcalldirect.com:3478' },
 { url: 'stun:stun.whoi.edu:3478' },
 { url: 'stun:stun.wifirst.net:3478' },
 { url: 'stun:stun.wwdl.net:3478' },
 { url: 'stun:stun.xs4all.nl:3478' },
 { url: 'stun:stun.xtratelecom.es:3478' },
 { url: 'stun:stun.yesss.at:3478' },
 { url: 'stun:stun.zadarma.com:3478' },
 { url: 'stun:stun.zadv.com:3478' },
 { url: 'stun:stun.zoiper.com:3478' },
 { url: 'stun:stun1.faktortel.com.au:3478' },
 { url: 'stun:stun1.l.google.com:19302' },
 { url: 'stun:stun1.voiceeclipse.net:3478' },
 { url: 'stun:stun2.l.google.com:19302' },
 { url: 'stun:stun3.l.google.com:19302' },
 { url: 'stun:stun4.l.google.com:19302' },
 { url: 'stun:stunserver.org:3478' },

                    
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