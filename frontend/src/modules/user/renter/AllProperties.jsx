import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const AllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/getallbookings`,
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
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h5"
        component="h2"
        align="center"
        style={{
          marginBottom: "20px",
          color: "dark-blue",
          fontWeight: "bolder",
          fontSize: "20",
        }}
      >
        All Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#e3f2fd" }}>
              <TableCell style={{ fontWeight: "bolder" }}>Booking ID</TableCell>
              <TableCell style={{ fontWeight: "bolder" }}>
                Property ID
              </TableCell>
              <TableCell style={{ fontWeight: "bolder" }} align="center">
                Tenant Name
              </TableCell>
              <TableCell style={{ fontWeight: "bolder" }} align="center">
                Phone
              </TableCell>
              <TableCell style={{ fontWeight: "bolder" }} align="center">
                Booking Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProperties.map((booking) => (
              <TableRow
                key={booking._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {booking._id}
                </TableCell>
                <TableCell>{booking.propertyId}</TableCell>
                <TableCell align="center">{booking.userName}</TableCell>
                <TableCell align="center">{booking.phone}</TableCell>
                <TableCell  align="center" style={{ color: "#ff9800",fontWeight:"bolder" }}>
                  {booking.bookingStatus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllProperty;
