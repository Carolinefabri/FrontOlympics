import "../App.css";
import "../index.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Drawer } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import sportsoulImage from "/images/sportsoul1.png";


import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Box,
  Button,
} from "@mui/material/";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [state, setState] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const menuItems = ["Profile", "Community", "Logout"];

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 320 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {user && <p className="userName">{user.userName}</p>}
        {menuItems.map((text, index) => (
          <Link
            to={
              index % 2 === 0
                ? "/Profile"
                : index === 1
                ? "/community"
                : index === 2
                ? "/"
                : "/"
            }
            key={text}
          >
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <ManageAccountsOutlinedIcon />
                  ) : index % 3 === 1 ? (
                    <PeopleAltOutlinedIcon />
                  ) : index % 3 === 2 ? (
                    <LogoutOutlinedIcon />
                  ) : null}
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );


  return (
    <nav className="Sidebar">
      <img className="sportsoulImage1" src={sportsoulImage} alt="sportsoulImage"  /> 
      <React.Fragment key="right">
        {user && (
          <>
            <ul>
              {location.pathname !== `/favorites/64d4c3e9ae27777ece81906c` && (
                <li>
                  <Link to={`/favorites/64d4c3e9ae27777ece81906c`}>Favorites</Link>
                </li>
              )}
              {location.pathname !== '/allsports' && (
            <li><Link to="/allsports">All Sports</Link></li>
            )}
               {location.pathname !== '/admin' && (
            <li><Link to="/admin">Admin</Link></li>
            )}
            </ul>
            <Button onClick={toggleDrawer("right", true)}>
             
            <WidgetsOutlinedIcon/>

            </Button>
          </>
        )}

        <Drawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </nav>
  );
};

export default Sidebar;