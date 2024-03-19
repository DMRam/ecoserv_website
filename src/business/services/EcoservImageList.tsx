import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ListSubheader from '@mui/material/ListSubheader';

import './EcoservImageList.css'; // Import CSS file for hover effect
import { useEffect, useState } from 'react';

export const EcoservImageList = () => {
    const test = () => {
        console.log("Test")
    }

    // Calculate image size based on screen width
    const imageSize_smallDev = window.innerWidth >= 600 ? 600 : '100%'; // Change '100%' to '100vw' if you want full viewport width

    // Calculate the number of columns based on screen size
    const getCols = () => {
        if (window.innerWidth >= 1280) {
            return 3;
        } else if (window.innerWidth >= 600) {
            return 2;
        } else {
            return 1;
        }
    };

    // Set initial number of columns
    const [cols, setCols] = useState(getCols());

    // Update number of columns on window resize
    useEffect(() => {
        const handleResize = () => {
            setCols(getCols());
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

        
    }, []);

    // Calculate image size based on number of columns
    const imageSize = cols === 1 ? 248 : 124;

    return (
        <ImageList
            sx={{
                width: '100%',
                maxWidth: 1200,
                margin: 'auto',
                '@media (max-width: 600px)': {
                    width: '90%',
                    maxWidth: 'none',
                },
            }}
            cols={cols} // Set dynamic number of columns
            gap={16}
        >
            <ImageListItem key="Subheader" cols={cols}>
                <ListSubheader style={{ textAlign: 'center', fontSize: 27 }} component="div">Nous Services</ListSubheader>
                <hr />
            </ImageListItem>
            {itemData.map((item) => (
                <ImageListItem onClick={test} key={item.img} cols={item.cols || 1} rows={item.rows || 1} className="image-list-item" sx={{ height: '100%', width: imageSize_smallDev }}>
                    <img
                        srcSet={`${item.img}?w=${imageSize}&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=${imageSize}&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                    <div className="overlay">
                        <div className="overlay-content">
                            <h3>{item.title}</h3>
                            <p>{item.author}</p>
                        </div>
                    </div>
                </ImageListItem>
            ))}
        </ImageList>
    );
}

const itemData = [
    {
        img: 'https://kaizenaire.com/wp-content/uploads/2023/12/Commercial-Cleaning-Services-in-Singapore-Keeping-Your-Business-Sparkling-Clean-1024x585.jpg',
        title: 'Commercial',
        author: '',
        rows: 1,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://thinkdifferentnetwork.com/wp-content/uploads/2019/03/Chalet-style-in-the-interior-of-apartments-and-houses3.jpg',
        title: 'Résidentiel',
        author: '',
    },
    // {
    //     img: 'https://lirp.cdn-website.com/a2cc572e/dms3rep/multi/opt/man-cleaning-walls-floor-with-high-pressure-640w.jpeg',
    //     title: 'Patio',
    //     author: '',
    //     cols: 2,
    // },
    // {
    //     img: 'https://thinkdifferentnetwork.com/wp-content/uploads/2019/03/Chalet-style-in-the-interior-of-apartments-and-houses3.jpg',
    //     title: 'Chalet',
    //     author: '',
    // },
];