import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const nav = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5005/auth/signup", {
        email,
        password,
        username,
      });
      console.log("here is the signup response", res);
      nav("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
      <label>
          Profile Picture:
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
                setProfilePicture(event.target.files[0]);
            }}
          />
        
        </label>
        <label>
          username:
          <input
            type="text"
            value={username}
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignUp;