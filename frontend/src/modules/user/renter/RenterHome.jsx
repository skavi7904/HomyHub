import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import { UserContext } from "../../../App";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AllPropertiesCards from "../AllPropertiesCards";
import AllProperty from "./AllProperties";
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const RenterHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);
   const [drawerOpen, setDrawerOpen] = useState(true);
 

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!user) {
    return null;
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
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
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="All Properties" />
            </ListItem>
            <ListItem button onClick={() => setValue(1)}>
              <ListItemIcon>
                <BookmarksIcon />
              </ListItemIcon>
              <ListItemText primary="Booking History" />
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
              <Link onClick={handleLogOut} to={"/"} style={{ color: "white" }}>
                Log Out
              </Link>
            </Nav>
          </Toolbar>
        </AppBar>

        <Box sx={{ width: "100%" }}>
          <CustomTabPanel value={value} index={0}>
            <AllPropertiesCards loggedIn={user.userLoggedIn} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AllProperty />
          </CustomTabPanel>
          
        </Box>
      </Box>
    </div>
  );
};

export default RenterHome;
