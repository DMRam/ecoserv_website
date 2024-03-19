import React from 'react';
import './TestGrid.css'

export const TestGrid = ({ images }: any) => {
    const handleClick = (e: any) => {
        e.preventDefault(); // Prevent default anchor tag behavior
        // Handle custom click behavior here if needed
    };

    return (
        <>

            <h3 style={{ textAlign: 'center', marginBottom: '5px' }}>Nous services</h3>
            <hr style={{ margin: '0 auto 10px', width: '50%' }} />

            <div className="image-grid">

                {images.map((image: { url: any; img: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; author: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                    <a href={image.url || '#'} className="image-link" key={index} onClick={handleClick}>
                        <img
                            src={image.img}
                            alt={image.title?.toString()}
                            title={image.title?.toString()}
                            className="grid-image"
                        />
                        <div className="image-info">
                            <span className="image-title">{image.title}</span>
                            <span className="image-author">{image.author}</span>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};
