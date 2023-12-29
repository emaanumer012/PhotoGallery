// OurTeam.js
import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";

const fadeInAnimation = keyframes`${fadeIn}`;

const AnimatedCard = styled(Card)`
  animation: 1s ${fadeInAnimation};
  margin-bottom: 20px; /* Add margin between each card */
  border: 1px solid #ccc; /* Add a border for a more appealing look */
  border-radius: 8px; /* Add border-radius for rounded corners */
  overflow: hidden; /* Hide overflow to prevent border-radius clipping */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05); /* Add a slight scale effect on hover */
  }
`;

const SocialIcons = styled.div`
  display: flex;
  margin-top: 10px; /* Add margin between LinkedIn and GitHub icons */
`;

const IconLink = styled.a`
  margin: 0 10px; /* Add gap between LinkedIn and GitHub icons */
`;

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Abdullah Tahir",
      role: "Software Engineer",
      linkedin: "linkedin.com/in/abdullahtahir",
      github: "github.com/abdullahtahir",
    },
    {
      name: "Emaan Umer",
      role: "Software Engineer",
      linkedin: "linkedin.com/in/emaanumer",
      github: "github.com/emaanumer",
    },
    {
      name: "Imaan Ibrar",
      role: "Software Engineer",
      linkedin: "linkedin.com/in/imaanibrar",
      github: "github.com/imaanibrar",
    },
    {
      name: "Marriam Naeem",
      role: "Software Engineerr",
      linkedin: "linkedin.com/in/marriam-naeem/",
      github: "github.com/Marriam-Naeem",
    },
    {
      name: "Laiba Atiq",
      role: "Software Engineer",
      linkedin: "linkedin.com/in/laibaatiq",
      github: "github.com/laibaatiq",
    },
  ];

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Meet Our Development Team</h1>
      <Row>
        {teamMembers.map((member, index) => (
          <Col md={4} key={index}>
            <AnimatedCard>
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Text>{member.role}</Card.Text>
                <SocialIcons>
                  <IconLink href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} className="icon" />
                  </IconLink>
                  <IconLink href={`https://${member.github}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} className="icon" />
                  </IconLink>
                </SocialIcons>
              </Card.Body>
            </AnimatedCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OurTeam;
