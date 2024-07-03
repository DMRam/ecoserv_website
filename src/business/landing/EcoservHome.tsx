import { Modal, Box, Divider } from '@mui/material';
import React, { useState } from 'react';
import { EcoservCarousel } from '../../components/carousel/EcoservCarousel';
import { EcoservContactForm } from '../../components/forms/EcoservContactForm';
import { EcoservEstimationForm } from '../../components/forms/EcoservEstimationForm';
import { itemData } from '../../data/services_data/ServicesData';
import { useLanguage } from '../../hooks/useLanguage';
import { useModal } from '../../hooks/useModal';
import { EcoservImageGrid } from '../services/EcoservImageGrid';

export const EcoservHome = () => {
    const [closeModal, setCloseModal] = useState(false);
    const { modalState, switchModal } = useModal();
    const { languageSelected } = useLanguage()

    const onClose = () => {
        switchModal();
    };

    return (
        <div id='home'>
            <EcoservCarousel />
            <Divider >{languageSelected === 'Spanish' ? "Servicios" : 'Services'}</Divider>
            <div id='services'>
                <EcoservImageGrid images={itemData} />
            </div>
            <Divider > </Divider>
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
        </div>
    );
};
