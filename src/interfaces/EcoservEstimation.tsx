export interface EcoservEstimationFormInterface {
    name: string;
    email: string;
    area: string;
    bedrooms: string;
    bathrooms: string;
    service: string;
    date: string;
    additionalServices: {
        [key: string]: {
            selected: boolean;
            info: string;
        };
    };
    [key: string]: any; // Index signature to allow string-based indexing
}
