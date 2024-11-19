import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import {
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeWorkIcon from "@mui/icons-material/HomeWork"; 

const AllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getallproperties",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#1E88E5" }}>
        <Toolbar>
          <HomeWorkIcon sx={{ mr: 2 }} /> 
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All Properties
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          {allProperties.map((property) => {
            const propertyImage = property.propertyImage?.[0]?.path
              ? `http://localhost:8000${property.propertyImage[0].path}`
              : "https://via.placeholder.com/150";

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={property._id || property.ownerId}
              >
                <Paper elevation={3}>
                  <Card
                    sx={{
                      padding: 1,
                      borderRadius: 3,
                      backgroundColor: "#f8f8f8",
                      maxHeight: "none",
                      overflow: "visible",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.3s",
                      ":hover": { transform: "scale(1.05)", boxShadow: 20 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={propertyImage}
                      alt="Property Image"
                      sx={{
                        borderRadius: "8px",
                        objectFit: "cover",
                        marginBottom: 1,
                      }}
                    />
                    <CardContent sx={{ padding: 1 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          color: "#2c3e50",
                          fontSize: "1rem",
                        }}
                      >
                        <LocationOnIcon
                          sx={{ verticalAlign: "middle", marginRight: 1 }}
                        />
                        {property.propertyAddress}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          color: "#2980b9",
                          fontSize: "0.9rem",
                        }}
                      >
                        <CategoryIcon
                          sx={{ verticalAlign: "middle", marginRight: 1 }}
                        />
                        <b>Type:</b> {property.propertyType}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          color: "#8e44ad",
                          fontSize: "0.9rem",
                        }}
                      >
                        <CategoryIcon
                          sx={{ verticalAlign: "middle", marginRight: 1 }}
                        />
                        <b>Ad Type:</b> {property.propertyAdType}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          color: "#e74c3c",
                          fontSize: "0.9rem",
                        }}
                      >
                        <AttachMoneyIcon
                          sx={{ verticalAlign: "middle", marginRight: 1 }}
                        />
                        <b>Price:</b> Rs. {property.propertyAmt}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          color: "#f39c12",
                          fontSize: "0.9rem",
                        }}
                      >
                        <PhoneIcon
                          sx={{ verticalAlign: "middle", marginRight: 1 }}
                        />
                        <b>Owner Contact:</b> {property.ownerContact}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          color: "#16a085",
                          fontSize: "0.9rem",
                        }}
                      >
                        <AccountCircleIcon
                          sx={{ verticalAlign: "middle", marginRight: 1 }}
                        />
                        <b>Owner ID:</b> {property.ownerId}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          color: "#2c3e50",
                          fontSize: "0.9rem",
                        }}
                      >
                        <b>Property ID:</b> {property._id || "N/A"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default AllProperty;
