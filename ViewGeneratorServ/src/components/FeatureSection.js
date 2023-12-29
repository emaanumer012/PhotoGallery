// FeaturesSection.js
import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import feature1Image from "./Assets/userff.png";
import feature2Image from "./Assets/ccstorage.png";
import feature3Image from "./Assets/monitoring.png";

const fadeInAnimation = keyframes`${fadeIn}`;

const AnimatedCard = styled(Card)`
  animation: 1s ${fadeInAnimation};
`;

const FeaturesSection = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Key Features</h1>
      <Row>
        <Col md={4}>
          <AnimatedCard>
            <Card.Img variant="top" src={feature1Image} />
            <Card.Body>
              <Card.Title>Intuitive Interface</Card.Title>
              <Card.Text>
                Explore our user-friendly interface designed for seamless
                navigation and an enjoyable photo-sharing experience.
              </Card.Text>
            </Card.Body>
          </AnimatedCard>
        </Col>
        <Col md={4}>
          <AnimatedCard>
            <Card.Img variant="top" src={feature2Image} />
            <Card.Body>
              <Card.Title>Smart Storage Management</Card.Title>
              <Card.Text>
                Enjoy worry-free storage with our intelligent storage management
                system. Receive alerts when you approach your storage limit.
              </Card.Text>
            </Card.Body>
          </AnimatedCard>
        </Col>
        <Col md={4}>
          <AnimatedCard>
            <Card.Img variant="top" src={feature3Image} />
            <Card.Body>
              <Card.Title>Real-time Usage Monitoring</Card.Title>
              <Card.Text>
                Keep track of your photo gallery usage in real-time. Get
                notified when you exceed specified usage thresholds.
              </Card.Text>
            </Card.Body>
          </AnimatedCard>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturesSection;
