// import React, { useEffect, useState, useRef } from 'react';

// import io from "socket.io-client";
// ////import Peer from "simple-peer";
// import { DriveEta } from '@material-ui/icons';


// function Chat() {
//   const [globalsocket, setglobalsocket] = useState("");
//   const [yourID, setYourID] = useState("");
//   const [users, setUsers] = useState({});
//   const [stream, setStream] = useState();
//   const [receivingCall, setReceivingCall] = useState(false);
//   const [caller, setCaller] = useState("");
//   const [callerSignal, setCallerSignal] = useState();
//   const [callAccepted, setCallAccepted] = useState(false);

//   const userVideo = useRef();
//   const partnerVideo = useRef();
  

//   useEffect(() => {
//     const socket = io("localhost:5000");

//     setglobalsocket(socket)
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
//       setStream(stream);
//       if (userVideo.current) {
//         userVideo.current.srcObject = stream;
//       }
//     })

//     socket.on("yourID", (id) => {
 
//       console.log("--------------")
//      /// setYourID(id);
//     })

  
//     socket.on("allUsers", (users) => {
       
 
//       setUsers(users);
//     })

//     socket.on("hey", (data) => {
//       setReceivingCall(true);
//       setCaller(data.from);
//       setCallerSignal(data.signal);
//     })
//   }, []);

//   function callPeer(id) {
//     // // const peer = new Peer({
//     // //   initiator: true,
//     // //   trickle: false,
//     // //   config: {

//     // //     iceServers: [
//     // //         {
//     // //             urls: "stun:numb.viagenie.ca",
//     // //             username: "sultan1640@gmail.com",
//     // //             credential: "98376683"
//     // //         },
//     // //         {
//     // //             urls: "turn:numb.viagenie.ca",
//     // //             username: "sultan1640@gmail.com",
//     // //             credential: "98376683"
//     // //         }
//     // //     ]
//     // // },
//     // //   stream: stream,
//     // // });

//     // peer.on("signal", data => {
//     //   globalsocket.emit("callUser", { userToCall: id, signalData: data, from: yourID })
//     // })

//     // peer.on("stream", stream => {
//     //   if (partnerVideo.current) {
//     //     partnerVideo.current.srcObject = stream;
//     //   }
//     // });

//     // globalsocket.on("callAccepted", signal => {
//     //   setCallAccepted(true);
//     //   peer.signal(signal);
//     // })

//   }

//   function acceptCall() {
//     // setCallAccepted(true);
//     // const peer = new Peer({
//     //   initiator: false,
//     //   trickle: false,
//     //   stream: stream,
//     // });
//     // peer.on("signal", data => {
//     //   globalsocket.emit("acceptCall", { signal: data, to: caller })
//     // })

//     // peer.on("stream", stream => {
//     //   partnerVideo.current.srcObject = stream;
//     // });

//     // peer.signal(callerSignal);
//   }

//   let UserVideo;
//   if (stream) {
//     UserVideo = (
//       <video style={{width:"100px",height:"44px"}} playsInline muted ref={userVideo} autoPlay />
//     );
//   }

//   let PartnerVideo;
//   if (callAccepted) {
//     PartnerVideo = (
//       <video playsInline ref={partnerVideo} autoPlay />
//     );
//   }

//   let incomingCall;
//   if (receivingCall) {
//     incomingCall = (
//       <div>
//         <h1>{caller} is calling you</h1>
//         <button onClick={acceptCall}>Accept</button>
//       </div>
//     )
//   }
//   return (
//     <div>
      
//       <h1>sssssssssssssss</h1>
//         {/* {UserVideo} */}
//         {PartnerVideo}
     
//         {Object.keys(users).map(key => {
//           if (key === yourID) {
//             return null;
//           }
//           return (
//             <button style={{color:"black"}}  onClick={() => callPeer(key)}>Cal fffffffffffffffffffffffffffffffffffffl {key}</button>
//           );
//         })}
      
//         {incomingCall}
    
//     </div>
//   );
// }

// export default Chat;




import React, { useEffect, useState, useRef } from 'react';

import io from "socket.io-client";
import Peer from "simple-peer";


function  Admin() {
    const [yourID, setYourID] = useState("");
    const [dispatvherID, setdispatvherID] = useState("");
  
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
  
    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();
  
    useEffect(() => {
      socket.current = io.connect("localhost:5000");
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
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
      const peer = new Peer({
        initiator: true,
        trickle: false,
        config: {
  
          iceServers: [
              {
                  urls: "stun:numb.viagenie.ca",
                  username: "sultan1640@gmail.com",
                  credential: "98376683"
              },
              {
                  urls: "turn:numb.viagenie.ca",
                  username: "sultan1640@gmail.com",
                  credential: "98376683"
              }
          ]
      },
        stream: stream,
      });
  
      peer.on("signal", data => {
        socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
      })
  
      peer.on("stream", stream => {
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
      ownid{yourID}
      <br></br><br></br>
          {UserVideo}
          {PartnerVideo}
{/*        
          {Object.keys(users).map(key => {
            if (key === yourID) {
              return null;
            }
            return (
              <button onClick={() => callPeer(key)}>Call {key}</button>
            );
          })} */}
       
          {incomingCall}
        
      </div>
  );
}

export default Admin;