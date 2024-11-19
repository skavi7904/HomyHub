import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { Person, Home, Phone, CheckCircle } from "@mui/icons-material";

const AllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);

  const getAllBooking = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getallbookings",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setAllBookings(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch bookings.");
    }
  };

  useEffect(() => {
    getAllBooking();
  }, []);

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        color="primary"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem" },
          marginBottom: { xs: 2, sm: 3 },
        }}
      >
        All Bookings
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 8,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Table
          sx={{
            minWidth: 300,
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
          aria-label="responsive table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: { xs: "0.75rem", sm: "1rem" },
                }}
              >
                Booking ID
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: { xs: "0.75rem", sm: "1rem" },
                }}
                align="center"
              >
                Owner ID
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: { xs: "0.75rem", sm: "1rem" },
                }}
                align="center"
              >
                Property ID
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: { xs: "0.75rem", sm: "1rem" },
                }}
                align="center"
              >
                Tenant ID
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: { xs: "0.75rem", sm: "1rem" },
                }}
                align="center"
              >
                Tenant Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: { xs: "0.75rem", sm: "1rem" },
                }}
                align="center"
              >
                Tenant Contact
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: { xs: "0.75rem", sm: "1rem" },
                }}
                align="center"
              >
                Booking Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBookings.map((booking, index) => (
              <TableRow
                key={booking._id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#f1f8ff" },
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
              >
                <TableCell component="th" scope="row">
                  {booking._id}
                </TableCell>
                <TableCell align="center">
                  <Person
                    fontSize="small"
                    sx={{ color: "#1976d2", marginRight: 0.5 }}
                  />
                  {booking.ownerID}
                </TableCell>
                <TableCell align="center">
                  <Home
                    fontSize="small"
                    sx={{ color: "#2e7d32", marginRight: 0.5 }}
                  />
                  {booking.propertyId}
                </TableCell>
                <TableCell align="center">
                  <Person
                    fontSize="small"
                    sx={{ color: "#9c27b0", marginRight: 0.5 }}
                  />
                  {booking.userID}
                </TableCell>
                <TableCell align="center">{booking.userName}</TableCell>
                <TableCell align="center">
                  <Phone
                    fontSize="small"
                    sx={{ color: "#d84315", marginRight: 0.5 }}
                  />
                  {booking.phone}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={booking.bookingStatus}
                    color={
                      booking.bookingStatus === "Confirmed"
                        ? "success"
                        : "error"
                    }
                    icon={
                      <CheckCircle
                        sx={{
                          color:
                            booking.bookingStatus === "Confirmed"
                              ? "green"
                              : "red",
                        }}
                      />
                    }
                    size="small"
                    sx={{
                      fontWeight: "bold",
                      padding: "0 8px",
                      color: "#fff",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllBookings;
