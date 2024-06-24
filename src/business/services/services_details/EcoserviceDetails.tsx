import React from 'react';
import { data_details_translations } from '../../../data/services_data/ecoserv_locale/DataTradcutions';
import { useLanguage } from '../../../hooks/useLanguage';
import styles from './ecoserv_details.module.css'


export const EcoserviceDetails = ({ image, onClose }: any) => {
  const selectedImage = image || {};
  const { languageSelected } = useLanguage();

  const getDescription = () => {
    if (languageSelected === 'French') {
      if (selectedImage.title.includes('Résidentiel')) {
        return data_details_translations.description_residentiel_fra;
      } else if (selectedImage.title.includes('Commercial')) {
        return data_details_translations.description_commercial_fra;
      }
      else if (selectedImage.title.includes('Chalet')) {
        return data_details_translations.description_chalet_fra;
      }
      else if (selectedImage.title.includes('Aprés')) {
        return data_details_translations.description_AC_fra;
      } else if (selectedImage.title.includes('Courtier')) {
        return data_details_translations.description_broker_fra;
      } else if (selectedImage.title.includes('Lavage')) {
        return data_details_translations.description_HP_fra;
      }
    } else if (languageSelected === 'Spanish') {
      if (selectedImage.title.includes('Residencial')) {
        return data_details_translations.description_residentiel_esp;
      } else if (selectedImage.title.includes('Comercial')) {
        return data_details_translations.description_commercial_esp;
      } else if (selectedImage.title.includes('Chalet')) {
        return data_details_translations.description_chalet_esp;
      } else if (selectedImage.title.includes('Después')) {
        return data_details_translations.description_AC_esp;
      } else if (selectedImage.title.includes('Corredor')) {
        return data_details_translations.description_broker_esp;
      } else if (selectedImage.title.includes('Lavado')) {
        return data_details_translations.description_HP_esp;
      }
    } else {
      if (selectedImage.title.includes('Residential')) {
        return data_details_translations.description_residentiel_eng;
      } else if (selectedImage.title.includes('Commercial')) {
        return data_details_translations.description_commercial_eng;
      } else if (selectedImage.title.includes('Chalet')) {
        return data_details_translations.description_chalet_eng;
      } else if (selectedImage.title.includes('After')) {
        return data_details_translations.description_AC_eng;
      } else if (selectedImage.title.includes('Broker')) {
        return data_details_translations.description_broker_eng;
      } else if (selectedImage.title.includes('High')) {
        return data_details_translations.description_HP_eng;
      }
    }

    // Default return if no specific condition is met
    return 'No description available';
  };


  const getDescriptionList = () => {
    let descriptionList;
    if (languageSelected === 'French' && selectedImage.title.includes('Résidentiel')) {
      descriptionList = data_details_translations.description_residentiel_list_fra;
    } else if (languageSelected === 'Spanish') {
      descriptionList = data_details_translations.description_residentiel_list_esp;
    } else {
      descriptionList = data_details_translations.description_residentiel_list_eng;
    }



    return (
      <ul>
        {descriptionList.map((item: string, index: number) => (
          <li style={{ margin: 3 }} key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.ecoserviceCard} style={{ fontFamily: 'Roboto Light, Roboto, Arial, sans-serif' }}>
      <div className={styles.ecoserviceImage}>
        <img style={{ width: '100%' }} src={selectedImage.img} alt={selectedImage.title} className={styles.imagePreview} />
      </div>
      <div className={styles.ecoserviceDetails}>
        <h4>{languageSelected === 'French' ? selectedImage.title : languageSelected === 'English' ? selectedImage.titleEN : selectedImage.titleES}</h4>
        <hr />
        <h5>{languageSelected === "French" ? "Description" : languageSelected === "Spanish" ? "Descripción" : "Description"}</h5>
        <p>{getDescription()}</p>
        <h5>{languageSelected === "French" ? "Liste des détails" : languageSelected === "Spanish" ? "Lista de detalles" : "Details List"}</h5>
        {getDescriptionList()}
      </div>
      <div className={styles.buttonSection} style={{ textAlign: 'center' }}>
        <button onClick={onClose} className={styles.closeButton}>
          {languageSelected === "French" ? "Fermer les détails" : languageSelected === "Spanish" ? "Cerrar detalles" : "Close Details"}
        </button>
      </div>
    </div>

  );
};