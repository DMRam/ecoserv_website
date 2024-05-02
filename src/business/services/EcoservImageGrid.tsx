import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import './EcoservImageGrid.css';
import { EcoserviceDetails } from './services_details/EcoserviceDetails';

interface ImageProps {
    id: string;
    img: string;
    title: string;
    titleEN: string;
    titleES: string;
    author: string;
}

export const EcoservImageGrid = ({ images }: { images: ImageProps[] }) => {
    const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null); // State to manage selected image
    const navigate = useNavigate(); // Get the navigate function from react-router-dom
    const { languageSelected } = useLanguage();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
        e.preventDefault(); // Prevent default anchor tag behavior

        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Find the selected image based on id
        const image = images.find((item) => item.id === id);
        if (image) {
            setSelectedImage(image); // Set the selected image
        }
    };

    const handleCloseDetails = () => {
        setSelectedImage(null); // Close the details screen
    };

    const test = () => {
        console.log('test');
    };

    return (
        <div>
            {!selectedImage && (
                <div className="image-grid">
                    {images.map((item, index) => (
                        <div className="image-link" key={index}>
                            {item.img && (
                                <a href={item.img || '#'} onClick={(e) => handleClick(e, item.id)}>
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        title={item.title}
                                        className="grid-image"
                                        style={{ height: '100%' }}
                                    />
                                    <div className="image-info">
                                        <span className="image-title">
                                            {languageSelected === "French" ? item.title : languageSelected === "Spanish" ? item.titleES : item.titleEN}
                                        </span>
                                        <span className="image-author">{item.author}</span>
                                    </div>
                                    <div className="image-overlay">
                                        <button onClick={test} className="hover-button">
                                            {languageSelected === "French" ? "Voir les détails" : languageSelected === "Spanish" ? "Ver detalles" : "See details"}
                                        </button>
                                    </div>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Details Screen */}
            {selectedImage && (
                <EcoserviceDetails image={selectedImage} onClose={handleCloseDetails} />
            )}
        </div>
    );
};
