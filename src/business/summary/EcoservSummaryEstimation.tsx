import React, { useEffect, useRef, useState } from 'react';
import { Modal, Typography, Button, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { EcoservEstimationFormInterface } from '../../interfaces/EcoservEstimation';
import { EcoservRendezVousDatePicker } from '../../components/date_picker/EcoservRendezVousDatePicker';
import { EcoservConfirmEstimation } from './EcoservConfirmEstimation';
import emailjs from '@emailjs/browser';
import { email_credentials } from '../../key/EmailJsKey';

interface Props {
    showModal: boolean;
    handleCloseModal: () => void;
    formDetails: EcoservEstimationFormInterface;
}

export const EcoservSummaryEstimation = ({ showModal, handleCloseModal, formDetails }: Props) => {
    const [step_one, setStep_one] = useState(true);
    const [step_two, setStep_two] = useState(false);
    const [step_three, setStep_three] = useState(false);
    const [formData, setFormData] = useState({
        date: '', // Initialize with empty string
        hourRange: '', // Initialize with empty string or appropriate default value
    });

    const [] = useState({

    })
    const calculationResult = () => {
        // Calculate your result here based on formDetails or other data
        const result = "";
        return result;
    };

    const resetSteps = () => {
        setStep_one(true);
        setStep_two(false);
        setStep_three(false);
        onHandleCancel();
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (step_three) {
            timer = setTimeout(() => {
                resetSteps();
            }, 5000);
        }

        return () => clearTimeout(timer); // Cleanup the timer on component unmount or re-render
    }, [step_three]); // Reset the timer whenever step_three changes

    const handleDateChange = (date: { format: (arg0: string) => any; }) => {
        setFormData({ ...formData, date: date.format('YYYY-MM-DD') });
    };

    const handleHourChange = (hourRange: any) => {
        setFormData({ ...formData, hourRange });
    };

    const onGoToStepTwo = () => {
        setStep_one(false);
        setStep_two(true);
    };

    const onGoToStepThree = () => {
        setStep_two(false);
        setStep_three(true);
    };

    const sendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

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

        // Add selected hour range to the form
        const hourRangeField = document.createElement('input');
        hourRangeField.type = 'hidden';
        hourRangeField.name = 'hourRange';
        hourRangeField.value = formDetails.hourRange;
        formToSend.appendChild(hourRangeField);

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
            console.log('Email sent successfully:', response);
            onGoToStepThree(); // Proceed to step three after sending email
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };






    const onHandleCancel = () => {
        handleCloseModal();
    };

    return (
        <Modal style={{ marginTop: 40 }} open={showModal} onClose={handleCloseModal}>
            <div style={{ width: '90%', maxWidth: 800, margin: 'auto', backgroundColor: 'white', padding: 20, borderRadius: 5, maxHeight: '80vh', overflowY: 'auto' }}>
                {step_one && (
                    <>
                        <Typography variant="h6">Estimation </Typography>
                        <Typography variant="body1">{calculationResult()}</Typography>

                        <TableContainer component={Paper} style={{ marginTop: 20 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Info</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Nom</strong></TableCell>
                                        <TableCell>{formDetails.name}

                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Courriel</strong></TableCell>
                                        <TableCell>{formDetails.email}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Date</strong></TableCell>
                                        <TableCell>{formDetails.date}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Sales de bain</strong></TableCell>
                                        <TableCell>{formDetails.bathrooms}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Chambres</strong></TableCell>
                                        <TableCell>{formDetails.bedrooms}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Service</strong></TableCell>
                                        <TableCell>{formDetails.service}
                                            <hr />
                                            <TableRow>
                                                {/* <TableCell> */}
                                                <strong>Service inclus</strong>
                                                <ul>
                                                    <li>Service x</li>
                                                    <li>Service y</li>
                                                    <li>Service z</li>
                                                    <li>Service x</li>
                                                    <li>Service y</li>
                                                    <li>Service z</li>
                                                </ul>
                                                {/* </TableCell> */}
                                            </TableRow>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Service additionels</strong>
                                        </TableCell>
                                        <TableCell>
                                            {formDetails.service}
                                            <hr />
                                            <ul>
                                                {Object.keys(formDetails.additionalServices).map((serviceKey) => (
                                                    <li key={serviceKey}>
                                                        {serviceKey}: {formDetails.additionalServices[serviceKey].info}
                                                    </li>
                                                ))}
                                            </ul>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <strong>Total Estimé</strong>
                                            <br />
                                            <small style={{ color: 'red' }}>Tous les prix doivent être vérifiés auprès de nos opérateurs. Ceci est une estimation approximative.</small>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TextField
                            id="message"
                            label="Message"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="Enter your message"
                            style={{ marginTop: 20 }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                            <Button variant="contained" color="primary" onClick={onGoToStepTwo}>
                                Prendre un rendez-vous
                            </Button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                            <Button variant="contained" onClick={onHandleCancel} style={{ marginRight: 10 }}>
                                Close
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