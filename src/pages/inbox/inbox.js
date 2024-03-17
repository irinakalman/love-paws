import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './inbox.css';

const apiKey = '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'; // Replace with your actual OpenAI API key

function DirectMessagePage() {
  let { catId } = useParams();

  let inboxes = JSON.parse(localStorage.getItem("inboxesSaved"));
  console.log(inboxes)
  let name = inboxes[catId].name

  const [messages, setMessages] = useState(inboxes[catId].messages);

  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!inputMessage.trim()) return; // Prevent sending empty messages

    // Sent
    let newMessages = {
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent' // Assuming all new messages are sent by the user
    };
    setMessages([...messages, newMessages]);
    // localStorage.setItem("inboxesSaved", inboxes);

    setInputMessage(''); // Reset input field

    // Received
    await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + apiKey
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a cute cat named' + name + ' that always refers to cat things and always asks questions back to maintain a conversation.' },
                { role: 'user', content: inputMessage }
            ],
            temperature: 0.7
        })
    })
    .then(response => response.json())
    .then(data => {      
        let newMessage = {
          text: data.choices[0].message.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'received'
        }
        setMessages((m) => [...m, newMessage]);

        inboxes = JSON.parse(localStorage.getItem("inboxesSaved"));
        inboxes[catId].messages.push(newMessage);
        localStorage.setItem("inboxesSaved", JSON.stringify(inboxes));
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  return (
    <div className="messagesContainer">
      <h2>Conversation with {name}</h2>
      <div className="messageExchange">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="text">{message.text}</div>
            <div className="timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
      <form className="sendMessageForm" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          className="messageInput"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit" className="sendButton">Send</button>
      </form>
    </div>
  );
}

export default DirectMessagePage;
