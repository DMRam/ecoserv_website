import { data_details_translations } from "./ecoserv_locale/DataTradcutions";

export const itemData = [
    {
        id: '1',
        img: 'https://oceanicknettoyage.com/wp-content/uploads/2023/09/soins-adaptes-1.png',
        title: 'Résidentiel',
        titleEN: 'Residential',
        titleES: 'Residencial',
        author: '',
        rows: 4,
        cols: 2,
        featured: true,
        description_fra: data_details_translations.description_residentiel_fra,
        description_eng: data_details_translations.description_residentiel_eng,
        description_esp: data_details_translations.description_residentiel_esp
    },
    {
        id: '2',
        img: 'https://kaizenaire.com/wp-content/uploads/2023/12/Commercial-Cleaning-Services-in-Singapore-Keeping-Your-Business-Sparkling-Clean-1024x585.jpg',
        title: 'Commercial',
        titleEN: 'Commercial',
        titleES: 'Comercial',
        author: '',
        description_fra: data_details_translations.description_commercial_fra,
        description_eng: data_details_translations.description_commercial_eng,
        description_esp: data_details_translations.description_commercial_esp
    },
    {
        id: '3',
        img: 'https://thinkdifferentnetwork.com/wp-content/uploads/2019/03/Chalet-style-in-the-interior-of-apartments-and-houses3.jpg',
        title: 'Chalet/Airbnb',
        titleEN: 'Chalet/Airbnb',
        titleES: 'Chalet/Airbnb',
        author: '',
        description_fra: data_details_translations.description_chalet_fra,
        description_eng: data_details_translations.description_chalet_eng,
        description_esp: data_details_translations.description_chalet_esp
    },
    {
        id: '4',
        img: 'https://medias.kiloutou.fr/trs/1982/1320/fit/kite/output/v2/content/media-library/blog_comment_reussir_travaux_fin_chantier_main_c7c72a3696.jpg',
        title: 'Aprés construction',
        titleEN: 'After Construction',
        titleES: 'Después de la construcción',
        author: '',
        description_fra: data_details_translations.description_AC_fra,
        description_eng: data_details_translations.description_AC_eng,
        description_esp: data_details_translations.description_AC_esp
    },
    {
        id: '5',
        img: 'https://souaclean.fr/wp-content/uploads/2021/12/nettoyage-fin-chantier-Var-83.jpg',
        title: 'Courtier Immobilier',
        titleEN: 'Broker',
        titleES: 'Corredor inmobiliario',
        author: '',
        description_fra: data_details_translations.description_broker_fra,
        description_eng: data_details_translations.description_broker_eng,
        description_esp: data_details_translations.description_broker_esp
    },
    {
        id: '6',
        img: 'https://homeservices.cr/wp-content/uploads/2021/06/lavado-a-presion-1.jpg',
        title: "Lavage haute pression",
        titleEN: 'High pressure washing',
        titleES: 'Lavado de alta presión',
        author: '',
        description_fra: data_details_translations.description_HP_fra,
        description_eng: data_details_translations.description_HP_eng,
        description_esp: data_details_translations.description_HP_esp
    },
]

// ===============================================

export const translationsAdditionalServicesBoxes: any = {
    French: {
        carpetCleaning: 'Service de nettoyage de tapis',
        windowCleaning: 'Service de nettoyage de fenêtres',
        deepCleaning: 'Service de nettoyage en profondeur',
        another: 'Service de nettoyage additionel',
    },
    Spanish: {
        carpetCleaning: 'Servicio de limpieza de alfombras',
        windowCleaning: 'Servicio de limpieza de ventanas',
        deepCleaning: 'Servicio de limpieza profunda',
        another: 'Servicio de limpieza adicional',
    },
    English: {
        carpetCleaning: 'Carpet Cleaning Service',
        windowCleaning: 'Window Cleaning Service',
        deepCleaning: 'Deep Cleaning Service',
        another: 'Additional Cleaning Service',
    },
};

export const estimationFormTranslationText = [
    {
        french: {
            title: 'Estimation',
            nomLabel: 'Votre nom',
            emailLabel: 'Votre Couriel',
            serviceLabel: 'Service',
            options: {
                op1: 'Nettoyage Commercial',
                op2: "Lavage d'haute pression",
                op3: 'Nettoyage Chalet/Airbnb',
                op4: 'Nettoyage Aprés construction',
                op5: 'Nettoyage Courtier Immobilier',
                op6: 'Nettoyage Résidentiel'
            }
        },
        english: {
            title: 'Estimation',
            nomLabel: 'Your name',
            emailLabel: 'Your email',
            serviceLabel: 'Service',
            options: {
                op1: 'Commercial Commercial Cleaning',
                op2: "High pressure Cleaning",
                op3: 'Chalet/Airbnb Cleaning',
                op4: 'After Construction Cleaning',
                op5: 'Broker Cleaning',
                op6: 'Residential Cleaning'
            }
        },
        spanish: {
            title: 'Estimación',
            nomLabel: 'Tu nombre',
            emailLabel: 'Tu correo',
            serviceLabel: 'Servicio',
            options: {
                op1: 'Aseo Comercial',
                op2: "Lavado de alta presión",
                op3: 'Aseo Chalet/Airbnb',
                op4: 'Aseo después de la Construcción',
                op5: 'Aseo Corredor inmobiliario',
                op6: 'Aseo Residencial'
            }
        }
    }
]