import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {API_URL} from '../config/config.index';


const AuthContext = createContext();

const AuthContextWrapper = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticateUser = async () => {
    const gotToken = localStorage.getItem("authToken");
    if (gotToken) {
      try {
        const { data } = await axios.get( `${API_URL}/user/verify`, {  
          headers: { authorization: `Bearer ${gotToken}` },
        });
        console.log("response from verify route", data);
        setUser(data.currentUser);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("there was an error on the authenticate user", err);
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        isLoading,
        isLoggedIn,
        user,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
