import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import p1 from "../../images/p1.jpg";
import p2 from "../../images/p2.jpg";
import p3 from "../../images/p3.jpg";
import p4 from "../../images/p4.jpg";
import AllPropertiesCards from "../user/AllPropertiesCards";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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
              className="me-auto my-2 my-lg-0 "
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
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

      <div className="home-body">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          indicators={false}
          controls={true}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={p1}
              alt="Slide 1"
              style={{ height: "75vh", objectFit: "cover" }}
            />
            <Carousel.Caption className="d-none d-md-block">
              <h3>Discover Your Dream Home</h3>
              <p>Find the perfect property for your needs.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={p2}
              alt="Slide 2"
              style={{ height: "75vh", objectFit: "cover" }}
            />
            <Carousel.Caption className="d-none d-md-block">
              <h3>Luxury Living</h3>
              <p>Experience the best properties in the market.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={p3}
              alt="Slide 3"
              style={{ height: "75vh", objectFit: "cover" }}
            />
            <Carousel.Caption className="d-none d-md-block">
              <h3>Family-Friendly Neighborhoods</h3>
              <p>Safe and welcoming communities.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={p4}
              alt="Slide 4"
              style={{ height: "75vh", objectFit: "cover" }}
            />
            <Carousel.Caption className="d-none d-md-block">
              <h3>Modern Amenities</h3>
              <p>Properties equipped with the latest features.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="text-center">
        <h2>Explore Our Listings</h2>
        <p className="lead">
          Filter properties based on your preferences and find your perfect
          match.
        </p>
      </div>

      <Container className="mt-4">
        <AllPropertiesCards />
      </Container>
    </>
  );
};

export default Home;
