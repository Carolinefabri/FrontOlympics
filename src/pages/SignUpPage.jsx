import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("profilePicture", profilePicture);

    try {
      const res = await axios.post("http://localhost:5005/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Signup response:", res);
      nav("/login");
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  return (
    <div>
    <NavBar /> {/* Inclua a NavBar aqui */}
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <label>
          Profile Picture:
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </div>
  );
}

export default SignUp;
