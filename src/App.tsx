import React from 'react'
import { EcoservCarousel } from './components/carousel/EcoservCarousel'
import { EcoservNavbar } from './components/header/EcoservNavbar'
import logoSrc from './assets/coserv-high-resolution-logo-transparent.png';
import { EcoservFooter } from './components/footer/EcoservFooter';
import { TestGrid } from './business/services/TestGrid';
import { itemData } from './data/services_data/ServicesData';
import { TarifSection } from './business/tarif/EcoservTarif';
import './App.css'
import { EcoservEstimationForm } from './components/forms/EcoservEstimationForm';


export const App = () => {

  return (
    <>
      <EcoservNavbar logoSrc={logoSrc} />
      <EcoservCarousel />
      <TestGrid images={itemData} />
      <TarifSection />
      <EcoservEstimationForm />
      <EcoservFooter />
    </>
  )
}
