import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const EcoservFooter = () => {
    return (
        <footer style={{marginTop:20}} className="bg-dark text-light py-4">
            <Container>
                <Row className="align-items-center justify-content-center justify-content-md-between">
                    <Col xs={12} md={6}>
                        <p className="mb-0 text-center text-md-start">&copy; {new Date().getFullYear()} Ècoserv. All rights reserved.</p>
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end mt-3 mt-md-0">
                        <a href="https://www.instagram.com/" className="text-light me-3">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                        <a href="https://twitter.com/" className="text-light me-3">
                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </a>
                        <a href="https://www.linkedin.com/" className="text-light">
                            <FontAwesomeIcon icon={faLinkedin} size="lg" />
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};