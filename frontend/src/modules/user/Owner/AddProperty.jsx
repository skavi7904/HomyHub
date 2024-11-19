import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";
import "./AddProperty.css"; 

function AddProperty() {
  const [image, setImage] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: "residential",
    propertyAdType: "rent",
    propertyAddress: "",
    ownerContact: "",
    propertyAmt: 0,
    additionalInfo: "",
  });

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImage(files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      propertyImages: image,
    }));
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(propertyDetails).forEach((key) => {
      formData.append(key, propertyDetails[key]);
    });

    if (image) {
      for (let i = 0; i < image.length; i++) {
        formData.append("propertyImages", image[i]);
      }
    }

    axios
      .post("http://localhost:8000/api/owner/postproperty", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        res.data.success
          ? message.success(res.data.message)
          : message.error(res.data.message);
      })
      .catch((error) => {
        console.error("Error adding property:", error);
      });
  };

  return (
    <Container className="add-property-container p-5 shadow rounded">
      <h2 className="text-center mb-4">Add Your Property</h2>
      <Form onSubmit={handleSubmit} className="property-form">
        <Row className="gy-4">
          <Col md={6}>
            <Form.Label>Property Type</Form.Label>
            <Form.Select
              name="propertyType"
              value={propertyDetails.propertyType}
              onChange={handleChange}
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land/plot">Land/Plot</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Label>Advertisement Type</Form.Label>
            <Form.Select
              name="propertyAdType"
              value={propertyDetails.propertyAdType}
              onChange={handleChange}
            >
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="gy-4 mt-3">
          <Col md={12}>
            <Form.Label>Property Address</Form.Label>
            <Form.Control
              type="text"
              name="propertyAddress"
              placeholder="Enter full address"
              value={propertyDetails.propertyAddress}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="gy-4 mt-3">
          <Col md={6}>
            <Form.Label>Owner Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="ownerContact"
              placeholder="Enter contact number"
              value={propertyDetails.ownerContact}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Property Amount</Form.Label>
            <Form.Control
              type="number"
              name="propertyAmt"
              placeholder="Enter property amount"
              value={propertyDetails.propertyAmt}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="gy-4 mt-3">
          <Col md={12}>
            <Form.Label>Property Images</Form.Label>
            <Form.Control
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </Col>
        </Row>
        <Row className="gy-4 mt-3">
          <Col md={12}>
            <Form.Label>Additional Information</Form.Label>
            <Form.Control
              as="textarea"
              name="additionalInfo"
              placeholder="Provide more details about the property"
              value={propertyDetails.additionalInfo}
              onChange={handleChange}
              rows={3}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-end mt-4">
          <Button type="submit" className="submit-btn" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddProperty;
