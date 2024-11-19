import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen"; 
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.email === "" ||
      data.password === "" ||
      data.confirmPassword === ""
    ) {
      alert("Please fill all fields");
    } else {
      if (data.password === data.confirmPassword) {
        await axios
          .post("http://localhost:8000/api/user/forgotpassword", data)
          .then((res) => {
            if (res.data.success) {
              alert("Your password has been changed!");
              navigate("/login");
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 401) {
              alert("User doesn't exist");
            }
            navigate("/register");
          });
      } else {
        alert("Passwords do not match");
      }
    }
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
            <Nav className="ms-auto" navbarScroll>
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
              <Link to="/login" className="nav-link text-white">
                Login
              </Link>
              <Link to="/register" className="nav-link text-white">
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        className="login-page"
        style={{
          height: "94.3vh",
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
                src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt="Forgot Password Illustration"
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
              <Avatar sx={{ m: 1, bgcolor: "#3f51b5" }}>
                <LockResetIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                display="flex"
                alignItems="center"
              >
                Reset Password
              </Typography>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  autoComplete="email"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box display="flex" alignItems="center" marginY={2}>
                  <Link
                    to="/register"
                    className="link"
                    style={{ marginLeft: 5 }}
                  >
                    Create an account
                  </Link>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#3f51b5",
                    "&:hover": { backgroundColor: "#303f9f" },
                  }}
                >
                  Change Password
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default ForgotPassword;
