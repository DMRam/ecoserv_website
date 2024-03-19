import React from 'react'
import { EcoservCarousel } from './components/carousel/EcoservCarousel'
import { EcoservNavbar } from './components/header/EcoservNavbar'
import logoSrc from './assets/coserv-high-resolution-logo-transparent.png';
import { EcoservImageList } from './business/services/EcoservImageList';
import { EcoservFooter } from './components/footer/EcoservFooter';
import { TestGrid } from './business/services/TestGrid';
import { itemData } from './data/services_data/ServicesData';


export const App = () => {

  return (
    <>
      <EcoservNavbar logoSrc={logoSrc} />
      <EcoservCarousel />
      {/* <EcoserviceSection /> */}
      {/* <EcoservImageList /> */}

      <TestGrid images={itemData} />
      <EcoservFooter />
    </>
  )
}
