import React, { useEffect, useRef, useState } from 'react';
import { Modal, Typography, Button, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { EcoservEstimationFormInterface } from '../../interfaces/EcoservEstimation';
import { EcoservRendezVousDatePicker } from '../../components/date_picker/EcoservRendezVousDatePicker';
import { EcoservConfirmEstimation } from './EcoservConfirmEstimation';
import emailjs from '@emailjs/browser';
import { email_credentials } from '../../key/EmailJsKey';
import { usePriceCalculations } from '../../hooks/usePriceCalculations';
import { Alert } from '@mui/material';
import { useLanguage } from '../../hooks/useLanguage';


interface Props {
    showModal: boolean;
    handleCloseModal: () => void;
    formDetails: EcoservEstimationFormInterface;
}

export const EcoservSummaryEstimation = ({ showModal, handleCloseModal, formDetails }: Props) => {
    const [step_one, setStep_one] = useState(true);
    const [step_two, setStep_two] = useState(false);
    const [step_three, setStep_three] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedHour, setSelectedHour] = useState<string>('');
    const [message, setMessage] = useState<string>('')
    const [calculatedPrice, setCalculatedPrice] = useState<string>('')

    const [price, setPrice] = useState<number>()

    const { calculateCommercialFinalPrice, calculateResidential } = usePriceCalculations()

    const { languageSelected } = useLanguage()
    console.log("INFO TO USE IN CALCULATION: " + JSON.stringify(formDetails))

    /**
     * 
     * INFO TO USE IN CALCULATION: 
     * {
     * "name":"",
     * "email":"",
     * "area":"",
     * "bedrooms":"",
     * "bathrooms":"",
     * "service":"",
     * "date":"2024-06-27",
     * "date_appointment":"",
     * "hourRange":"",
     * "additionalServices":{
     * "carpetCleaning":{"selected":false,"info":"Servicio de limpieza de alfombras"},
     * "windowCleaning":{"selected":false,"info":"Servicio de limpieza de ventanas"},
     * "deepCleaning":{"selected":false,"info":"Servicio de limpieza profunda"},
     * "another":{"selected":false,"info":"Servicio de limpieza adicional"}}}
     */


    const calculationResult = () => {
        calculateResidential(1, 1, Number(formDetails.area), '', '', Number(formDetails.bedrooms), Number(formDetails.bathrooms))

        // Calculate additional services fees
        const additionalServices = formDetails.additionalServices;
        let additionalServicesFee = Object.values(additionalServices)
            .filter(service => service.selected)
            .reduce((totalFee, service) => {
                if (service.info) {
                    switch (service.info) {
                        case 'Service de nettoyage de tapis':
                            return totalFee + 30;
                        case 'Service de nettoyage de fenêtres':
                            return totalFee + 40;
                        case 'Service de nettoyage en profondeur':
                        case 'Service de nettoyage additionnel':
                            return totalFee + 40;
                        default:
                            return totalFee;
                    }
                }
                return totalFee;
            }, 0);

        // Calculate final price with additional services fee
        const finalCalculatedCommercialPrice = calculateCommercialFinalPrice(
            formDetails.service,
            1,
            1,
            Number(formDetails.area) * 1.15, // Add additional services fee
            'Very Hard',
            'Very Far'
        );
        setPrice(finalCalculatedCommercialPrice + additionalServicesFee);
        return finalCalculatedCommercialPrice;
    };

    const resetSteps = () => {
        setStep_one(true);
        setStep_two(false);
        setStep_three(false);
        onHandleCancel();
    };

    useEffect(() => {
        calculationResult()
    }, [showModal])


    // This is triggered when last step is done
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (step_three) {
            timer = setTimeout(() => {
                resetSteps();
            }, 5000);
        }

        return () => clearTimeout(timer); // Cleanup the timer on component unmount or re-render
    }, [step_three]); // Reset the timer whenever step_three changes

    const handleDateChange = (date_appointment: any) => {
        setSelectedDate(date_appointment);
    };

    const handleHourChange = (hourRange: any) => {
        setSelectedHour(hourRange);
    };

    const onGoToStepTwo = () => {
        setStep_one(false);
        setStep_two(true);
    };

    const onGoToStepThree = () => {
        setStep_two(false);
        setStep_three(true);
    };

    const onAddMessageForm = (message: any) => {
        setMessage(message)

    }

    const sendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Special submitting for additional services
        // Define the selectedServices object with an index signature for string-based indexing
        const selectedServices: {
            [key: string]: string;
        } = {
            carpetCleaning: formDetails.additionalServices.carpetCleaning.selected ? 'Yes' : 'No',
            windowCleaning: formDetails.additionalServices.windowCleaning.selected ? 'Yes' : 'No',
            deepCleaning: formDetails.additionalServices.deepCleaning.selected ? 'Yes' : 'No',
            another: formDetails.additionalServices.another.selected ? 'Yes' : 'No',
        };

        console.log('Send button clicked');

        const formToSend = document.createElement('form');

        // Add formDetails directly to the form
        Object.keys(formDetails).forEach((key) => {
            const inputField = document.createElement('input');
            inputField.type = 'hidden';
            inputField.name = key;
            inputField.value = typeof formDetails[key] === 'object' ? JSON.stringify(formDetails[key]) : formDetails[key];
            formToSend.appendChild(inputField);
        });

        // Add selected services to the form
        Object.keys(selectedServices).forEach((key) => {
            const inputField = document.createElement('input');
            inputField.type = 'hidden';
            inputField.name = `selectedServices[${key}]`;
            inputField.value = selectedServices[key];
            formToSend.appendChild(inputField);
        });

        // Add message to the form
        const messageField = document.createElement('input');
        messageField.type = 'hidden';
        messageField.name = 'message';
        messageField.value = message;
        formToSend.appendChild(messageField);

        const calculatedPriceField = document.createElement('input');
        calculatedPriceField.type = 'hidden';
        calculatedPriceField.name = 'calculatedPrice';
        calculatedPriceField.value = price !== undefined ? price.toFixed(2).toString() : "No price";
        formToSend.appendChild(calculatedPriceField);


        // Add selected hour range to the form
        const hourRangeField = document.createElement('input');
        hourRangeField.type = 'hidden';
        hourRangeField.name = 'hourRange';
        hourRangeField.value = selectedHour;
        formToSend.appendChild(hourRangeField);

        // Add selected date of appointment to the form
        const dateAppointmentField = document.createElement('input');
        dateAppointmentField.type = 'hidden';
        dateAppointmentField.name = 'date_appointment';
        dateAppointmentField.value = selectedDate; // Assuming selectedDate is the date of appointment
        formToSend.appendChild(dateAppointmentField);

        // Now you can use the formToSend element in your email sending logic

        try {
            const response = await emailjs.sendForm(
                email_credentials.sevice_key,
                email_credentials.template_key,
                formToSend, // Use the dummy form as the 3rd parameter
                {
                    publicKey: email_credentials.email_key,
                }
            );
            // Log the form details before sending the email
            console.log('Form details to be sent:');
            formToSend.querySelectorAll('input').forEach((input) => {
                console.log(input.name + ':', input.value);
            });

            console.log('Email sent successfully:', response);
            setMessage('')
            onGoToStepThree(); // Proceed to step three after sending email
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const onHandleCancel = () => {
        handleCloseModal();
    };

    const handleServiceString = () => {
        if (formDetails.service.includes("Commercial")) {
            if (languageSelected !== "Spanish") {
                return "Commercial";
            } else {
                return "Comercial";
            }
        } else if (formDetails.service.includes("High")) {
            if (languageSelected === "Spanish") {
                return "Lavado alta presión";
            } else if (languageSelected === "French") {
                return "Lavage haute pression";
            } else {
                return "High pressure washing";
            }
        } else if (formDetails.service.includes("Chalet")) {
            if (languageSelected === "Spanish") {
                return "Limpieza de chalet/Airbnb";
            } else if (languageSelected === "French") {
                return "Nettoyage de chalet/Airbnb";
            } else {
                return "Chalet/Airbnb cleaning";
            }
        } else if (formDetails.service.includes("After")) {
            if (languageSelected === "Spanish") {
                return "Limpieza post-construcción";
            } else if (languageSelected === "French") {
                return "Nettoyage post-construction";
            } else {
                return "Post-construction cleaning";
            }
        } else if (formDetails.service.includes("Broker")) {
            if (languageSelected === "Spanish") {
                return "Limpieza para corredores inmobiliarios";
            } else if (languageSelected === "French") {
                return "Nettoyage pour courtiers immobiliers";
            } else {
                return "Cleaning for real estate brokers";
            }
        } else if (formDetails.service.includes("Residential")) {
            if (languageSelected === "Spanish") {
                return "Limpieza residencial";
            } else if (languageSelected === "French") {
                return "Nettoyage résidentiel";
            } else {
                return "Residential cleaning";
            }
        }
    };


    console.log(formDetails.additionalServices.info + " *********")

    return (
        <Modal style={{ marginTop: 40 }} open={showModal} onClose={handleCloseModal}>
            <div style={{ width: '90%', maxWidth: 800, margin: 'auto', backgroundColor: 'white', padding: 20, borderRadius: 5, maxHeight: '80vh', overflowY: 'auto' }}>
                {step_one && (
                    <>
                        <Typography variant="h6">{languageSelected != "Spanish" ? "Estimation" : "Estimación"} {handleServiceString()}</Typography>
                        <Typography variant="body1">{ }</Typography>

                        <TableContainer component={Paper} style={{ marginTop: 20 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>{languageSelected === "Spanish" ? "Información" : "Information"}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>{languageSelected === "French" ? "Votre nom" : languageSelected === "English" ? "Your name" : "Su nombre"}</strong></TableCell>
                                        <TableCell>{formDetails.name}

                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>{languageSelected === "French" ? "Votre Courriel" : languageSelected === "English" ? "Your email" : "Su email"}</strong></TableCell>
                                        <TableCell>{formDetails.email}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>{languageSelected === "French" ? "Date de rendez-vous" : languageSelected === "English" ? "Appointment Date" : "Fecha de su cita"}</strong></TableCell>
                                        <TableCell>{formDetails.date}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    {formDetails.bathrooms != '' && <>
                                        <TableRow>
                                            <TableCell><strong>{languageSelected === "French" ? "Sales de bain" : languageSelected === "English" ? "Bathrooms" : "Baños"}</strong></TableCell>
                                            <TableCell>{formDetails.bathrooms}</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </>
                                    }

                                    {
                                        formDetails.service.includes('Residential') ? (
                                            <TableRow>
                                                <TableCell><strong>{languageSelected === "French" ? "Chambres" : languageSelected === "English" ? "Rooms" : "Habitaciones"}</strong></TableCell>
                                                <TableCell>{formDetails.bedrooms}</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        ) : <TableRow>
                                            <TableCell><strong>{languageSelected === "French" ? "Pied Carre" : languageSelected === "English" ? "Square Feet" : "Pies Cuadrados"}</strong></TableCell>
                                            <TableCell>{formDetails.area}</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    }



                                    {/* <TableRow> */}
                                    {/* <TableCell><strong>Service</strong></TableCell> */}
                                    {/* <TableCell> */}

                                    {/* <TableRow> */}
                                    {/* <TableCell> */}
                                    {/* <strong>Inclus dans {formDetails.service}</strong>
                                                <ul>
                                                    <li>
                                                        Service basique
                                                    </li>
                                                    <li>
                                                        Service basique
                                                    </li>
                                                    <li>
                                                        Service basique
                                                    </li>
                                                    <li>
                                                        Service basique
                                                    </li>
                                                </ul> */}

                                    {/* </TableCell> */}
                                    {/* </TableRow> */}
                                    {/* </TableCell> */}
                                    {/* <TableCell></TableCell> */}
                                    {/* </TableRow> */}
                                    <TableRow>
                                        <TableCell>
                                            <strong>{languageSelected === "French" ? "Service additionels" : languageSelected === "English" ? "Additional Services" : "Servicios Adicionales"}</strong>
                                        </TableCell>
                                        <TableCell>

                                            <ul>
                                                {Object.entries(formDetails.additionalServices)
                                                    .filter(([_, service]) => service.selected) // Filter only selected services
                                                    .map(([serviceName, service]) => (
                                                        <li key={serviceName}>

                                                            {service.info}

                                                        </li>
                                                    ))}

                                            </ul>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <strong>
                                                {languageSelected === "French"
                                                    ? "Total Estimé"
                                                    : languageSelected === "English"
                                                        ? "Total Estimation"
                                                        : "Total Estimado"}
                                            </strong>
                                            <br />
                                            <Typography variant="body1">${price?.toFixed(2)}</Typography>
                                            <hr />
                                            <Alert>
                                                <small style={{ color: 'red' }}>
                                                    {languageSelected === "French"
                                                        ? "Tous les prix doivent être vérifiés auprès de nos opérateurs. Ceci est une estimation approximative."
                                                        : languageSelected === "English"
                                                            ? "All prices must be verified with our operators. This is an approximate estimation."
                                                            : "Todos los precios deben ser verificados con nuestros operadores. Esto es una estimación aproximada."}
                                                </small>
                                            </Alert>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TextField
                            id="message"
                            label={
                                languageSelected === "French"
                                    ? "Message"
                                    : languageSelected === "English"
                                        ? "Message"
                                        : "Mensaje"
                            }
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            placeholder={
                                languageSelected === "French"
                                    ? "Entrez votre message"
                                    : languageSelected === "English"
                                        ? "Enter your message"
                                        : "Ingrese su mensaje"
                            }
                            style={{ marginTop: 20 }}
                            value={message} // Bind the value of the TextField to the 'message' state
                            onChange={(e) => onAddMessageForm(e.target.value)} // Call onAddMessageForm when the value changes
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                            <Button variant="contained" color="primary" onClick={onGoToStepTwo}>
                                {languageSelected === "French"
                                    ? "Prendre un rendez-vous"
                                    : languageSelected === "English"
                                        ? "Schedule an appointment"
                                        : "Programar una cita"}
                            </Button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                            <Button variant="contained" onClick={onHandleCancel} style={{ marginRight: 10 }}>
                                {languageSelected === "French"
                                    ? "Fermer"
                                    : languageSelected === "English"
                                        ? "Close"
                                        : "Cerrar"}
                            </Button>
                        </div>

                    </>
                )}

                {step_two && (
                    <>



                        <EcoservRendezVousDatePicker handleDateChange={handleDateChange} handleHourChange={handleHourChange} />




                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                            <Button
                                style={{ marginRight: 10 }}
                                variant="contained"
                                color="primary"
                                onClick={sendEmail}
                            >
                                Send
                            </Button>


                            <Button
                                variant="contained"
                                onClick={onHandleCancel}
                            >
                                Cancel
                            </Button>
                        </div>

                    </>
                )}

                {step_three && <EcoservConfirmEstimation />}
            </div>
        </Modal>
    );
};