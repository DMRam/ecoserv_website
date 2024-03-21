import React, { useState } from 'react';
import { Modal, Typography, Button, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { EcoservEstimationFormInterface } from '../../interfaces/EcoservEstimation';
import { EcoservRendezVousDatePicker } from '../../components/date_picker/EcoservRendezVousDatePicker';

interface Props {
    showModal: boolean;
    handleCloseModal: () => void;
    formDetails: EcoservEstimationFormInterface;
}

export const EcoservSummaryEstimation = ({ showModal, handleCloseModal, formDetails }: Props) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [displayCalendar, setDisplayCalendar] = useState(false);

    const calculationResult = () => {
        // Calculate your result here based on formDetails or other data
        const result = "";
        return result;
    };

    const onDisplayCalendar = () => {
        // setDisplayCalendar(!displayCalendar);
    };

    const onHandleCancel = () => {
        setDisplayCalendar(!displayCalendar);
        handleCloseModal();
    };

    return (
        <Modal style={{ marginTop: 40 }} open={showModal} onClose={handleCloseModal}>
            <div style={{ width: '90%', maxWidth: 800, margin: 'auto', backgroundColor: 'white', padding: 20, borderRadius: 5, maxHeight: '80vh', overflowY: 'auto' }}>
                {!displayCalendar ? (
                    <>
                        <Typography variant="h6">Estimation </Typography>
                        <Typography variant="body1">{calculationResult()}</Typography>

                        <TableContainer component={Paper} style={{ marginTop: 20 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Info</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Nom</strong></TableCell>
                                        <TableCell>{formDetails.name}</TableCell>
                                        <TableCell>$$$</TableCell>
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
                                        <TableCell>{formDetails.service}</TableCell>
                                        <TableCell></TableCell>
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
                            <Button variant="contained" color="primary" onClick={onDisplayCalendar}>
                                Prendre un rendez-vous
                            </Button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                            <Button variant="contained" onClick={handleCloseModal} style={{ marginRight: 10 }}>
                                Close
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <EcoservRendezVousDatePicker />
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                            <Button style={{ marginRight: 10 }} variant="contained" color="primary" onClick={onDisplayCalendar}>
                                Send
                            </Button>
                            <Button variant="contained" onClick={onHandleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};
