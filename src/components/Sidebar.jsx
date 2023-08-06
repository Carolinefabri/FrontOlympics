import "../App.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Drawer } from "@mui/material";
import Button from "@material-ui/core/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { Avatar, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, List, Box } from "@mui/material/";

const Sidebar = () => {
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 320 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Profile", "Favoritos", "Community", "Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 4 === 0 ? (
                  <ManageAccountsOutlinedIcon />
                ) : index % 4 === 1 ? (
                  < FavoriteBorderOutlinedIcon />
                ) : index % 4 === 2 ? (
                  <>
                  <PeopleAltOutlinedIcon />
                  <Divider />
                </>
                ) : (
                  <LogoutOutlinedIcon />
                )}
              </ListItemIcon>

              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <nav className="NavBar">
      <React.Fragment key="right">
        <Button onClick={toggleDrawer("right", true)}>
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt="Remy Sharp"
            src="/static/images/avatar"
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
