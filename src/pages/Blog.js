import React, { useState, useEffect } from "react";
import Headers from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '@material-ui/core/Button';
import socketIOClient from "socket.io-client";
import { Loader, Image, Segment } from 'semantic-ui-react'
function Blog() {
    const [LengthArray, setLengthArray] = useState([]);


    const [allpost, setallpost] = useState([]);


    useEffect(() => {
   const ENDPOINT = "https://helostranger.com/";
  ////  const ENDPOINT = "http://localhost:5000";
     
        /////const ENDPOINT =    "https://helostranger.com/myapi";
     
             const    socket = socketIOClient(ENDPOINT);
             socket.emit('readblog', {});
              socket.on("blogdata", (data)=>{

                console.log(data.result)
               setallpost(data.result)
              });
    
            
              },[]);
     
    return (








        <div>

            <Headers/>
            <div className="container">
            <header className="entrheader">
                  <h1 className="entry-title">Blogs</h1>
                  <Button variant="contained" color="primary" href="/newblog">
        New
      </Button>
                </header>
           <br/>

{allpost.length==0 ? <>      <Segment>
    <Loader active />

    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>
  <br></br>
         <Segment>
    <Loader active />

    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>

<br></br>

<Segment>
    <Loader active />

    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>
  <br></br>
         <Segment>
    <Loader active />

    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>

<br></br>
<Segment>
    <Loader active />

    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>
  <br></br>
         <Segment>
    <Loader active />

    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment></>:<>          {allpost.map((s,i)=> (<>                 <div class="band">
  <div class="item-1">
    <a  class="card">
     
      <article>
    <h1>{s.topic}</h1>
        <div className="description-styl">{s.message} 
        
        
         </div> 
        <span>By:{s.name}</span>
      </article>
    </a>
  </div>
  </div>
</> ))}</>}

     




 










  
  </div>
  <Footer/>
        </div>
    )
}

export default Blog
