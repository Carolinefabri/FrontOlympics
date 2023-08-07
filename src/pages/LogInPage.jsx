import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5005/user/login", {
        email,
        password,
      });

      const { token, user } = data; // Destructure the token and user data from the response

      // Store the token and user data in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user)); // Convert user object to string before saving

      // Redirect to a different page after successful login
      nav('/admin');

    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.error);
    }
  };

  return (
    <div>
      <NavBar /> 
      <div>
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LogIn;
