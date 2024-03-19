import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './EcoservTarif.css'; // Import CSS file for Tarif section styles

export const TarifSection: React.FC = () => {
    return (
        <section className="tarif-section">
            <Container>
                <h2 className="section-title">Nos Tarifs</h2>
                <Row className="justify-content-center">
                    <Col md={4}>
                        <Card className="tarif-card">
                            <Card.Body>
                                <Card.Title>Service Standard</Card.Title>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Card.Text>
                                <div className="price">$50</div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="tarif-card">
                            <Card.Body>
                                <Card.Title>Service Premium</Card.Title>
                                <Card.Text>
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </Card.Text>
                                <div className="price">$100</div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="tarif-card">
                            <Card.Body>
                                <Card.Title>Service VIP</Card.Title>
                                <Card.Text>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </Card.Text>
                                <div className="price">$200</div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
