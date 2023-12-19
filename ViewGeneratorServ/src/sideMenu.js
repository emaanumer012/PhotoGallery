import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Assets/logo.png";
import styled from "styled-components";

const StyledContainer = styled.div`
  font-family: "Impact", sans-serif;
  text-align: center;
  padding: 20px;
 
`;

const StyledNavItem = styled.li`
  margin-bottom: 20px;
  font-size: 21px
`;

const SideMenu = () => {
  return (
    <nav style={{ backgroundColor: "#0F2167", height: "100vh"}}>
      <div className="text-center">
        <img
          src={logo}
          alt="Logo"
          className="img-fluid rounded-circle mb-4"
          style={{
            width: "100px",
            height: "90px",
            marginTop: "75px",
            marginRight: "20px",
            marginBottom: "20px"
          }}
        />
        <StyledContainer>
          <h2 className="text-light mb-4" style={{ fontSize: "45px" }}>
            FotoFolio
          </h2>
        </StyledContainer>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#sideMenu"
        aria-controls="sideMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse show text-center" id="sideMenu">
        <ul className="nav flex-column">
          <StyledNavItem>
            <a href="#" className="nav-link text-light">
              Home
            </a>
          </StyledNavItem>
          <StyledNavItem>
            <a href="#" className="nav-link text-light">
              Gallery
            </a>
          </StyledNavItem>
          <StyledNavItem>
            <a href="#" className="nav-link text-light">
              Upload
            </a>
          </StyledNavItem>
          <StyledNavItem>
            <a href="#" className="nav-link text-light">
              Logout
            </a>
          </StyledNavItem>
        </ul>
        <hr className="border-light" />
      </div>
    </nav>
  );
};

export default SideMenu;
