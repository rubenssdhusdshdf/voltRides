import React, { useState } from 'react';
import '../Login/Login.css';
import noPasswordIcon from '../../Assets/Icons/no-password.svg';
import seePasswordIcon from '../../Assets/Icons/see-password.svg';
import { signUpUser } from '../../Services/api.js';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordChecklist, setPasswordChecklist] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    number: false,
    match: false,
  });

  // Switch to Sign In tab
  const handleSignInClick = () => {
    setIsSignIn(true);
    clearFields();
  };

  // Switch to Sign Up tab
  const handleSignUpClick = () => {
    setIsSignIn(false);
    clearFields();
  };

  // Clear all input fields and messages
  const clearFields = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setSuccessMessage('');
    setPasswordChecklist({
      length: false,
      uppercase: false,
      lowercase: false,
      specialChar: false,
      number: false,
      match: false,
    });
  };

  // Password validation function
  const validatePassword = (pass, confirmPass) => {
    const checklist = {
      length: pass.length >= 7,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      number: /[0-9]/.test(pass),
      match: pass === confirmPass && pass !== '',
    };
    setPasswordChecklist(checklist);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePassword(password, newConfirmPassword);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
  
    if (!passwordChecklist.match) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    if (!Object.values(passwordChecklist).every((check) => check)) {
      setErrorMessage('Please meet all password requirements');
      return;
    }
  
    setErrorMessage('');
    setSuccessMessage('');
  
    const userData = {
      username: username.trim(),
      password: password,
    };
  
    try {
      // Call the backend API to register the user
      const response = await signUpUser(userData);
  
      // If the response is successful
      if (response) {
        setSuccessMessage('🎉 Congratulations, you have created your user and password!');
        clearFields();
  
        // Automatically redirect to the Sign In page after 3 seconds
        setTimeout(() => {
          setIsSignIn(true);
        }, 3000);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
  
      // Handle different types of errors
      if (error.message.includes('Network Error')) {
        setErrorMessage('⚠️ The connection to the server is not working. Please check your connection.');
      } else if (error.response && error.response.status === 400) {
        setErrorMessage('❌ Username already exists. Please try a different one.');
      } else {
        setErrorMessage('❌ Failed to sign up. Please try again.');
      }
    }
  };
  

  return (
    <div className="login-container">
      <div className="tabs">
        <button className={isSignIn ? 'active' : ''} onClick={handleSignInClick}>
          Sign In
        </button>
        <button className={!isSignIn ? 'active' : ''} onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>

      {/* Sign In Form */}
      {isSignIn ? (
        <form className="form">
          <h2>Sign In</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? seePasswordIcon : noPasswordIcon}
              alt="toggle visibility"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      ) : (
        // Sign Up Form
        <form className="form" onSubmit={handleSignUpSubmit}>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <img
              src={showPassword ? seePasswordIcon : noPasswordIcon}
              alt="toggle visibility"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="password-input">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <img
              src={showConfirmPassword ? seePasswordIcon : noPasswordIcon}
              alt="toggle visibility"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          <div className="password-checklist">
            <p className={passwordChecklist.length ? 'valid' : 'invalid'}>At least 7 characters</p>
            <p className={passwordChecklist.uppercase ? 'valid' : 'invalid'}>One uppercase letter</p>
            <p className={passwordChecklist.lowercase ? 'valid' : 'invalid'}>One lowercase letter</p>
            <p className={passwordChecklist.specialChar ? 'valid' : 'invalid'}>One special character</p>
            <p className={passwordChecklist.number ? 'valid' : 'invalid'}>One number</p>
            <p className={passwordChecklist.match ? 'valid' : 'invalid'}>Passwords match</p>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default Login;
