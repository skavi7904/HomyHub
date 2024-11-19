import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import axios from "axios";
import { message } from "antd";
import { Box, InputAdornment } from "@mui/material";
import LoginImage from "../../images/Login.jpg"; 
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data?.email || !data?.password) {
      return alert("Please fill all fields");
    } else {
      axios
        .post("http://localhost:8000/api/user/login", data)
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));

            switch (isLoggedIn.type) {
              case "Admin":
                navigate("/adminhome");
                break;
              case "Renter":
                navigate("/renterhome");
                break;
              case "Owner":
                if (isLoggedIn.granted === "ungranted") {
                  message.error(
                    "Your account is not yet confirmed by the admin"
                  );
                } else {
                  navigate("/ownerhome");
                }
                break;
              default:
                navigate("/login");
                break;
            }
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert("User doesn't exist");
          }
          navigate("/login");
        });
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "#1A237E" }}>
        <Container fluid>
          <Navbar.Brand href="/" className="text-white">
            HomyHub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            />
            <Nav>
              <Link to={"/"} className="text-white">
                Home
              </Link>
              <Link to={"/login"} className="text-white">
                Login
              </Link>
              <Link to={"/register"} className="text-white">
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        className="login-page"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Container
          component="main"
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            className="login-card"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              backgroundColor: "#f4f6f9",
              borderRadius: 2,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
              padding: { xs: 2, sm: 4 },
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "50%" },
                display: { xs: "none", sm: "block" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={LoginImage}
                alt="Login"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box
              sx={{
                width: { xs: "100%", sm: "50%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: { xs: 2, sm: 4 },
              }}
            >
              <Avatar sx={{ bgcolor: "#3f51b5", marginBottom: 2 }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" gutterBottom>
                Sign In
              </Typography>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Email Address"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginY={2}
                >
                  <Link to="/forgotpassword" className="link">
                    Forgot password?
                  </Link>
                  <Link to="/register" className="link">
                    Create an account
                  </Link>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ paddingY: 1.5, fontSize: "16px", marginBottom: 2 }}
                >
                  Sign In
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Login;
