import React from 'react'
import { EcoservCarousel } from '../../components/carousel/EcoservCarousel'
import { EcoservEstimationForm } from '../../components/forms/EcoservEstimationForm'
import { itemData } from '../../data/services_data/ServicesData'
import { EcoservImageGrid } from '../services/EcoservImageGrid'
import { TarifSection } from '../tarif/EcoservTarif'

export const EcoservHome = () => {
    return (
        <>
            <EcoservCarousel />
            <EcoservImageGrid images={itemData} />
            <TarifSection />
            <EcoservEstimationForm />
        </>
    )
}
