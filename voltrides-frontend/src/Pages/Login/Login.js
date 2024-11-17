import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState('signIn');
  const [signInData, setSignInData] = useState({ username: '', password: '' });
  const [signUpData, setSignUpData] = useState({ username: '', password: '', confirmPassword: '' });

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In Data:', signInData);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Sign Up Data:', signUpData);
  };

  return (
    <div className="login-container">
      <div className="tabs">
        <button 
          className={activeTab === 'signIn' ? 'active' : ''}
          onClick={() => setActiveTab('signIn')}
        >
          Sign In
        </button>
        <button 
          className={activeTab === 'signUp' ? 'active' : ''}
          onClick={() => setActiveTab('signUp')}
        >
          Sign Up
        </button>
      </div>

      {activeTab === 'signIn' && (
        <form onSubmit={handleSignInSubmit} className="form">
          <h2>Sign In</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signInData.username}
            onChange={handleSignInChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signInData.password}
            onChange={handleSignInChange}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      )}

      {activeTab === 'signUp' && (
        <form onSubmit={handleSignUpSubmit} className="form">
          <h2>Sign Up</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signUpData.username}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signUpData.confirmPassword}
            onChange={handleSignUpChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default Login;
