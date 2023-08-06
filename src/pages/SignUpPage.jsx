import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    profilePicture: null, // Inicialmente, sem imagem selecionada
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; // Pega o primeiro arquivo da lista
    setFormData((prevState) => ({
      ...prevState,
      profilePicture: imageFile,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { userName, email, password, profilePicture } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append("userName", userName);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("profilePicture", profilePicture);

      const response = await axios.post(
        "http://localhost:5005/user/signup",
        formDataToSend
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <NavBar />
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          onChange={handleImageChange}
        />
      </div>
      {formData.profilePicture && (
        <img
          src={URL.createObjectURL(formData.profilePicture)}
          alt="Profile Picture"
          style={{ width: "200px", height: "200px" }}
        />
      )}
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};


export default SignUp;