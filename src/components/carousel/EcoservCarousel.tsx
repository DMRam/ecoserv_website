import React from 'react';
import { Carousel } from 'react-bootstrap';
import './EcoservCarousel.css'; // Import CSS file for carousel styles

export const EcoservCarousel: React.FC = () => {
    return (
        <Carousel className="custom-carousel">
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-image"
                    src="https://koala.sh/api/image/v2-5r9ff-1pquq.jpg?width=1344&height=768&dream"
                    alt="First slide"
                />
                <Carousel.Caption className="carousel-caption">
                    <h3>First slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-image"
                    src="https://www.peopleready.com/wp-content/uploads/2021/04/1000x460_office-cleaning-02-1024x471.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption className="carousel-caption">
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-image"
                    src="https://fastmaidservice.com/wp-content/uploads/2022/12/No-Need-to-Buy-Expensive-Cleaning-Supplies.png"
                    alt="Third slide"
                />
                <Carousel.Caption className="carousel-caption">
                    <h3>Third slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};
