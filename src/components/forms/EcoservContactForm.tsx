import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import { email_credentials } from '../../key/EmailJsKey';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../hooks/useLanguage';

interface Props {
    closeOnSubmission: () => void; // Correct the prop type
}
export const EcoservContactForm = ({ closeOnSubmission }: Props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        address: ''
    });

    const { languageSelected } = useLanguage()

    const sendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const formToSend = document.createElement('form');

        // Now you can use the formToSend element in your email sending logic

        try {
            const response = await emailjs.sendForm(
                email_credentials.sevice_key,
                email_credentials.contactFormTemp_key,
                '#contact-form', // Use the dummy form as the 3rd parameter
                {
                    publicKey: email_credentials.email_key,
                }
            );
            console.log('Email sent successfully:', response);

        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Add your form submission logic here
        console.log(formData);
        // Reset the form after submission
        setFormData({ name: '', email: '', message: '', address: '' });
        sendEmail(event)
        closeOnSubmission()
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                {languageSelected === 'French' ? 'Contactez-nous' : languageSelected === 'English' ? 'Contact Us' : 'Contactenos'}

            </Typography>
            <form id="contact-form" onSubmit={handleSubmit}>
                <TextField
                    id="name"
                    name="name"
                    label={languageSelected === 'French' ? 'Votre prenom' : languageSelected === 'English' ? "Your name" : 'Su nombre'}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    id="email"
                    name="email"
                    label={languageSelected === 'French' ? 'Votre courriel' : languageSelected === 'English' ? "Your email" : 'Su email'}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    id="address"
                    name="address"
                    label={languageSelected === 'French' ? 'Votre adresse' : languageSelected === 'English' ? "Your address" : 'Su dirección'}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <TextField
                    id="message"
                    name="message"
                    label={languageSelected === 'French' ? 'Votre message' : languageSelected === 'English' ? "Your message" : 'Su mensaje'}
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {languageSelected === 'English' ? 'Send Message' : languageSelected === 'Spanish' ? 'Enviar mensaje' : 'Envoyer Message'}
                </Button>
            </form>
        </Container>
    );
};