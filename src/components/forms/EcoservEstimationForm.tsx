import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { EcoservSummaryEstimation } from '../../business/summary/EcoservSummaryEstimation';
import { EcoservEstimationFormInterface } from '../../interfaces/EcoservEstimation';
import { Checkbox, FormControlLabel } from '@mui/material';

export const EcoservEstimationForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [additionalServices, setAdditionalServices] = useState<any>({
        carpetCleaning: { selected: false, info: 'Service de nettoyage de tapis' },
        windowCleaning: { selected: false, info: 'Service de nettoyage de fenêtres' },
        deepCleaning: { selected: false, info: 'Service de nettoyage en profondeur' },
        another: { selected: false, info: 'Service de nettoyage additionel' },
    });

    const [formData, setFormData] = useState<EcoservEstimationFormInterface>({
        name: '',
        email: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        service: '',
        date: new Date().toISOString().split('T')[0],
        date_appointment: '',
        hourRange: "",
        additionalServices
    });
    const [formErrors, setFormErrors] = useState<any>({
        name: '',
        email: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        service: '',
        date: '',

    });

    const handleAdditionalService = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setAdditionalServices((prevServices: { [x: string]: any; }) => ({
            ...prevServices,
            [name]: { ...prevServices[name], selected: checked },
        }));
        setFormData((prevFormData: EcoservEstimationFormInterface) => ({
            ...prevFormData,
            additionalServices: {
                ...prevFormData.additionalServices,
                [name]: { ...prevFormData.additionalServices[name], selected: checked },
            },
        }));
    };

    useEffect(() => {
        console.log('Updated additional services:', formData.additionalServices);
    }, [additionalServices]);

    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleShowModal = () => {
        // Validate form data before showing the modal
        if (validateForm()) {
            setShowModal(true);
            // Perform calculation and set the result state here
        }

        console.log('handleShowModal', formData.additionalServices);
    };

    const handleCloseModal = () => {
        setShowModal(false);

        resetForm();
    };

    const validateForm = () => {
        let valid = true;
        const errors: EcoservEstimationFormInterface = {
            name: '',
            email: '',
            area: '',
            bedrooms: '',
            bathrooms: '',
            service: '',
            date: '',
            date_appointment: '',
            hourRange: '',
            additionalServices: {}
        };

        // Validate name
        if (formData.name.trim() === '') {
            errors.name = 'Le nom est requis';
            valid = false;
        }

        // Validate email
        if (!formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            errors.email = 'Adresse email invalide';
            valid = false;
        }

        // Validate area
        if (formData.area.trim() === '' || isNaN(Number(formData.area))) {
            errors.area = 'La superficie doit être un nombre valide';
            valid = false;
        }

        // Validate bedrooms
        if (formData.bedrooms.trim() === '' || isNaN(Number(formData.bedrooms))) {
            errors.bedrooms = 'Le nombre de chambres doit être un nombre valide';
            valid = false;
        }

        // Validate bathrooms
        if (formData.bathrooms.trim() === '' || isNaN(Number(formData.bathrooms))) {
            errors.bathrooms = 'Le nombre de salles de bain doit être un nombre valide';
            valid = false;
        }

        // Validate service
        if (formData.service.trim() === '') {
            errors.service = 'Le service est requis';
            valid = false;
        }

        // Validate date
        if (formData.date.trim() === '') {
            errors.date = 'La date est requise';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };


    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            area: '',
            bedrooms: '',
            bathrooms: '',
            service: '',
            date: new Date().toISOString().split('T')[0],
            date_appointment: '',
            hourRange: '',
            additionalServices: {
                carpetCleaning: { selected: false, info: 'Service de nettoyage de tapis' },
                windowCleaning: { selected: false, info: 'Service de nettoyage de fenêtres' },
                deepCleaning: { selected: false, info: 'Service de nettoyage en profondeur' },
                another: { selected: false, info: 'Service de nettoyage additionel' },

            }
        });
        setAdditionalServices({
            carpetCleaning: { selected: false, info: 'Service de nettoyage de tapis' },
            windowCleaning: { selected: false, info: 'Service de nettoyage de fenêtres' },
            deepCleaning: { selected: false, info: 'Service de nettoyage en profondeur' },
            another: { selected: false, info: 'Service de nettoyage additionel' },
            // Add more services with corresponding information as needed
        });
        setFormErrors({
            name: '',
            email: '',
            area: '',
            bedrooms: '',
            bathrooms: '',
            service: '',
            date: '',
        });
    };

    const todayDate = new Date().toISOString().split('T')[0];

    const handleSubmit = () => {
        // Perform calculation and set the result state here
        handleCloseModal();
        // Example: console.log(formData);

    };

    return (
        <div style={{ marginTop: 60 }}>
            <Container maxWidth="md" className="estimation-form-container">
                <Typography style={{ textAlign: 'center' }} variant="h4" gutterBottom>
                    Estimation
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="name"
                            name="name"
                            label="Votre nom"
                            variant="outlined"
                            fullWidth
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={handleInputChange}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="email"
                            name="email"
                            label="Votre couriel"
                            variant="outlined"
                            fullWidth
                            placeholder="Votre couriel"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="area"
                            name="area"
                            label="Combien pied carre (approximativement)"
                            variant="outlined"
                            fullWidth
                            type="number"
                            inputProps={{ min: 0 }}
                            placeholder="Entre votre nombre"
                            value={formData.area}
                            onChange={handleInputChange}
                            error={!!formErrors.area}
                            helperText={formErrors.area}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="bedrooms"
                            name="bedrooms"
                            label="Nombre de chambres"
                            variant="outlined"
                            fullWidth
                            type="number"
                            inputProps={{ min: 0 }}
                            placeholder="Entre votre nombre"
                            value={formData.bedrooms}
                            onChange={handleInputChange}
                            error={!!formErrors.bedrooms}
                            helperText={formErrors.bedrooms}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="bathrooms"
                            name="bathrooms"
                            label="Nombre de sales de bain"
                            variant="outlined"
                            fullWidth
                            type="number"
                            inputProps={{ min: 0 }}
                            placeholder="Nombre de sales de bain"
                            value={formData
                                .bathrooms}
                            onChange={handleInputChange}
                            error={!!formErrors.bathrooms}
                            helperText={formErrors.bathrooms}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="date"
                            name="date"
                            label="Date prevue pour le service"
                            variant="outlined"
                            fullWidth
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: todayDate,
                                max: '9999-12-31',
                            }}
                            value={formData.date}
                            onChange={handleInputChange}
                            error={!!formErrors.date}
                            helperText={formErrors.date}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="service-label">Service</InputLabel>
                            <Select
                                id="service"
                                name="service"
                                label="Service"
                                value={formData.service}
                                onChange={handleInputChange}
                                error={!!formErrors.service}
                            // helperText={formErrors.service}
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
                        <Typography variant="h6">Services additionels</Typography>
                        <Grid container spacing={1}>
                            {Object.keys(additionalServices).map((serviceKey) => (
                                <Grid item xs={12} sm={6} key={serviceKey}>
                                    <FormControlLabel
                                        control={<Checkbox checked={additionalServices[serviceKey].selected} onChange={handleAdditionalService} name={serviceKey} />}
                                        label={additionalServices[serviceKey].info}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleShowModal} variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            <EcoservSummaryEstimation formDetails={formData} handleCloseModal={handleCloseModal} showModal={showModal} />
        </div>
    );
};
