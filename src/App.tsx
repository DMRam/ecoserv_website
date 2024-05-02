import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EcoservNavbar } from './components/header/EcoservNavbar';
import logoSrc from './assets/coserv-high-resolution-logo-transparent.png';
import { EcoservFooter } from './components/footer/EcoservFooter';
import { EcoserviceDetails } from './business/services/services_details/EcoserviceDetails';
import { EcoservHome } from './business/landing/EcoservHome';
import { Provider } from 'react-redux';
import store from './store';
import { EcoservAdmin } from './business/admin/EcoservAdmin';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <EcoservNavbar logoSrc={logoSrc} />
        <Routes>
          <Route path='/' element={<EcoservHome />} />
          <Route path="/image-details/:id" element={<EcoserviceDetails />} />
          <Route path="/" element={<EcoservAdmin />} />
        </Routes>
        <EcoservFooter />
      </BrowserRouter>
    </Provider>
  );
};
