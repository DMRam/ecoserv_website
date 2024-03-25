import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EcoservImageGrid.css';
import { EcoserviceDetails } from './services_details/EcoserviceDetails';

export const EcoservImageGrid = ({ images }: any) => {
    const [selectedImage, setSelectedImage] = useState<any>(null); // State to manage selected image
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleClick = (e: any, id: string) => {
        e.preventDefault(); // Prevent default anchor tag behavior

        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Find the selected image based on id
        const image = images.find((img: any) => img.id === id);
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
        <>
            {!selectedImage && (
                <div className="image-grid">
                    {images.map((image: { id: any; img?: string; title: string; author: string; }, index: number) => (
                        <div className="image-link" key={index}>
                            {image.img && (
                                <a href={image.img || '#'} onClick={(e) => handleClick(e, image.id)}>
                                    <img
                                        src={image.img}
                                        alt={image.title}
                                        title={image.title}
                                        className="grid-image"
                                        style={{ height: '100%' }}
                                    />
                                    <div className="image-info">
                                        <span className="image-title">{image.title}</span>
                                        <span className="image-author">{image.author}</span>
                                    </div>
                                    <div className="image-overlay">
                                        <button onClick={test} className="hover-button">Voir les détails</button>
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
        </>
    );
};
