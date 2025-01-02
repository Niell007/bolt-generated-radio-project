import React, { useState } from 'react';

    function Chatbot() {
      const [messages, setMessages] = useState<
        { sender: string; text: string }[]
      >([]);
      const [newMessage, setNewMessage] = useState('');

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
      };

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newMessage.trim() === '') return;

        const userMessage = { sender: 'user', text: newMessage };
        setMessages([...messages, userMessage]);
        setNewMessage('');

        try {
          const response = await fetch('/ai/generate-content', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: newMessage }),
          });

          if (response.ok) {
            const data = await response.json();
            const botMessage = { sender: 'bot', text: data.result };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          } else {
            console.error('Failed to get bot response');
            const botMessage = {
              sender: 'bot',
              text: 'Sorry, I could not process your request.',
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          }
        } catch (error) {
          console.error('Error:', error);
          const botMessage = {
            sender: 'bot',
            text: 'Sorry, an error occurred.',
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      };

      return (
        <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-purple-accent">Live Chat</h2>
          <div className="overflow-y-auto h-64">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded-md ${
                  message.sender === 'user'
                    ? 'bg-purple-accent text-white'
                    : 'bg-purple-secondary text-light-text'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="mt-4 flex">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Enter your message"
              className="flex-grow p-2 border border-purple-accent rounded-l-md text-light-text bg-purple-secondary"
            />
            <button
              type="submit"
              className="bg-purple-accent text-white p-2 rounded-r-md"
            >
              Send
            </button>
          </form>
        </div>
      );
    }

    export default Chatbot;
