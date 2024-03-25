import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './EcoservFooter.css'

export const EcoservFooter = () => {
    return (
        <footer className="ecoserv-footer">
            <Container>
                <Row className="text-center text-md-left">
                    <Col xs={12} md={6} lg={4}>
                        <h5>Contactez-nous</h5>
                        <ul className="list-unstyled">
                            <li><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 align-middle text-info" /> Sherbrooke, QC</li>
                            <li><FontAwesomeIcon icon={faEnvelope} className="me-2 align-middle text-primary" /> <a href="mailto:admin@ecoserv.ca" className="text-light">admin@ecoserv.ca</a></li>
                        </ul>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <h5>Follow Us</h5>
                        <ul className="list-inline social-icons">
                            <li className="list-inline-item"><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-primary"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                            <li className="list-inline-item"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-danger"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} ÉCOSERV. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};