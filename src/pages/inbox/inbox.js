import React, { useState } from 'react';
import './inbox.css';

const apiKey = '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'; // Replace with your actual OpenAI API key

function DirectMessagePage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how's it going?", timestamp: '10:01 AM', type: 'received' },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!inputMessage.trim()) return; // Prevent sending empty messages

    let newMessages = {
      id: messages.length + 1,
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent' // Assuming all new messages are sent by the user
    };
    setMessages([...messages, newMessages]);

    setInputMessage(''); // Reset input field

    await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + apiKey
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a cute cat that always refers to cat things and always asks questions back to maintain a conversation.' },
                { role: 'user', content: inputMessage }
            ],
            temperature: 0.7
        })
    })
    .then(response => response.json())
    .then(data => {      
        setMessages((m) => [...m, {
            id: m.length + 1,
            text: data.choices[0].message.content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'received'
        }]);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  return (
    <div className="messagesContainer">
      <h2>Conversation</h2>
      <div className="messageExchange">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
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
