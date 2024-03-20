import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FiGlobe } from 'react-icons/fi'; // Import icons for language selection
import './EcoservNavbar.css'; // Import CSS file for Navbar styles

interface Props {
    logoSrc?: string;
}

export const EcoservNavbar: React.FC<Props> = ({ logoSrc }) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar expand="lg" variant="dark" className={isSticky ? 'ecoserv-navbar sticky' : 'ecoserv-navbar'} bg="dark">
            <Container>
                <Navbar.Brand href="#">
                    <img
                        src={logoSrc}
                        height="30"
                        className="d-inline-block align-top"
                        alt="Ècoserv"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" className="custom-toggler" />
                <Navbar.Collapse id="navbarNav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#" className="nav-link">
                            Services
                        </Nav.Link>
                        <Nav.Link href="#" className="nav-link">
                            Estimation
                        </Nav.Link>
                        <Nav.Link href="#" className="nav-link">
                            Nous joindre
                        </Nav.Link>
                        <NavDropdown title={<FiGlobe className="language-icon" />} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#fr">French</NavDropdown.Item>
                            <NavDropdown.Item href="#en">English</NavDropdown.Item>
                            <NavDropdown.Item href="#es">Spanish</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
