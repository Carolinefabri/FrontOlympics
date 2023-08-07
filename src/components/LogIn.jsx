import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Don't forget to import useNavigate

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const nav = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5005/auth/login", {
        email,
        password,
      });

      // Assuming the backend returns the user object after successful login
      // You can store the user data in state or a context if needed
      console.log("User data after login:", data.user);

      // Redirect to a different page after successful login
      nav('/AllSports'); 

    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
    }
  };

  return (
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
  );
}

export default LogIn;
