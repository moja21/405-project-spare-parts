
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './login-page.css';
import { wait } from '@testing-library/user-event/dist/utils';

const SignUp = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '', 
    phoneNumber: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password === formData.passwordConfirm) {
      const requestBody = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phoneNumber,
      };

      try {
        const response = await fetch('https://spare-parts-php.herokuapp.com/signup.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log(data)
        if (data.ok) {
          setResponseMessage(data.message);
          setRegisteredUser(data);
          
        } else {
          
          setResponseMessage(data.message);
          setRegisteredUser(null);
          
          history.push('/login');
        }
      } catch (error) {
        console.error('Error:', error);
        setResponseMessage('An error occurred while registering the user.');
        setRegisteredUser(null);
      }
    } else {
      console.log('Passwords do not match');
      alert('Passwords do not match');
      return;
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>
          <a href="/signup">
            <span className="form-title">Create</span> an account
          </a>
        </h1>
        <label htmlFor="username" className="form--label">
          Username<span className="required"> *</span>
        </label>
        <input
          type="text"
          placeholder="Username"
          className="form--input"
          name="username"
          onChange={handleChange}
          value={formData.username}
          required
        />
        <label htmlFor="email" className="form--label">
          Email<span className="required"> *</span>
        </label>
        <input
          type="email"
          placeholder="Email address"
          className="form--input"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <label htmlFor="password" className="form--label">
          Password<span className="required"> *</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          className="form--input"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <label htmlFor="passwordConfirm" className="form--label">
          Confirm Password<span className="required"> *</span>
        </label>
        <input
          type="password"
          placeholder="Confirm password"
          className="form--input"
          name="passwordConfirm"
          onChange={handleChange}
          value={formData.passwordConfirm}
          required
        />
        <label htmlFor="phoneNumber" className="form--label">
          Phone<span className="required"> *</span>
        </label>
        <input
          type="tel"
          placeholder="Phone"
          className="form--input"
          name="phoneNumber"
          onChange={handleChange}
          value={formData.phoneNumber}
          pattern="[0-9]{4}[0-9]{3}[0-9]{3}"
          required
        />
        <button className="form--submit" type="submit">
          Sign up
        </button>
        <a className="registerLink" href="/login">
          Already got an account?
        </a>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
      {registeredUser && (
        <div className="registered-user">
          <h2>Registered User Details:</h2>
          <p>ID: {registeredUser.id}</p>
          <p>Username: {registeredUser.username}</p>
          <p>Email: {registeredUser.email}</p>
          <p>Phone Number: {registeredUser.phone_number}</p>
        </div>
      )}
    </div>
  );
};

export default SignUp;
