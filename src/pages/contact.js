import React,{useState,useEffect} from 'react'
import Layout from '../layouts/index';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import socketIOClient from "socket.io-client";
const ContactPage = () => {

  const [email, setemail] = useState("");
  const [messsage, setmessage] = useState("");
 

  async function senemail(){

if(email!='' && messsage!=""){
  const ENDPOINT = "https://helostranger.com/";

  
 
         const    socket = socketIOClient(ENDPOINT);
         socket.emit('sharereviews', {'name' : email,'message':messsage});

         alert("Your message has been sent!!.Thanks");
}


  }





  return (
    <Layout>
      <article className="entry">
        <div className="container">
          <div className="entner">
            <div className="entrntent">
              <div className="contai">
                <header className="entrheader">
                  <h1 className="entry-title">Share your reviews By Email </h1>
                </header>

                <div className="entry-body">
                <TextField required id="standard-required" onChange={(e) => setemail(e.target.value)} label="email or anyname" defaultValue="" />
                <br/><br/>
                <TextareaAutosize  onChange={(e) => setmessage(e.target.value)}aria-label="minimum height" rowsMin={4} style={{width:500}} placeholder="Reviews" />
                </div>
                <Button variant="contained"  onClick={senemail} color="primary" href="#contained-buttons">
        Send
      </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ContactPage;
