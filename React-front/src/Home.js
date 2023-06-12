import React from 'react';
import ChatAI from './ChatAI';

const Home = () => {
  return (
    
    <div className="Home">
      <h2>Welcome To our website</h2>
      <br></br>
      <p className="home-description">Discover our smart car services, including damage detection 
        and ChatAI expert advicer. Explore our marketplace for car parts, where you can view orders from other users and
         create custom orders.
        experience the convenience and reliability of our services. 
        Visit our website today and unlock a world of possibilities for your vehicle </p>
      <br></br>
      <br></br>
      <p className="ai-assistant-description">You can try our AI assistant here. It will help you understand what you need and what price you can get it.</p>
      <ChatAI />
      <div className="banner"></div>
    </div>
    
  );
};

export default Home;