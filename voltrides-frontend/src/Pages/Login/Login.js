import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Login/Login.css";
import noPasswordIcon from "../../Assets/Icons/no-password.svg";
import seePasswordIcon from "../../Assets/Icons/see-password.svg";
import { loginUser, signUpUser } from "../../Services/api.js"; // Import API functions

const Login = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [passwordChecklist, setPasswordChecklist] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    number: false,
    match: false,
  });

  const clearFields = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setSuccessMessage("");
    setPasswordChecklist({
      length: false,
      uppercase: false,
      lowercase: false,
      specialChar: false,
      number: false,
      match: false,
    });
  };

  const handleSignInClick = () => {
    setIsSignIn(true);
    clearFields();
  };

  const handleSignUpClick = () => {
    setIsSignIn(false);
    clearFields();
  };

  const validatePassword = (pass, confirmPass) => {
    const checklist = {
      length: pass.length >= 7,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      number: /[0-9]/.test(pass),
      match: pass === confirmPass && pass !== "",
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
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!Object.values(passwordChecklist).every((check) => check)) {
      setErrorMessage("Please meet all password requirements");
      return;
    }

    const userData = {
      username: username.trim(),
      password: password,
    };

    try {
      const response = await signUpUser(userData);

      if (response === "User registered successfully!") {
        setSuccessMessage("Congrats, you have created a new user!");
        setShowSuccessModal(true);

        // Redirect to the homepage after a short delay and pass state
        setTimeout(() => {
          navigate("/", { state: { loggedIn: true, showProfile: true } });
        }, 3000);
      } else {
        setErrorMessage("Failed to sign up. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage("An error occurred during sign-up.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username.trim(),
      password: password.trim(),
    };

    try {
      const response = await loginUser(userData);

      if (response) {
        setSuccessMessage("Login successful!");
        setShowSuccessModal(true);

        // Redirect to the homepage after a short delay and pass state
        setTimeout(() => {
          navigate("/", { state: { loggedIn: true, showProfile: true } });
        }, 3000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-message">
            <h2>{isSignIn ? "Welcome!" : "Congratulations!"}</h2>
            <p>
              {isSignIn
                ? "You have successfully logged in!"
                : "Your account has been successfully created!"}
            </p>
          </div>
        </div>
      )}

      <div className={`tabs ${showSuccessModal ? "blur" : ""}`}>
        <button className={isSignIn ? "active" : ""} onClick={handleSignInClick}>
          Sign In
        </button>
        <button className={!isSignIn ? "active" : ""} onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>

      {isSignIn ? (
        <form className={`form ${showSuccessModal ? "blur" : ""}`} onSubmit={handleLoginSubmit}>
          <h2>Sign In</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={showPassword ? seePasswordIcon : noPasswordIcon}
              alt="toggle visibility"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Sign In</button>
        </form>
      ) : (
        <form className={`form ${showSuccessModal ? "blur" : ""}`} onSubmit={handleSignUpSubmit}>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
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
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <img
              src={showConfirmPassword ? seePasswordIcon : noPasswordIcon}
              alt="toggle visibility"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          <div className="password-checklist">
            <p className={passwordChecklist.length ? "valid" : "invalid"}>At least 7 characters</p>
            <p className={passwordChecklist.uppercase ? "valid" : "invalid"}>One uppercase letter</p>
            <p className={passwordChecklist.lowercase ? "valid" : "invalid"}>One lowercase letter</p>
            <p className={passwordChecklist.specialChar ? "valid" : "invalid"}>One special character</p>
            <p className={passwordChecklist.number ? "valid" : "invalid"}>One number</p>
            <p className={passwordChecklist.match ? "valid" : "invalid"}>Passwords match</p>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default Login;
