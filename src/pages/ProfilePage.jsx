import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";
import { AuthContext } from "../context/Auth.context";
import TextField from "@mui/material/TextField";
import {API_URL} from '../config/config.index';

const UserProfile = ({ user }) => {
  const [username, setUsername] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(user.image);
  console.log(user);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value.trim();
    setPassword(newPassword);
    setPassword(event.target.value);
  };

  const handleImageChange = (event) => {
    const newImage = event.target.value.trim();
    setImage(newImage);
    setImage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const url = `${API_URL}/user/edit/${user._id}`;
      const response = await axios.post(
        url,
        { userName: username, email: email, password: password, image: image },
        config
      );

      console.log("Account updated:", response.data);
    } catch (error) {
      console.error("An error occurred while updating the account:", error);
    }
  };

  // Handle delete account
  const nav = useNavigate();
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(token);
      if (!token) {
        console.error("No token found.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `${API_URL}/user/delete/${user._id}`,
        config

      );
      nav("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Stack direction="column">
          <div>
            
            <br />
            <form variant="standard" onSubmit={handleSubmit}>
              <label>
                Username:{" "}
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </label>
              <br />
              <label>
                Email:{" "}
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
              <br />
              <label>
                Password:{" "}
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </label>
              <br />
              
              <br />
              <Button variant="contained" type="submit">
                {" "}
                Update{" "}
              </Button>
              <br />
              <Button variant="outlined" onClick={() => handleDelete(user._id)}>
                {" "}
                Delete Account{" "}
              </Button>
            </form>
          </div>
        </Stack>
      </div>
    </div>
  );
};

const LoadingWrapper = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return null;
  }
  return <UserProfile user={user} />;
};

export default LoadingWrapper;
