import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Card, Typography, Row, Col, Button, Tag } from "antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import "./AllBooking.css"; 
const { Title} = Typography;

const AllBooking = () => {
  const [allBookings, setAllBookings] = useState([]);

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/owner/getallbookings",
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
      message.error("Failed to fetch bookings. Please try again later.");
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  const handleStatus = async (bookingId, propertyId, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/owner/handlebookingstatus",
        { bookingId, propertyId, status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAllProperty();
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to update booking status.");
    }
  };

  return (
    <div className="all-property-container">
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        All Property Bookings
      </Title>
      <Row gutter={[16, 16]}>
        {allBookings.map((booking) => (
          <Col key={booking._id} xs={24} sm={12} md={8}>
            <Card
              title={`Booking ID: ${booking._id}`}
              bordered={false}
              className="booking-card"
            >
              <p>
                <UserOutlined /> <b>Tenant Name:</b> {booking.userName}
              </p>
              <p>
                <PhoneOutlined /> <b>Phone:</b> {booking.phone}
              </p>
              <p>
                <b>Property ID:</b> {booking.propertyId}
              </p>
              <p>
                <b>Status:</b>
                {booking.bookingStatus === "pending" ? (
                  <Tag color="orange">Pending</Tag>
                ) : (
                  <Tag color="green">Booked</Tag>
                )}
              </p>
              <Button
                type={
                  booking.bookingStatus === "pending" ? "primary" : "danger"
                }
                onClick={() =>
                  handleStatus(
                    booking._id,
                    booking.propertyId,
                    booking.bookingStatus === "pending" ? "booked" : "pending"
                  )
                }
                block
              >
                {booking.bookingStatus === "pending" ? "Approve" : "Revert"}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllBooking;
