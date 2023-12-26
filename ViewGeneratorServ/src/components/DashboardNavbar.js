import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import logo from "./Assets/logo.png";
import profilePic from "./Assets/profilepic.png";

const DashboardNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            marginBottom = "40px"
            className="d-inline-block align-top"
          />{" "}
          <b>&nbsp;ImageGallery</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#usage-monitoring" style={{ color: "white", marginRight: "10px" }}>Usage Monitoring</Nav.Link>
            <Nav.Link href="#about-us" style={{ color: "white" }}>About Us</Nav.Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Nav>
          <Nav>
            <Nav.Link href="#profile" style={{ marginRight: "15px" }}>
              <img
                src={profilePic}
                alt="Profile"
                width="40"
                height="40"
                className="d-inline-block align-top rounded-circle"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;