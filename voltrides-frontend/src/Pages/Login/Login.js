import React, { useState } from 'react';
import '../Login/Login.css';
import noPasswordIcon from '../../Assets/Icons/no-password.svg';
import seePasswordIcon from '../../Assets/Icons/see-password.svg';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignInClick = () => {
    setIsSignIn(true);
    clearFields();
  };

  const handleSignUpClick = () => {
    setIsSignIn(false);
    clearFields();
  };

  const clearFields = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  const validatePassword = (password) => {
    return {
      lengthCheck: password.length >= 7,
      specialCharCheck: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      upperCaseCheck: /[A-Z]/.test(password),
      lowerCaseCheck: /[a-z]/.test(password),
      numberCheck: /[0-9]/.test(password),
    };
  };

  const passwordCriteria = validatePassword(password);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!Object.values(passwordCriteria).every(Boolean)) {
      setErrorMessage('Password does not meet all criteria');
      return;
    }

    setErrorMessage('');
    console.log('Sign up successful:', { username, password });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in successful:', { username, password });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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

      {isSignIn ? (
        <form className="form" onSubmit={handleSignInSubmit}>
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
              alt="Toggle Password"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      ) : (
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? seePasswordIcon : noPasswordIcon}
              alt="Toggle Password"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="password-input">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <img
              src={showConfirmPassword ? seePasswordIcon : noPasswordIcon}
              alt="Toggle Confirm Password"
              className="toggle-password"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="password-checklist">
            <p className={passwordCriteria.lengthCheck ? 'valid' : 'invalid'}>• At least 7 characters</p>
            <p className={passwordCriteria.specialCharCheck ? 'valid' : 'invalid'}>• At least one special character</p>
            <p className={passwordCriteria.upperCaseCheck ? 'valid' : 'invalid'}>• At least one uppercase letter</p>
            <p className={passwordCriteria.lowerCaseCheck ? 'valid' : 'invalid'}>• At least one lowercase letter</p>
            <p className={passwordCriteria.numberCheck ? 'valid' : 'invalid'}>• At least one number</p>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default Login;
