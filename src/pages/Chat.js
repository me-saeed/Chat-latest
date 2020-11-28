import React,{useState,useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Headers from '../components/layout/Header';
import ReactGA from 'react-ga';
import Button from '@material-ui/core/Button';
import Footer from '../components/layout/Footer';
import Buttonui from '@material-ui/core/Button';
import Resizer from 'react-image-file-resizer';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import fileUpload from "fuctbase64";
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { Image  ,Button1} from 'semantic-ui-react'
// import { ReactMic } from 'react-mic';
//import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import Picker from 'emoji-picker-react';
import Popover from '@material-ui/core/Popover';
import socketIOClient from "socket.io-client";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import HttpsIcon from '@material-ui/icons/Https';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'red',
    },
    input: {
      display: 'none',
    },
}));
function tests() {
    
    var objDiv = document.getElementById("down");
    objDiv.scrollTop = objDiv.scrollHeight + 2000;
    window.scrollTo(0, 2000);
 

    window.location.hash = 'trie';

  
}
function myFocus() {
    document.getElementById("myText").focus();
}
function topFunction() {
    var myDiv = document.getElementById('down');
    window.scrollTo(myDiv, 0, 100);
}

function downFunction() {
    var objDiv = document.getElementById("down");
objDiv.scrollTop = objDiv.scrollHeight+1000;
    window.scrollTo(0, 10000);
}

function track(){

  
    ReactGA.initialize('UA-181956570-1');
  
    ReactGA.pageview("/");
  
  }


function Chat() {

   



  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG', 60, 0,
    uri => {
      resolve(uri);
    },
    'base64'
    );
});


const testonchangefile = async (event) => {
  const file = event.target.files[0];

  if(file!=undefined){
    const image = await resizeFile(file);
  ///setblobURL(image)
  printmessageforimg(image)
              globalsocket.emit('img', {'text': image})
  }
  
  ///console.log(image);
}
track();
    var dummyusername="";
   


 
    

    if(localStorage.getItem('strangertoken')!=null){
       

        dummyusername=localStorage.getItem('strangertoken')
    }

    const [username, setusername] = useState(dummyusername);


    const [allmsg, setallmsg] = React.useState([]);


    const [mymsg, setmymsg] = React.useState([]);

 


    const [recordstate, setrecordstate] = useState(false);
    
    const [tpypingmsg, settpypingmsg] = useState("");

    const [globalsocket, setglobalsocket] = useState("");
 
   

    // const [audiostates, setaudiostates] = useState({
    //     isRecording: false,
    //     blobURL: '',
    //     isBlocked: false,
    //   });

      const [blobURL, setblobURL] = useState("");

    const [pname, setpname] = useState("");


    const [myroom, setmyroom] = useState("");


    const [enablechat, setenablechat] = useState("0");


    const [message, setmessage] = useState("");


    const [noaudio, setnoaudio] = useState("0");




    // useEffect(() => {
    //   const audioContext = new AudioContext()
  
      
    //   getMedia().then(stream => {
    //     if (audioContext.state === 'closed') {
    //       setnoaudio("0");}
    //       else{
    //         setnoaudio("1");
    //       }
        
    //   })
    
    //  } , [])











     useEffect(() => {
 const ENDPOINT = "https://helostranger.com/";
////  const ENDPOINT = "http://localhost:5000";

   /////const ENDPOINT =    "https://helostranger.com/myapi";

        const    socket = socketIOClient(ENDPOINT);
       setglobalsocket(socket)
         socket.on("chat start", (data)=>{
           ///  alert("you are connected to"+data.name+"room name is "+data.room)
setmyroom(data.room);
           setpname(data.name)
setenablechat("1")
           
           
         });






         socket.on("chat end", (data)=>{
            setmymsg([]);
            setallmsg([]);
            setenablechat("2");
            
          });





socket.on('disconnect', function(data) { // handle server/connection falling
    console.log('Connection fell or your browser is closing.');
});

  
         socket.on("message", (data)=>{
        let  playAlert = require('alert-sound-notify');
          playAlert();
         
            settpypingmsg("")
          
       
       printmessage(data)
       downFunction();
       tests();
           
        });



        socket.on("img", (data)=>{

          ///  settpypingmsg("")
          
          /////setImgBase64(data)
       printmessageforimg(data)
       downFunction();
       tests();
           
        });




        socket.on("voice", (data)=>{

            ///  settpypingmsg("")
            
           //// setblobURL(data.blobURL)
            /////setImgBase64(data)
         printmessageforaudio(data.blobURL)
         downFunction();
         tests();
             
          });


        socket.on("message1", (data)=>{

         
       tests();
      
           
        });
 
       
        socket.on("typing", (data)=>{
        
          
       settpypingmsg(data);
       tests();
                
             });
      
       
         },[]);




