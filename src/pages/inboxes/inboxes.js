import React from "react";
import { Link } from "react-router-dom";
import "./inboxes.css";
import { generate } from '../../components/cat-profiles/generate/generate';

const Inboxes = () => {
  let inboxes;

  if (localStorage.getItem("inboxesSaved") === null) {
    inboxes = [];
    localStorage.setItem("inboxesSaved", JSON.stringify(inboxes));
  } else {
    inboxes = JSON.parse(localStorage.getItem("inboxesSaved"));
  }

  if (Math.floor(Math.random() * 7) === 6) {
    let generated = generate();

    inboxes = JSON.parse(localStorage.getItem("inboxesSaved"));
    inboxes.push({
      name: generated.name,
      image : generated.image,
      messages : [
        { text: "Hey, how's it going?", timestamp: '10:01 AM', type: 'received' }
      ]
    });
    localStorage.setItem("inboxesSaved", JSON.stringify(inboxes));
  }

  return (
    <div>
      {inboxes.map((inbox, index) => (
         <Link to={`/inbox/${encodeURIComponent(index)}`} key={index}>
          <div className="msg-box">
            <div className="left">
              <img
                className="profile-pic"
                src={inbox.image}
                alt="Profile"
              />
              <div className="info">
                <h2>{inbox.name}</h2>
                <p>{inbox.lastMsg}</p>
              </div>
            </div>
            <div className="time">{inbox.lastMsgTime}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Inboxes;
