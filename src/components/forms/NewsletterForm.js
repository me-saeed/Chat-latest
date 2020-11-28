import React, { Component,useState } from 'react';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
function NewsletterForm () {
  var dummyusername="";

    

  if(localStorage.getItem('strangertoken')!=null){
     

      dummyusername=localStorage.getItem('strangertoken')
  }

  const [username, setusername] = useState(dummyusername);

  
  const loginuser= async()  => {


}

  
    return (
      <form className="field-grouped">
        <div className="control control-expanded">
          <input className="input" type="email" name="email"  value={username}onChange={(e) => setusername(e.target.value)} placeholder="Enter Your Name&hellip;" />
        </div>
        <div className="control">
 
          <Button variant="outlined" color="secondary"onClick={loginuser}>
</Button>
  
        </div>
      </form>
    )

}

export default NewsletterForm;
