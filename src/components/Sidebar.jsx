import "../App.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Drawer } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext } from "react";
import {
  Divider,
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
        {user && <p>{user.userName}</p>}
        {menuItems.map((text, index) => (
          <Link
            to={
              index === 0
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
                  {index % 3 === 0 ? (
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
      <React.Fragment key="right">
        {user && <span>{user.userName}</span>}
        <ul>
          {location.pathname !== "/favorites/64d20eb44a606b49bc394f01" && (
            <li>
              <Link to="/favorites/64d20eb44a606b49bc394f01">Favorites</Link>
            </li>
          )}
        </ul>
        <Button onClick={toggleDrawer("right", true)}>
          <Box
            component="img"
            sx={{
              borderRadius: "50%",
              height: 56,
              width: 56,
            }}
            alt="The house from the offer."
            src={user && <image>{user.image}</image>}
          />
        </Button>
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
