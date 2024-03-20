import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Form, Modal } from 'react-bootstrap';

export const EcoservEstimationForm = () => {

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
        // Perform calculation and set the result state here
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const todayDate = new Date().toISOString().split('T')[0];

    return (
        <div style={{ marginTop: 60 }}>
            <Container maxWidth="md" className="estimation-form-container">
                <Typography variant="h4" gutterBottom>
                    Estimation
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="name"
                            label="Votre nom"
                            variant="outlined"
                            fullWidth
                            placeholder="Votre nom"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="email"
                            label="Votre couriel"
                            variant="outlined"
                            fullWidth
                            placeholder="Votre couriel"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {/* Number field using TextField */}
                        <TextField
                            id="P2"
                            label="Combien pied carre (approximativement)"
                            variant="outlined"
                            fullWidth
                            type="number"
                            inputProps={{ min: 0 }}
                            placeholder="Entre votre nombre"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {/* Number field using TextField */}
                        <TextField
                            id="P2"
                            label="Nombre de chambres"
                            variant="outlined"
                            fullWidth
                            type="number"
                            inputProps={{ min: 0 }}
                            placeholder="Entre votre nombre"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {/* Number field using TextField */}
                        <TextField
                            id="P2"
                            label="Nombre de sales de bain"
                            variant="outlined"
                            fullWidth
                            type="number"
                            inputProps={{ min: 0 }}
                            placeholder="Nombre de sales de bain"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {/* Date field with min and max attributes */}
                        <TextField
                            id="P2"
                            label="Date prevue pour le service"
                            variant="outlined"
                            fullWidth
                            type="date"
                            InputLabelProps={{
                                shrink: true, // Shrink the label to the input size
                            }}
                            inputProps={{
                                min: todayDate,
                                max: '9999-12-31', // Optional: Set maximum date if needed
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="service-label">Service</InputLabel>
                            <Select
                                labelId="service-label"
                                id="service"
                                label="Service"
                                defaultValue=""
                            >
                                <MenuItem value="">Select Service</MenuItem>
                                <MenuItem value="Nettoyage Résidentiel">Nettoyage Résidentiel</MenuItem>
                                <MenuItem value="Nettoyage Commercial">Nettoyage Commercial</MenuItem>
                                <MenuItem value="Nettoyage Chalet/Airbnb">Nettoyage Chalet/Airbnb</MenuItem>
                                <MenuItem value="Nettoyage Aprés construction">Nettoyage Aprés construction</MenuItem>
                                <MenuItem value="Nettoyage Courtier Immobilier">Nettoyage Courtier Immobilier</MenuItem>
                                <MenuItem value="L'homme à tout faire">L'homme à tout faire</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="message"
                            label="Message"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Enter your message"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Send me a copy of this message"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleShowModal} variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Calculation Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display calculation result here */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
