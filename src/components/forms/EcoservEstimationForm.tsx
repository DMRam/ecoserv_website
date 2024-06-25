import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { EcoservSummaryEstimation } from '../../business/summary/EcoservSummaryEstimation';
import { EcoservEstimationFormInterface } from '../../interfaces/EcoservEstimation';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useLanguage } from '../../hooks/useLanguage';
import { estimationFormTranslationText, translationsAdditionalServicesBoxes } from '../../data/services_data/ServicesData';

interface TranslationText {
    title: string | undefined;
    nomLabel: string | undefined;
    emailLabel: string | undefined;
    serviceLabel: string | undefined;
    options: { op1: string, op2: string, op3: string, op4: string, op5: string, op6: string }
};

export const EcoservEstimationForm = () => {
    const { languageSelected } = useLanguage();

    const [translatedText, setTranslatedText] = useState<TranslationText>(
        {
            title: '', nomLabel: '', emailLabel: '', serviceLabel: '',
            options: { op1: '', op2: '', op3: '', op4: '', op5: '', op6: '' }
        });

    // Initialize the service info based on the selected language
    const serviceInfoI = translationsAdditionalServicesBoxes[languageSelected].carpetCleaning;

    // Initialize the additional services state with translated info
    const [additionalServices, setAdditionalServices] = useState<any>({
        carpetCleaning: { selected: false, info: serviceInfoI },
        windowCleaning: { selected: false, info: translationsAdditionalServicesBoxes[languageSelected].windowCleaning },
        deepCleaning: { selected: false, info: translationsAdditionalServicesBoxes[languageSelected].deepCleaning },
        another: { selected: false, info: translationsAdditionalServicesBoxes[languageSelected].another },
    });

    // useEffect to update translations and additionalServices when languageSelected changes
    useEffect(() => {
        const updatedServiceInfoI = translationsAdditionalServicesBoxes[languageSelected].carpetCleaning;

        setAdditionalServices((prevServices: { carpetCleaning: any; windowCleaning: any; deepCleaning: any; another: any; }) => ({
            ...prevServices,
            carpetCleaning: { ...prevServices.carpetCleaning, info: updatedServiceInfoI },
            windowCleaning: { ...prevServices.windowCleaning, info: translationsAdditionalServicesBoxes[languageSelected].windowCleaning },
            deepCleaning: { ...prevServices.deepCleaning, info: translationsAdditionalServicesBoxes[languageSelected].deepCleaning },
            another: { ...prevServices.another, info: translationsAdditionalServicesBoxes[languageSelected].another },
        }));
    }, [languageSelected]);



    const [showModal, setShowModal] = useState(false);
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
        if (formData.service.includes('Commercial')) {
            if (formData.area.trim() === '' || isNaN(Number(formData.area))) {
                errors.area = 'La superficie doit être un nombre valide';
                valid = false;
            }
        }

        // Validate bedrooms
        if (formData.service.includes('Résidentiel')) {
            if (formData.bedrooms.trim() === '' || isNaN(Number(formData.bedrooms))) {
                errors.bedrooms = 'Le nombre de chambres doit être un nombre valide';
                valid = false;
            }
        }

        // Validate bathrooms
        if (formData.service.includes('Résidentiel')) {
            if (formData.bathrooms.trim() === '' || isNaN(Number(formData.bathrooms))) {
                errors.bathrooms = 'Le nombre de salles de bain doit être un nombre valide';
                valid = false;
            }
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

    const translate = (languageSelected: string) => {
        let translatedText: TranslationText | undefined = undefined;

        if (languageSelected === 'French') {
            translatedText = estimationFormTranslationText.find(item => item.hasOwnProperty('french'))?.french;
        } else if (languageSelected === 'English') {
            translatedText = estimationFormTranslationText.find(item => item.hasOwnProperty('english'))?.english;
        } else if (languageSelected === 'Spanish') {
            translatedText = estimationFormTranslationText.find(item => item.hasOwnProperty('spanish'))?.spanish;
        }

        if (translatedText !== undefined) {
            setTranslatedText(translatedText);
        }
    }

    useEffect(() => {
        translate(languageSelected)
    }, [languageSelected])

    return (
        <div style={{ marginTop: 60 }}>
            <Container maxWidth="md" className="estimation-form-container">
                <Typography style={{ textAlign: 'center' }} variant="h4" gutterBottom>
                    {translatedText.title}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="name"
                            name="name"
                            label={translatedText.nomLabel}
                            variant="outlined"
                            fullWidth
                            placeholder={translatedText.nomLabel}
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
                            label={translatedText.emailLabel}
                            variant="outlined"
                            fullWidth
                            placeholder={translatedText.emailLabel}
                            value={formData.email}
                            onChange={handleInputChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="service-label">{translatedText.serviceLabel}</InputLabel>
                            <Select
                                id="service"
                                name="service"
                                label={translatedText.serviceLabel}
                                value={formData.service}
                                onChange={handleInputChange}
                                error={!!formErrors.service}
                            >

                                <MenuItem value="">{languageSelected === 'French' ? 'Choisis ' : languageSelected === 'English' ? 'Select' : 'Seleccione'} {translatedText.serviceLabel}</MenuItem>
                                <MenuItem value="Commercial Commercial Cleaning">{translatedText.options.op1}</MenuItem>
                                <MenuItem value="High pressure Cleaning">{translatedText.options.op2}</MenuItem>
                                <MenuItem value="Chalet/Airbnb Cleaning">{translatedText.options.op3}</MenuItem>
                                <MenuItem value="After Construction Cleaning">{translatedText.options.op4}</MenuItem>
                                <MenuItem value="Broker Cleaning">{translatedText.options.op5}</MenuItem>
                                <MenuItem value="Residential Cleaning">{translatedText.options.op6}</MenuItem>
                            </Select>

                        </FormControl>
                    </Grid>
                    {


                        formData.service === "Commercial Commercial Cleaning" && (

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
                            </Grid>)


                    }
                    
                    {
                        formData.service === 'Nettoyage Résidentiel' &&
                        (
                            <>
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
                                </Grid></>)
                    }

                    {formData.service !== '' && (
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
                        </Grid>)}
                    {
                        formData.service !== '' && (
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

                        )
                    }

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
