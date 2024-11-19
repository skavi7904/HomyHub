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
import { Box, Typography, Toolbar, AppBar, Chip, Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getallusers",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setAllUser(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (userid, status) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/handlestatus",
        { userid, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        getAllUser();
        message.success(`Status updated to ${status}`);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to update status");
    }
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#1E88E5" }}>
        <Toolbar>
          <GroupIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All Users
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 4 }}>
        

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
                <TableCell>
                  <b>User ID</b>
                </TableCell>
                <TableCell align="center">
                  <b>Name</b>
                </TableCell>
                <TableCell align="center">
                  <b>Email</b>
                </TableCell>
                <TableCell align="center">
                  <b>Type</b>
                </TableCell>
                <TableCell align="center">
                  <b>Granted Status</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUser.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#F9F9F9" } }}
                >
                  <TableCell>{user._id}</TableCell>
                  <TableCell align="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar sx={{ bgcolor: "#4CAF50", marginRight: 1 }}>
                        {user.name[0].toUpperCase()}
                      </Avatar>
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    {user.type === "Admin" ? (
                      <Chip
                        icon={<AdminPanelSettingsIcon />}
                        label="Admin"
                        color="primary"
                        size="small"
                        variant="outlined"
                      />
                    ) : user.type === "Owner" ? (
                      <Chip
                        icon={<AssignmentIndIcon />}
                        label="Owner"
                        color="secondary"
                        size="small"
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        icon={<VerifiedUserIcon />}
                        label="Renter"
                        color="default"
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {user.type === "Owner" ? (
                      <Chip
                        label={user.granted}
                        color={user.granted === "granted" ? "success" : "error"}
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          handleStatus(
                            user._id,
                            user.granted === "granted" ? "ungranted" : "granted"
                          )
                        }
                        sx={{ cursor: "pointer" }}
                      />
                    ) : (
                      <Chip
                      style={{display:"none"}}  
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AllUsers;
