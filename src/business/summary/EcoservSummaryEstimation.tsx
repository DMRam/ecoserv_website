import React, { useEffect, useState } from 'react';
import { Modal, Typography, Button, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { EcoservEstimationFormInterface } from '../../interfaces/EcoservEstimation';
import { EcoservRendezVousDatePicker } from '../../components/date_picker/EcoservRendezVousDatePicker';
import { EcoservConfirmEstimation } from './EcoservConfirmEstimation';

interface Props {
    showModal: boolean;
    handleCloseModal: () => void;
    formDetails: EcoservEstimationFormInterface;
}

export const EcoservSummaryEstimation = ({ showModal, handleCloseModal, formDetails }: Props) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [displayCalendar, setDisplayCalendar] = useState(false);
    const [estimationWasSubmited, setEstimationWasSubmited] = useState(false);
    const [step_one, setStep_one] = useState(true);
    const [step_two, setStep_two] = useState(false);
    const [step_three, setStep_three] = useState(false);
    const [loading, setLoading] = useState(true);

    const calculationResult = () => {
        // Calculate your result here based on formDetails or other data
        const result = "";
        return result;
    };

    const resetSteps = () => {
        setStep_one(true)
        setStep_two(false)
        setStep_three(false)
        onHandleCancel()
    }

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;

        if (step_three) {
            timer = setTimeout(() => {
                resetSteps();
            }, 5000);
        }

        return () => clearTimeout(timer); // Cleanup the timer on component unmount or re-render
    }, [step_three]); // Reset the timer whenever step_three changes



    const onGoToStepTwo = () => {
        setStep_one(!step_one)
        setStep_two(!step_two)
    };

    const onGoToStepThree = () => {
        setStep_two(!step_two)
        setStep_three(!step_three)
        // setStep_one(!step_one)
    };

    const onHandleCancel = () => {
        handleCloseModal()
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
                            <Button variant="contained" onClick={handleCloseModal} style={{ marginRight: 10 }}>
                                Close
                            </Button>
                        </div>
                    </>
                )}


                {step_two && (
                    <>
                        <EcoservRendezVousDatePicker />
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                            <Button style={{ marginRight: 10 }} variant="contained" color="primary" onClick={onGoToStepThree}>
                                Send
                            </Button>
                            <Button variant="contained" onClick={onHandleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </>
                )}  {step_three && (<>
                    <EcoservConfirmEstimation />
                </>)}
            </div>
        </Modal>
    );
};
