import React from 'react';
import { data_details_translations } from '../../../data/services_data/ecoserv_locale/DataTradcutions';
import { useLanguage } from '../../../hooks/useLanguage';
import styles from './ecoserv_details.module.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';


export const EcoserviceDetails = ({ image, onClose }: any) => {
  const selectedImage = image || {};
  const { languageSelected } = useLanguage();

  const getDescription = () => {

    console.log(selectedImage.title + " #########selectedImage.title")
    if (languageSelected === 'French') {
      // This is evaluated as Résidentiel for the three languages and filtered by languaje selected
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
      if (selectedImage.title.includes('Résidentiel')) {
        return data_details_translations.description_residentiel_esp;
      } else if (selectedImage.title.includes('Commercial')) {
        return data_details_translations.description_commercial_esp;
      } else if (selectedImage.title.includes('Chalet')) {
        return data_details_translations.description_chalet_esp;
      } else if (selectedImage.title.includes('Aprés')) {
        return data_details_translations.description_AC_esp;
      } else if (selectedImage.title.includes('Courtier')) {
        return data_details_translations.description_broker_esp;
      } else if (selectedImage.title.includes('Lavage')) {
        return data_details_translations.description_HP_esp;
      }
    } else {
      if (selectedImage.title.includes('Résidentiel')) {
        return data_details_translations.description_residentiel_eng;
      } else if (selectedImage.title.includes('Commercial')) {
        return data_details_translations.description_commercial_eng;
      } else if (selectedImage.title.includes('Chalet')) {
        return data_details_translations.description_chalet_eng;
      } else if (selectedImage.title.includes('Aprés')) {
        return data_details_translations.description_AC_eng;
      } else if (selectedImage.title.includes('Courtier')) {
        return data_details_translations.description_broker_eng;
      } else if (selectedImage.title.includes('Lavage')) {
        return data_details_translations.description_HP_eng;
      }
    }

    // Default return if no specific condition is met
    return 'No description available';
  };


  const getDescriptionList = () => {
    let descriptionList;
    console.log(languageSelected + " <------")
    console.log(selectedImage.title + " <------")

    if (languageSelected === 'French') {
      if (selectedImage.title.includes('Résidentiel')) {
        descriptionList = data_details_translations.description_residentiel_list_fra;
      } else if (selectedImage.title.includes('Commercial')) {
        descriptionList = data_details_translations.description_commercial_list_fra;
      } else if (selectedImage.title.includes('Chalet')) {
        descriptionList = data_details_translations.description_chalet_list_fra
      } else if (selectedImage.title.includes('Aprés')) {
        descriptionList = data_details_translations.description_AC_list_fra
      } else if (selectedImage.title.includes('Courtier')) {
        descriptionList = data_details_translations.description_broker_list_fra
      }
    }

    if (languageSelected === 'English') {
      if (selectedImage.title.includes('Résidentiel')) {
        descriptionList = data_details_translations.description_residentiel_list_eng;
      } else if (selectedImage.title.includes('Commercial')) {
        descriptionList = data_details_translations.description_commercial_list_eng
      } else if (selectedImage.title.includes('Chalet')) {
        descriptionList = data_details_translations.description_chalet_list_eng
      } else if (selectedImage.title.includes('Aprés')) {
        descriptionList = data_details_translations.description_AC_list_eng
      } else if (selectedImage.title.includes('Courtier')) {
        descriptionList = data_details_translations.description_broker_list_eng
      }
    }
    if (languageSelected === 'Spanish') {
      if (selectedImage.title.includes('Résidentiel')) {
        descriptionList = data_details_translations.description_residentiel_list_esp;
      } else if (selectedImage.title.includes('Commercial')) {
        descriptionList = data_details_translations.description_commercial_list_esp;
      } else if (selectedImage.title.includes('Chalet')) {
        descriptionList = data_details_translations.description_chalet_list_esp
      } else if (selectedImage.title.includes('Aprés')) {
        descriptionList = data_details_translations.description_AC_list_esp
      } else if (selectedImage.title.includes('Courtier')) {
        descriptionList = data_details_translations.description_broker_list_esp
      }
    }
    return (
      <>
        {descriptionList?.map((item: string, index: number) => (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem>
            
              <ListItemText secondary={item} />
              {/* <li style={{ margin: 3 }} key={index}>{item}</li> */}
            </ListItem>
          </List>
        ))}
      </>

    );
  };

  return (
    <div className={styles.ecoserviceCard} style={{ fontFamily: 'Roboto Light, Roboto, Arial, sans-serif' }}>
      <div className={styles.ecoserviceImage}>
        <img style={{ width: '100%' }} src={selectedImage.img} alt={selectedImage.title} className={styles.imagePreview} />
      </div>
      <div className={styles.ecoserviceDetails}>
        <h4>{languageSelected === 'French' ? selectedImage.title : languageSelected === 'English' ? selectedImage.titleEN : selectedImage.titleES}</h4>
        
        <h5>{languageSelected === "French" ? "Description" : languageSelected === "Spanish" ? "Descripción" : "Description"}</h5>
        <p>{getDescription()}</p>
        <hr />
        <h6>{languageSelected === "French" ? "Liste des détails" : languageSelected === "Spanish" ? "Lista de detalles" : "Details List"}</h6>
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