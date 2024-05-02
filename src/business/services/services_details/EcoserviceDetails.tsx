import React from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import './ecoserv_details.css';

export const EcoserviceDetails = ({ image, onClose }: any) => {
  // Find the selected image based on id
  const selectedImage = image ? image : {};
  const { languageSelected } = useLanguage()
  return (
    <div className="image-details">
      <div className="image-header">
        <img src={selectedImage.img} alt={selectedImage.title} className="image-preview" />
      </div>
      <div >
        <h4>{selectedImage.title}</h4>
      </div>
      <hr />
      <div className="description-section">
        <h5>
          <h5>
            {languageSelected === "French" ?
              "Description" :
              languageSelected === "Spanish" ?
                "Descripción" :
                "Description"}
          </h5>
        </h5>
        <p>

          {languageSelected === "French" ? "Text on français" : languageSelected === "Spanish" ? "Texto en Español" : "Text in english"}
        </p>
      </div>
      <div className="button-section">
        <button onClick={onClose} className="close-button">

          {languageSelected === "French" ? "Fermer les détails" : languageSelected === "Spanish" ? "Cerrar detalles" : "Close Details"}
        </button>
      </div>
    </div>
  );
};
