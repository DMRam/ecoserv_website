import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FiGlobe } from 'react-icons/fi'; // Import icons for language selection
import { useLanguage } from '../../hooks/useLanguage';
import { useModal } from '../../hooks/useModal';
import './EcoservNavbar.css'; // Import CSS file for Navbar styles

interface Props {
    logoSrc?: string;
}

export const EcoservNavbar = ({ logoSrc }: Props) => {
    const [isSticky, setIsSticky] = useState(false);
    const { languageSelected, onChangeLanguage } = useLanguage();
    const { switchModal } = useModal()

    const switchModalFromNav = () => {
        switchModal()
    }

    const navbarHeight = 90; // Adjust this value based on your actual navbar height

    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            const offsetTop = servicesSection.offsetTop - navbarHeight;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };

    const scrollToEstimation = () => {
        const servicesSection = document.getElementById('estimation');
        if (servicesSection) {
            const offsetTop = servicesSection.offsetTop - navbarHeight;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };

    // estimation


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

    const onChangeLanguages = (event: React.SyntheticEvent<HTMLElement>) => {
        const selectedLanguage = event.currentTarget.getAttribute('data-language');
        if (selectedLanguage) {
            onChangeLanguage(selectedLanguage);
        }
    };

    return (
        <Navbar expand="lg" variant="dark" className={isSticky ? 'ecoserv-navbar sticky' : 'ecoserv-navbar'} bg="dark">
            <Container>
                <Navbar.Brand href="/">
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
                        <Nav.Link onClick={scrollToServices} href="#services" className="nav-link">
                            {languageSelected === "French" ? "Services" : languageSelected === "Spanish" ? "Servicios" : "Services"}
                        </Nav.Link>
                        <Nav.Link onClick={scrollToEstimation} href="#estimation" className="nav-link">
                            {languageSelected === "French" ? "Estimation" : languageSelected === "Spanish" ? "Estimación" : "Estimation"}
                        </Nav.Link>
                        <Nav.Link onClick={switchModalFromNav} href="#" className="nav-link">
                            {languageSelected === "French" ? "Nous joindre" : languageSelected === "Spanish" ? "Contacto" : "Contact"}
                        </Nav.Link>
                        <NavDropdown title={<FiGlobe className="language-icon" />} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={onChangeLanguages} eventKey="French" data-language="French" active={languageSelected === 'French'}>

                                {languageSelected === "French" ? "Français" : languageSelected === "Spanish" ? "Francés" : "French"}
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={onChangeLanguages} eventKey="English" data-language="English" active={languageSelected === 'English'}>

                                {languageSelected === "French" ? "Anglais" : languageSelected === "Spanish" ? "Inglés" : "English"}
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={onChangeLanguages} eventKey="Spanish" data-language="Spanish" active={languageSelected === 'Spanish'}>

                                {languageSelected === "French" ? "Espagnol" : languageSelected === "Spanish" ? "Español" : "Spanish"}
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
