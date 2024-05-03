import { Modal, Box } from '@mui/material';
import React, { useState } from 'react';
import { EcoservCarousel } from '../../components/carousel/EcoservCarousel';
import { EcoservContactForm } from '../../components/forms/EcoservContactForm';
import { EcoservEstimationForm } from '../../components/forms/EcoservEstimationForm';
import { itemData } from '../../data/services_data/ServicesData';
import { useModal } from '../../hooks/useModal';
import { EcoservImageGrid } from '../services/EcoservImageGrid';

export const EcoservHome = () => {
    const [closeModal, setCloseModal] = useState(false);
    const { modalState, switchModal } = useModal();

    const onClose = () => {
        switchModal();
    };

    return (
        <>
            <EcoservCarousel />
            <div id='services'>
                <EcoservImageGrid images={itemData} />
            </div>
            <div id='estimation'>
                <EcoservEstimationForm />
            </div>

            <Modal open={modalState} onClose={onClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <EcoservContactForm closeOnSubmission={onClose} />
                </Box>
            </Modal>
        </>
    );
};
