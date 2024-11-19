import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Modal,
  Carousel,
  Col,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { message } from "antd";
import {
  MdLocationOn,
  MdOutlineContactPhone,
  MdOutlineHome,
  MdAdUnits,
} from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";

const AllPropertiesCards = ({ loggedIn }) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [filterPropertyType, setPropertyType] = useState("");
  const [filterPropertyAdType, setPropertyAdType] = useState("");
  const [filterPropertyAddress, setPropertyAddress] = useState("");
  const [propertyOpen, setPropertyOpen] = useState(null);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phone: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleClose = () => setShow(false);

  const handleShow = (propertyId) => {
    setPropertyOpen(propertyId);
    setShow(true);
  };

  const getAllProperties = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/user/getAllProperties"
      );
      setAllProperties(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (status, propertyId, ownerId) => {
    try {
      await axios
        .post(
          `http://localhost:8000/api/user/bookinghandle/${propertyId}`,
          { userDetails, status, ownerId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);
            handleClose();
          } else {
            message.error(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const filteredProperties = allProperties
    .filter(
      (property) =>
        filterPropertyAddress === "" ||
        property.propertyAddress.includes(filterPropertyAddress)
    )
    .filter(
      (property) =>
        filterPropertyAdType === "" ||
        property.propertyAdType
          .toLowerCase()
          .includes(filterPropertyAdType.toLowerCase())
    )
    .filter(
      (property) =>
        filterPropertyType === "" ||
        property.propertyType
          .toLowerCase()
          .includes(filterPropertyType.toLowerCase())
    );

  return (
    <>
      <div className="mt-4 filter-container text-center">
        <p className="mt-3">Filter By:</p>
        <input
          type="text"
          placeholder="Address"
          value={filterPropertyAddress}
          onChange={(e) => setPropertyAddress(e.target.value)}
        />
        <select
          value={filterPropertyAdType}
          onChange={(e) => setPropertyAdType(e.target.value)}
        >
          <option value="">All Ad Types</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <select
          value={filterPropertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="commercial">Commercial</option>
          <option value="land/plot">Land/Plot</option>
          <option value="residential">Residential</option>
        </select>
      </div>
      <div className="d-flex flex-wrap mt-5">
        {filteredProperties && filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Card
              border="dark"
              key={property._id}
              className="m-3"
              style={{ width: "17rem" }}
            >
              <Card.Img
                variant="top"
                src={`http://localhost:8000${property.propertyImage[0].path}`}
                alt="Property"
              />
              <Card.Body>
                <Card.Title className="text-truncate">
                  <MdLocationOn /> {property.propertyAddress}
                </Card.Title>
                <Card.Text>
                  <strong>
                    <MdOutlineHome /> Type:
                  </strong>{" "}
                  {property.propertyType} <br />
                  <strong>
                    <MdAdUnits /> Ad:
                  </strong>{" "}
                  {property.propertyAdType} <br />
                  {loggedIn && (
                    <>
                      <strong>
                        <MdOutlineContactPhone /> Contact:
                      </strong>{" "}
                      {property.ownerContact} <br />
                      <strong>Status:</strong> {property.isAvailable} <br />
                      <strong>
                        <FaMoneyBillWave /> Amount:
                      </strong>{" "}
                      Rs. {property.propertyAmt} <br />
                    </>
                  )}
                </Card.Text>
                {loggedIn ? (
                  property.isAvailable === "Available" ? (
                    <>
                      <Button
                        onClick={() => handleShow(property._id)}
                        variant="dark"
                        className="w-100"
                      >
                        More Info
                      </Button>
                      <Modal
                        show={show && propertyOpen === property._id}
                        onHide={handleClose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Property Info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {property.propertyImage &&
                            property.propertyImage.length > 0 && (
                              <Carousel
                                activeIndex={index}
                                onSelect={handleSelect}
                              >
                                {property.propertyImage.map((image, idx) => (
                                  <Carousel.Item key={idx}>
                                    <img
                                      src={`http://localhost:8000${image.path}`}
                                      alt={`Image ${idx + 1}`}
                                      className="d-block w-100"
                                    />
                                  </Carousel.Item>
                                ))}
                              </Carousel>
                            )}
                          <div className="mt-3">
                            <div className="d-flex justify-content-between">
                              <div>
                                <p>
                                  <strong>
                                    <MdOutlineContactPhone /> Owner Contact:
                                  </strong>{" "}
                                  {property.ownerContact}
                                </p>
                                <p>
                                  <strong>Status:</strong>{" "}
                                  {property.isAvailable}
                                </p>
                                <p>
                                  <strong>
                                    <FaMoneyBillWave /> Amount:
                                  </strong>{" "}
                                  Rs. {property.propertyAmt}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <strong>
                                    <MdLocationOn /> Location:
                                  </strong>{" "}
                                  {property.propertyAddress}
                                </p>
                                <p>
                                  <strong>
                                    <MdOutlineHome /> Type:
                                  </strong>{" "}
                                  {property.propertyType}
                                </p>
                                <p>
                                  <strong>
                                    <MdAdUnits /> Ad:
                                  </strong>{" "}
                                  {property.propertyAdType}
                                </p>
                              </div>
                            </div>
                            <p>
                              <strong>Info:</strong> {property.additionalInfo}
                            </p>
                          </div>
                          <hr />
                          <Form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleBooking(
                                "pending",
                                property._id,
                                property.ownerId
                              );
                            }}
                          >
                            <h5>Your Details to Book</h5>
                            <Row className="mb-3">
                              <Form.Group as={Col} md="6">
                                <Form.Label>Full Name</Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    name="fullName"
                                    value={userDetails.fullName}
                                    onChange={handleChange}
                                  />
                                </InputGroup>
                              </Form.Group>
                              <Form.Group as={Col} md="6">
                                <Form.Label>Phone Number</Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="number"
                                    placeholder="Phone Number"
                                    required
                                    name="phone"
                                    value={userDetails.phone}
                                    onChange={handleChange}
                                  />
                                </InputGroup>
                              </Form.Group>
                            </Row>
                            <Button type="submit" variant="secondary">
                              Book Property
                            </Button>
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </>
                  ) : (
                    <p className="text-danger">Not Available</p>
                  )
                ) : (
                  <Link to="/login">
                    <Button variant="outline-dark" className="w-100">
                      Get Info
                    </Button>
                  </Link>
                )}
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No properties available at the moment.</p>
        )}
      </div>
    </>
  );
};

export default AllPropertiesCards;
