import React from 'react';
import './ecoserv_details.css';

export const EcoserviceDetails = ({ image, onClose }: any) => {
  // Find the selected image based on id
  const selectedImage = image ? image : {};

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
        <h5>Description</h5>
        <p>
          {/* Add your detailed description here */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, mi at tincidunt dapibus,
          erat nunc posuere massa, id efficitur nulla orci eget tortor.
        </p>
      </div>
      <div className="button-section">
        <button onClick={onClose} className="close-button">Fermer les détails</button>
      </div>
    </div>
  );
};
