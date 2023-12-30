import React, { useEffect } from "react"
import { Navbar, Nav, Container } from "react-bootstrap"
import axios from "axios"
import logo from "./Assets/logo.png"

const DashboardNavbar = (props) => {
    const { name } = props
    const logout = async () => {
        await axios.get("http://localhost:3000/logout")
    }

    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={logo}
                        alt="Logo"
                        width="50"
                        height="50"
                        marginBottom="40px"
                        className="d-inline-block align-top"
                    />{" "}
                    <b style={{ paddingTop: "20px", fontSize: "25px" }}>
                        &nbsp;ImageGallery
                    </b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        {/* parameter will be passed like this */}
                        {/* <Nav.Link as={Link} to={`/home/${id}`} style={{ color: "black" }}> */}
                        {/* clicking on this will redirect to dashboard */}
                        <Nav.Link href="/home" style={{ color: "black" }}>
                            Home
                        </Nav.Link>
                        {/* clicking on this will redirect to AboutUs.js */}
                        <Nav.Link
                            href="/about"
                            style={{ color: "black", paddingLeft: "30px" }}
                        >
                            About Us
                        </Nav.Link>
                        {/* clicking on this will Logout */}
                        <Nav.Link
                            href="/"
                            style={{ color: "black", paddingLeft: "30px" }}
                            onClick={logout}
                        >
                            Logout
                        </Nav.Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Nav>
                    <Nav>
                        <Nav.Link style={{ marginRight: "15px" }}>
                            {name}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default DashboardNavbar
