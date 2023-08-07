import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button, Avatar, Stack } from "@mui/material";

const UserProfile = () => {
  //Handle update account
  const handleUpdate = () => {
    try {
      console.log("Update account");

      const userData = {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        image: "image",
      };

      const cache = [];

      const replacer = (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (cache.includes(value)) {
            return null;
          }
          cache.push(value);
        }
        return value;
      };

      const jsonString = JSON.stringify(userData, replacer);

      console.log("API call successful.");
    } catch (error) {
      console.error("An error occurred while updating the account:", error);
    }
  };

  // Example usage:
  handleUpdate();

  // Handle delete account
  let userAccount = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    image: "image",
  };

  const handleDelete = () => {
    console.log("Delete account");

    userAccount = null;

    console.log("Account deleted successfully!");
  };

  handleDelete();

  if (userAccount === null) {
    console.log("Account has been deleted.");
  } else {
    console.log("Account still exists.");
  }

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
        <Stack direction="column" spacing={2}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
          </div>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <TextField
              id="input-with-icon-textfield"
              label="Usuarname"
              variant="standard"
            />
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
              <Input id="input-with-icon-adornment" />
            </FormControl>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
          </Box>
          <FormControl variant="standard">
            <Button variant="contained" onClick={handleUpdate}>
              Update Account
            </Button>
          </FormControl>
          <Button variant="outlined" onClick={handleDelete}>
            Delete Account
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default UserProfile;
