import React, { useState } from "react";
import { signIn, signUp } from "../../firebase/authFunctions";

import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await signUp(email, password);
      onLogin(userCredential.user);
    } catch (error) {
      console.error(`Error signing up: ${error.message}`);
    }
  };
  const handleSignIn = async () => {
    try {
      const userCredential = await signIn(email, password);
      onLogin(userCredential.user);
    } catch (error) {
      console.error(`Error signing in: ${error.message}`);
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <input
          className="email-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleSignUp}>
          Sign Up
        </button>
        <button className="login-button" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
