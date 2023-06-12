import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './login-page.css'; 
import { Link } from 'react-router-dom';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const history = useHistory();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      history.push('/');
    }
  }, [history]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const requestBody = {
      email: email,
      password: password
    };
    try {
    const response = await fetch('https://spare-parts-php.herokuapp.com/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
             
    if (response.ok) {
      const responseData = await response.json();
      const { message, user } = responseData;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userid', user.id);
      localStorage.setItem('email', user.email);
      localStorage.setItem('name', user.username);
      window.location.reload(true)
          
        }
      
      else {
        console.error();
      };
  }catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {message && <p>{message}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br></br>
          <Link to="/signup">Dont have an account? Sign Up</Link>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