function printmessage(msg){

  var myObj = { "finalmsg":msg ,"difff":"1"};
  setallmsg(allmsg => [...allmsg, myObj]);
}

function printmessageforimg(msg){
    var myObj = { "finalmsg":msg ,"difff":"3"};
    setallmsg(allmsg => [...allmsg, myObj]);
  }

  function printmessageforaudio(msg){
    var myObj = { "finalmsg":msg ,"difff":"4"};
    setallmsg(allmsg => [...allmsg, myObj]);
  }





const leaveroom= async()  => {
   //// setmessage("");
setallmsg([]);
setmymsg([]);
  setenablechat("2");
  globalsocket.emit('typing', {'text': ""})
globalsocket.emit('leave room');
//////globalsocket.leave(myroom);





}


 
    const loginuser= async()  => {
     
        // socket.on('connect', function (data) { // we are connected, should send our name
        /////    connected = true;
      ////      if (username=!"")

      if(username!=""){
            setenablechat("2")
            localStorage.setItem("strangertoken",username)
            globalsocket.emit('login', {'username' : username});
      }  
        // });

    }


    const sendmessage= async(socket)  => {

     
     
//        if(allmsg.length<5){
//         //    alert("hehehehhe")
// topFunction();
//        } 
//        else{
//        downFunction();}


//////downFunction();

      myFocus();
        if(message!=""){
        setmessage("");
      

        var myObj = { "finalmsg":message ,"difff":"0"};
        setallmsg(allmsg => [...allmsg, myObj]);
        tests();
        globalsocket.emit('message', {'text': message})
    

        }


      
      
    }

  
    const setsendmessage = (e) => {

       

   
        globalsocket.emit('typing', {'text': e.target.value})

     setmessage(e.target.value)

   

     
    };



    const handlerenter= (e)  => {

 
        if (e.key === 'Enter') {
            loginuser();
      }
      
      }


      const handlerentermessage= (e)  => {

 
        if (e.key === 'Enter') {
            sendmessage()
      }
      tests();
      }




      

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
         setOpen(!open);
 


    };
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        
       //// setmessage(message => [...message, emojiObject.chosenEmoji.emoji]);
        setChosenEmoji(emojiObject);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosepop = () => {
        setAnchorEl(null);
    };

    const openpop = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [img, setImg] = React.useState({
        file: "",
      });
      const [imgBase64, setImgBase64] = React.useState(null);
    
    const handleImage = (event) => {
      
        try{
        fileUpload(event).then((data) => {
          //imgBase64 = data.base64;
          
          
          //buffer = Buffer.from(imgBase64, "utf-8");
        /////  console.log(buffer + "buffer");
          var lengthInKB = data.size / 1000;
          console.log(data.size / 1000);
          //console.log(imgBase64);
          if (lengthInKB > 10000) {
            alert("Image size is  greater than 3MB.");
           
            
          }
          else{
            ////  setImgBase64("data:image/jpeg;base64," + data.base64)
              printmessageforimg("data:image/jpeg;base64," + data.base64)
              globalsocket.emit('img', {'text': "data:image/jpeg;base64," + data.base64})
            }
          
        });
    
        // setImg({
        //   file: URL.createObjectURL(event.target.files[0]),
        // });
        }
        catch{
alert("catch")
        }
      
      };



