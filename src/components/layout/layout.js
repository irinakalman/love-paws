import React from "react";
import { Outlet, Link } from "react-router-dom";

import "./layout.css";

function Layout(props) {
  return (
    <>
      <header>
        <div className="left">
      
        </div>
        <div className="right">
            <Link to='/profile'>  <img className="cat" src="/assets/img/smile.svg"></img></Link>
            <Link to='/inboxes'>  <img src="/assets/img/chat.svg"></img></Link>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
