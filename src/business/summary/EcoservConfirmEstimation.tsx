import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const EcoservConfirmEstimation = () => {

    // This could get API confirmation that the message was received and the show the message
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Simulate loading completion after 3 seconds
        }, 5000);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount or re-render
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '20px' }}>Merci!!!</h3>
            <p>Nous avons bien reçu votre demande.</p>
            <p>Un agent vous contactera sous peu.</p>

            {loading && (
                <CircularProgress style={{ margin: '20px' }} />
            )}
        </div>
    );
};
