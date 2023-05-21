import React, { useState } from "react";
import "./style.css";
import instance from "../../api/instance";
import { useNavigate } from "react-router-dom";

const ExecutiveLogin = () => {
    const navigator = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    instance.post("/executive/login", { email, password }).then(({ data }) => {
      if (data) {
        localStorage.setItem('executiveId',data._id)
        localStorage.setItem('executiveName',data.name)
        navigator('/executive')
      } else {
        // Invalid credentials, display error message
        setError("Invalid username or password");
      }
    });
  };

  return (
    <div className="login-page-container">
      <p>Exicutive 1 = Email : rishad@gmail.com , Pass : 12345</p>
      <p>Exicutive 2 = Email : ajay@gmail.com , Pass : 12345</p>
      <h2 className="login-page-heading">Executive Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ExecutiveLogin;
