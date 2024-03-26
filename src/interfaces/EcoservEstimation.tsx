export interface EcoservEstimationFormInterface {
    name: string;
    email: string;
    area: string;
    bedrooms: string;
    bathrooms: string;
    service: string;
    date: string;
    date_appointment: string, // Initialize with empty string
    hourRange: string;
    additionalServices: {
        [key: string]: {
            selected: boolean;
            info: string;
        };
    };
    [key: string]: any; // Index signature to allow string-based indexing
}
