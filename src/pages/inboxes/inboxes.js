import React from "react";
import { Link } from "react-router-dom";
import './inboxes.css';

const Inboxes = () => {
  return (
    <div>
         <Link to='/inbox'>   <div className="msg-box">
        <div className="left">
        <img className="profile-pic" src="/assets/img/black-cat.svg"></img>
        <div className="info">
            <h2>Lorem ipsum</h2>
            <p>Lorem ipsum ..</p>
        </div>
        </div>
        
        <div className="time">18.32</div>
      </div></Link>
     
    </div>
  );
};

export default Inboxes;
