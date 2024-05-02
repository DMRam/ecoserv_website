import React from 'react';
import { Carousel } from 'react-bootstrap';
import { carouselItems } from '../../data/services_data/ecoserv_locale/CarouselText';
import { useLanguage } from '../../hooks/useLanguage';
import './EcoservCarousel.css'; // Import CSS file for carousel styles


export const EcoservCarousel: React.FC = () => {
    const { languageSelected } = useLanguage();

    return (
        <Carousel className="custom-carousel">
            {carouselItems.map((item: any, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100 carousel-image"
                        src={item.imageUrl}
                        alt={`Slide ${index + 1}`}
                    />
                    <Carousel.Caption className="carousel-caption">
                        <h3>{item.title[languageSelected]}</h3>
                        <p>{item.description[languageSelected]}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};