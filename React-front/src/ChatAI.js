import React, { useState } from 'react';
import './ChatAI.css';

const MAX_CONVERSATION_LENGTH = 10; // Maximum number of messages to retain in the conversation history

const ChatAI = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(''); // Reset error message

    try {
      const mergedMessage = [
        ...conversation
          .filter((item) => item.role === 'AI Assistance')
          .slice(-5)
          .map((item) => item.content),
        `User: ${message}`,
      ].join('\n');

      const response = await fetch('https://chatai-499-api.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: mergedMessage }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error); // Set error message if API response contains an error
      } else {
        // Update the conversation with the new response
        setConversation((prevConversation) => {
          const updatedConversation = [
            ...prevConversation,
            { role: 'User', content: message },
            { role: 'AI Assistance', content: data.message },
          ];

          return updatedConversation.slice(-MAX_CONVERSATION_LENGTH);
        });
      }

      setMessage('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.'); // Set generic error message for request failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">AI Car Maintenance Assistant</h1>
      </div>
      <div className="conversation">
        {conversation.map((item, index) => (
          <p
            key={index}
            className={`message ${item.role === 'AI Assistance' ? 'ai-assistance' : 'user-message'}`}
          >
            {item.role === 'AI Assistance' ? 'AI Assistance' : 'User'}: {item.content}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <textarea
            className="input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message"
            disabled={isLoading}
          />
          <button className="submit-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if it exists */}
    </div>
  );
};

export default ChatAI;