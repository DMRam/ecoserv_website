import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useLanguage } from '../../hooks/useLanguage';

export const EcoservConfirmEstimation = () => {

    // This could get API confirmation that the message was received and the show the message
    const [loading, setLoading] = useState(true);
    const { languageSelected } = useLanguage()

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Simulate loading completion after 3 seconds
        }, 5000);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount or re-render
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '20px' }}>
                {languageSelected === "French"
                    ? "Merci!!!"
                    : languageSelected === "English"
                        ? "Thank you!!!"
                        : "¡Gracias!!!"}
            </h3>
            <p>
                {languageSelected === "French"
                    ? "Nous avons bien reçu votre demande."
                    : languageSelected === "English"
                        ? "We have received your request."
                        : "Hemos recibido su solicitud."}
            </p>
            <p>
                {languageSelected === "French"
                    ? "Un agent vous contactera sous peu."
                    : languageSelected === "English"
                        ? "An agent will contact you shortly."
                        : "Un agente se pondrá en contacto con usted en breve."}
            </p>


            {loading && (
                <CircularProgress style={{ margin: '20px' }} />
            )}
        </div>
    );
};
