import React from 'react';

interface ServiceItemProps {
  imageSrc?: string;
  title?: string;
}

export const EcoserviceItem: React.FC<ServiceItemProps> = ({ imageSrc, title }) => {
  return (
    <div className="service-item">
      <a href="#" className="service-link">
        <img src={imageSrc} alt={title} className="service-image" />
        <h3 className="service-title">{title}</h3>
      </a>
    </div>
  );
};