//       const start= async()  =>{
        

// setblobURL(RecordState.START)
//       }
//       const stop = async()  =>{
//         setblobURL(RecordState.STOP)

//       }
//       const onStop1= async(audioData)  =>{

//      alert(audioData.url);
//      setblobURL(audioData.url)

//       }
    
      

      const startRecording= async()  =>{

        navigator.getUserMedia({ audio: true },
          () => {
          
          setrecordstate(true)

          },
          () => {
            setrecordstate(false)
          
          },
          );
          
  
  }
 
  const stopRecording= async()  => {
    setrecordstate(false)
  }
 
  const onData= async(recordedBlob)  => {
    console.log('chunk of real-time data is: ', recordedBlob);
  }
 
  const onStop= async(recordedBlob)  => {
    console.log('recordedBlob is: ', recordedBlob);
   //// setblobURL(recordedBlob)

    globalsocket.emit('voice', {'text': recordedBlob})
    

    printmessageforaudio(recordedBlob.blobURL)
  ////  setaudiostates.blobURL(recordedBlob)
  }

    return (

        <div>

            {enablechat=="0"?<>


        <Headers/>



<section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="her">
              <div className="contain">
                <h1 className="hero-title h2-mobile mt-0 ">Say Hello to Strangers</h1>
                <p className="hero-paragraph "><HttpsIcon style={{ fontSize: 23 }}/>All Chats are end to end encrypted no outsider or<br/> even Helostranger can not read to them</p>
              </div>

        
            
            
              <form className="field-grouped">
        <div className="control control-expanded">
          <input className="input" type="text" onKeyDown={handlerenter}  name="email"   value={username} onChange={(e) => setusername(e.target.value)}  placeholder="Enter any Name&hellip;" />
        </div>

    
    
        <div className="control">
          <Button variant="outlined" onClick={loginuser} color="secondary">
            Chat
</Button>

        </div>
      </form>
      <br/>
      <div>Do not use any abusive or harsh words. Respect everyone</div>
       <br></br>
     <Button variant="outlined" onClick={()=>window.location="/newblog"} color="secondary">
            Write A Blog 
</Button>
<br></br>
<br></br>
<Button variant="outlined" onClick={()=>window.location="/blogs"} color="secondary">
            Read Blogs
</Button>

<br>
</br>

<br>
</br>

{/* <audio src={blobURL} controls="controls" /> */}
      {/* <div>
        <AudioReactRecorder state={blobURL} onStop={onStop1} />
 
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
      </div> */}



            </div>



            <div className="hero-illustration">
             
            </div>
          </div>
        
        </div>
       
      </section>
      <br/><br/><br/>
      <div className="footerstyl"><Footer/></div>
      










</>:enablechat=="1" ?<>



<Headers />
          
<div>
         
         <div className="container" >

    <div className="messaging " >
        <div className="inbox_msg">
           
            <div className="mesgs">
                <div className="inbox_pele">
                    <div className="headind_srch">

                        <div className="row">
                        <div className="col-lg-6 col-md-8 col-sm-8 col-xs-8" >
      
                      
      </div>
      <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>

      <div className="col-lg-4 col-md-8 col-sm-2 col-xs-2" >
                        <div className="cancelbtnstyl">
                <Buttonui color="secondary" onClick={()=>window.location="/"}>cancel</Buttonui>

                


                  


{/* 
<div>

  {noaudio=="1"? <>
  <ReactMic
        record={recordstate}
       ////   visualSetting="" 
         className="sound-wave"
         onStop={onStop}
          onData={onData}
        //   strokeColor="#000000"
        //   backgroundColor="#FF4081" 
         />
        <button onClick={startRecording} type="button">Start</button>
        <button onClick={stopRecording} type="button">Stop</button></>:null}
        
      </div> */}

</div>
</div>



</div>

                    </div>

                </div>
<br/>
                <div className="msg_history" id="down">

                <div className="recent_heading">
                            <h4>{pname}</h4>

                            
                        </div>

                        
                

                        
                
                {allmsg.length<4 ?<><br></br><br></br><br></br><br></br><br></br></>:null}
               
                {allmsg.map((s,i)=> (<> 

<div>
   
{s.difff=="0" ?<>
<div className="outgoing_msg">
                        <div className="sent_msg">
                        <p>{s.finalmsg}</p>
                            {/* <span className="time_date"> 11:01 AM    |    Today</span> */}
                            
                             </div>
                    </div>      
                   

                


</>: 

s.difff=="3" ?<>

                   

<Image src={s.finalmsg} size='medium' rounded style={{width:300,height:300,marginTop:10}} />


</>: 
s.difff=="4" ?<>

                   
{/* <audio src={s.finalmsg} controls="controls" /> */}
                


</>: 


<>

<div className="incoming_msg">
                       
                       <div className="received_msg">
                           <div className="received_withd_msg">


                <p>{s.finalmsg}</p>
                               {/* <span className="time_date"> 11:01 AM    |    Yesterday</span> */}
                               </div>
                       </div>
                   </div>

    
</>}


</div>   





</>))}




                   
                  
<div className="incoming_msg">
                        <div className="received_msg">

                        <div id="tries" className="typing">     
                        {tpypingmsg!="" ?<>{tpypingmsg}
                        
                     
                        
                        </>:<><br></br><br></br></>}
                            {/* <span className="time_date"> 11:01 AM    |    Today</span> */}
                            </div> 
                             </div>
                    </div>      





                  
                   











                </div>
               


                



                <div className="type_msg" id="keyboard">
                    <div className="input_msg_write">
                        
                        <input id="test"  autocomplete="off" onKeyDown={handlerentermessage}  id="myText" autofocus  value={message} onChange={setsendmessage} type="text" className="write_msg" placeholder="Type a message" />
                        
                    </div>
                 
                   
                   
                   {message=="" ?<>
                   


      <input accept="image/*" className={classes.input} id="icon-button-file" type="file"  onChange={testonchangefile} />
      <label htmlFor="icon-button-file" className="msg_send_btn2">
        <IconButton color="primary" className="msg_send_btn2" aria-label="upload picture" component="span" >
          <PhotoCamera />
        </IconButton>
      </label>

      {/* <button className="msg_send_btn1" type="button"  aria-label="upload picture"> <PhotoCamera /></button> */}

                 

                   </>: <button className="msg_send_btn1" type="button"  onClick={sendmessage}><SendIcon /></button>}
                    


                    <button className="msg_send_btn" type="button" onClick={leaveroom}><PersonAddIcon style={{ fontSize: 20 }} /></button>
                </div>
            </div>
        </div>
     
    </div></div>
</div>
         










</>:enablechat=="2"? <>


     {/* <h1>
        
    {pname!=""?<>{pname+" has left..."}</> :null   }
    
   

    
    
    Waiting for other patner</h1> */}
   <Backdrop className={classes.backdrop} open={true} onClick={handleClose}>
     
                <Typography variant="h4" gutterBottom style={{color:'white',marginLeft:20}}>
                {pname!=""?<>{pname+" has left..."}</> :null   }Connecting to other stranger
      </Typography>
      <br/>
                <CircularProgress color="inherit" style={{ marginTop: 120, marginLeft: -200 }} />
                
                <Buttonui variant="contained" color="primary" 
                onClick={()=>window.location="/"}
                style={{marginTop:250,marginRight:150}}>
                   Close
</Buttonui>

            </Backdrop>


    {/* {()=>handleToggle()} */}


</>:



null}


   



        </div>
    )
}

export default Chat