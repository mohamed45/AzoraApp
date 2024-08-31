import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ErrorModal from "../../Shared/components/UIElement/ErrorModal/ErrorModal";
import LoadingSpinner from "../../Shared/components/UIElement/LoadingSpinner/LoadingSpinner";
import Modal from "../../Shared/components/UIElement/Modal/Modal";
import './Auth.css'; 

const Auth = ({ isModal, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between login and signup
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoginMode && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const authData = { email, password };

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/${isLoginMode ? 'login' : 'signup'}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      
      login(); // Set authentication state to true
      setIsLoading(false);
      if (onClose) onClose(); // Close modal on success
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.message || "Something went wrong, please try again.");
    }
  };

  const errorHandle = () => {
    setError(null);
  };

  const content = (
    <div className="auth-form">
      <ErrorModal message={error} onClose={errorHandle} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form onSubmit={handleSubmit}>
        <h2>{isLoginMode ? "Login" : "Signup"}</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLoginMode && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="submit-btn">{isLoginMode ? "Login" : "Signup"}</button>
      </form>
      <p className="toggle-auth">
        {isLoginMode ? "Don't" : "Already"} have an account?{" "}
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setIsLoginMode((prevMode) => !prevMode)}
        >
          {isLoginMode ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </div>
  );

  if (isModal) {
    return <Modal isOpen={true} onClose={onClose}>{content}</Modal>;
  }

  return content;
};

export default Auth;
