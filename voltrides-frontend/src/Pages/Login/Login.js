import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Login/Login.css";
import noPasswordIcon from "../../Assets/Icons/no-password.svg";
import seePasswordIcon from "../../Assets/Icons/see-password.svg";
import Nav from '../../Components/Nav/Nav.js';
import Footer from '../../Components/Footer/Footer.js';
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

  const clearFields = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSignInClick = () => {
    setIsSignIn(true);
    clearFields();
  };

  const handleSignUpClick = () => {
    setIsSignIn(false);
    clearFields();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username.trim(),
      password: password.trim(),
    };

    try {
      const response = await loginUser(userData);

      if (response === "Login successful.") {
        setSuccessMessage("Welcome back!");
        setShowSuccessModal(true);

        // Save login state in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        // Redirect to the home page after 2 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/"); // Redirect to home
        }, 2000);
      } else {
        setErrorMessage(response || "Invalid username or password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.response?.data || "An error occurred while trying to log in.");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const userData = {
      username: username.trim(),
      password: password.trim(),
    };

    try {
      const response = await signUpUser(userData);

      if (response === "User registered successfully!") {
        setSuccessMessage("Congrats, you have created a new user!");
        setShowSuccessModal(true);

        // Redirect to the homepage after a short delay
        setTimeout(() => {
          navigate("/", { state: { loggedIn: true, showProfile: true } });
        }, 3000);
      } else {
        setErrorMessage("Failed to sign up. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage(error.response?.data || "An error occurred during sign-up.");
    }
  };

  return (
    <>
      <Nav />
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
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <img
                src={showConfirmPassword ? seePasswordIcon : noPasswordIcon}
                alt="toggle visibility"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;
