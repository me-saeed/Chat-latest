import React, { useState, useEffect } from "react";
import Headers from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Form, TextArea } from 'semantic-ui-react'
import socketIOClient from "socket.io-client";

function Newblog() {
    const [name, setname] = useState("Someone");
    const [messsage, setmessage] = useState("");
   
  
    async function sendblog(){
  
  if( messsage!=""){
   //// const ENDPOINT = "http://localhost:5000";
  
    const ENDPOINT = "https://helostranger.com/";
   
          const    socket = socketIOClient(ENDPOINT);
          socket.emit('shareblog', {'name' : name,'message':messsage});
  
           alert("your content will be public after admin approval!! Thanks Please share more");


           window.location="/newblog";
  }
  
  
    }
  
    return (
        <div>
             <Headers/>
             <br/><br/>
             <div className="container">
             
             <TextField  style={{ marginLeft:30}}required id="standard-required" onChange={(e) => setname(e.target.value)} label="Heading" defaultValue="" />
             <br/>
             <TextField  style={{ marginLeft:30}}  onChange={(e) => setname(e.target.value)} label="Name" defaultValue="" />
             <br/> <br/> 
             <Form >
    <TextArea onChange={(e) => setmessage(e.target.value)} placeholder='Share any experience about this website' className="textarea-styl"  />
  </Form>
             
             <br/>
             <Button variant="contained"  onClick={sendblog} color="primary" href="#contained-buttons" style={{ marginLeft:140}}>
        Publish
      </Button>
             <br/><br/><br/><br/><br/><br/><br/>
             </div>
  <Footer/>
        </div>
    )
}

export default Newblog
