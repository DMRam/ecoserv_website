import React from 'react';
import './TestGrid.css';

export const TestGrid = ({ images }: any) => {
    const handleClick = (e: any) => {
        e.preventDefault(); // Prevent default anchor tag behavior
        // Handle custom click behavior here if needed
    };

    const test = () => {
        console.log('test')
    }

    return (
        <>
            <h3 style={{ textAlign: 'center', marginBottom: '5px' }}>Nous services</h3>
            <hr style={{ margin: '0 auto 10px', width: '50%' }} />

            <div className="image-grid">
                {images.map((image: { url: any; img: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; author: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: number) => (
                    <div className="image-link" key={index}>
                        <a href={image.url || '#'} onClick={handleClick}>
                            <img
                                src={image.img}
                                alt={image.title?.toString()}
                                title={image.title?.toString()}
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
                    </div>
                ))}
            </div>
        </>
    );
};
