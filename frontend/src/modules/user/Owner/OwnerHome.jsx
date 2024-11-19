import React, { useState, useContext } from "react";
import { UserContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddProperty from "./AddProperty";
import AllProperties from "./AllProperties";
import AllBookings from "./AllBookings";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


const OwnerHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate(); 
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (!user) {
    return null;
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {drawerOpen && (
          <Drawer
            variant="persistent"
            open={drawerOpen}
            sx={{
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <List>
              <ListItem button onClick={() => setValue(0)}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Add Property" />
              </ListItem>
              <ListItem button onClick={() => setValue(1)}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="All Properties" />
              </ListItem>
              <ListItem button onClick={() => setValue(2)}>
                <ListItemIcon>
                  <BookmarksIcon />
                </ListItemIcon>
                <ListItemText primary="All Bookings" />
              </ListItem>
            </List>
          </Drawer>
        )}

        <Box
          sx={{
            flexGrow: 1,
            paddingLeft: drawerOpen ? 0 : 0,
            transition: "padding-left 0.3s",
          }}
        >
          <AppBar position="static" sx={{ backgroundColor: "#283593" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                HomyHub
              </Typography>
              <Typography variant="subtitle1" sx={{ marginRight: 3 }}>
                Hi {user.userData.name}
              </Typography>
              <Nav>
                <Link
                  onClick={handleLogOut}
                  to={"/"}
                  style={{ color: "white" }}
                >
                  Log Out
                </Link>
              </Nav>
            </Toolbar>
          </AppBar>

          <Box sx={{ width: "100%" }}>
            <CustomTabPanel value={value} index={0}>
              <AddProperty />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <AllProperties />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <AllBookings />
            </CustomTabPanel>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default OwnerHome;
