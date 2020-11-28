import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Headers from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Buttonui from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
//import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import Picker from 'emoji-picker-react';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'red',
    },
}));

function tests() {
    
    var objDiv = document.getElementById("down");
    objDiv.scrollTop = objDiv.scrollHeight + 1000;
    window.scrollTo(0, 10000);
 

    window.location.hash = 'trie';
   
}

function Newchat() {
  
    return (
        <div>
         
                     <div className="container" >
            
                <div className="messaging " >
                    <div className="inbox_msg">
                       
                        <div className="mesgs">
                            <div className="inbox_pele">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Name</h4>
                                    </div>

                                </div>

                            </div>
<br/>
                            <div className="msg_history" id="down">
                              
                                
                                <div className="incoming_msg">
                                   
                                    <div className="received_msg">
                                        <div className="received_withd_msg">
                                            <p>Test, which is a new approach to have</p>
                                            <span className="time_date"> 11:01 AM    |    Yesterday</span></div>
                                    </div>
                                </div>
                             
                                <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>Apollo University, Delhi, India Test</p>
                                        <span className="time_date"> 11:01 AM    |    Today</span> </div>
                                </div>
                                <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>Apollo University, Delhi, India Test</p>
                                        <span className="time_date"> 11:01 AM    |    Today</span> </div>
                                </div>     <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>Apollo University, Delhi, India Test</p>
                                        <span className="time_date"> 11:01 AM    |    Today</span> </div>
                                </div>     <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>Apollo University, Delhi, India Test</p>
                                        <span className="time_date"> 11:01 AM    |    Today</span> </div>
                                </div>     <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>Apollo University, Delhi, India Test</p>
                                        <span className="time_date"> 11:01 AM    |    Today</span> </div>
                                </div>

                               
                            </div>
                            <div id="tries" className="typing"> test</div> 
                            <div className="type_msg" id="keyboard">
                                <div className="input_msg_write">
                                    
                                    <input id="test" onClick={tests} onChange={tests} type="text" className="write_msg" placeholder="Type a message" />
                                    
                                </div>
                             
                                <button className="msg_send_btn1" type="button"><SendIcon /></button>
                                <button className="msg_send_btn" type="button"><AddIcon /></button>
                            </div>
                        </div>
                    </div>
                 
                </div></div>
        </div>
    )
}

export default Newchat
