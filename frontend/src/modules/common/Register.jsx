import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import RegisterImg from "../../images/Signup.jpg";
import { message } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password || !data.type) {
      message.warning("Please fill all fields");
      return;
    }
    axios
      .post("http://localhost:8000/api/user/register", data)
      .then((response) => {
        if (response.data.success) {
          message.success(response.data.message);
          navigate("/login");
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "#1A237E" }}>
        <Container fluid>
          <Navbar.Brand href="/" className="text-white">
            HomyHub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Link to="/" className="text-white">
                Home
              </Link>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        className="login-page"
        style={{
          height: "94.2vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          overflow: "hidden",
        }}
      >
        <Container
          component="main"
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: 2, md: 4 },
          }}
        >
          <Box
            className="login-card"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              backgroundColor: "#f4f6f9",
              borderRadius: 2,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: { xs: "none", md: "block" },
              }}
            >
              <img
                src={RegisterImg}
                alt="Register"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: { xs: 2, md: 4 },
              }}
            >
              <Avatar sx={{ bgcolor: "secondary.main", marginBottom: 2 }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <InputLabel>User Type</InputLabel>
                <Select
                  fullWidth
                  name="type"
                  value={data.type}
                  onChange={handleChange}
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  <MenuItem value="" disabled>
                    Select User
                  </MenuItem>
                  <MenuItem value="Renter">Renter</MenuItem>
                  <MenuItem value="Owner">Owner</MenuItem>
                </Select>
                <Box display="flex" alignItems="center" marginY={2}>
                  <Link to="/login" className="link" style={{ marginLeft: 5 }}>
                    Have an account?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ paddingY: 1.5, fontSize: "16px", marginBottom: 2 }}
                >
                  Sign Up
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Register;
