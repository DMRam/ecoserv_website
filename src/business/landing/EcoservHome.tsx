import React from 'react'
import { EcoservCarousel } from '../../components/carousel/EcoservCarousel'
import { EcoservEstimationForm } from '../../components/forms/EcoservEstimationForm'
import { itemData } from '../../data/services_data/ServicesData'
import { EcoservImageGrid } from '../services/EcoservImageGrid'


export const EcoservHome = () => {
    return (
        <>
            <EcoservCarousel />
            <div id='services'>
                <EcoservImageGrid images={itemData} /></div>
                <div id='estimation'>
            <EcoservEstimationForm /></div>
        </>
    )
}
