import React from "react"
import { Navbar, Nav, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

import logo from "./Assets/logo.png"

const StaticNavbar = () => {
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Container>
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="d-flex align-items-center"
                >
                    <img
                        src={logo}
                        alt="Logo"
                        width="40"
                        height="40"
                        className="d-inline-block align-top me-2"
                    />
                    <span className="ms-2">
                        <b>L'IAME Vault</b>
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link
                            as={Link}
                            to="/signup"
                            style={{ color: "blue", marginRight: "10px" }}
                        >
                            Sign Up
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/login"
                            style={{ color: "blue" }}
                        >
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default StaticNavbar
