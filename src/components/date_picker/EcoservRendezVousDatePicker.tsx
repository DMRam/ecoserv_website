import React, { useState } from 'react';
import dayjs from 'dayjs'; // Import dayjs library
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, MenuItem } from '@mui/material';
import { useLanguage } from '../../hooks/useLanguage';

interface Props {
    handleDateChange: (date: string) => void; // Change type to string
    handleHourChange: (hourRange: string) => void; // Change type to string
}

export const EcoservRendezVousDatePicker: React.FC<Props> = ({ handleDateChange, handleHourChange }: Props) => {
    const [selectedHour, setSelectedHour] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
    const { languageSelected } = useLanguage()

    const onSelectedDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            setSelectedDate(date);
            const formattedDate = date.format('YYYY-MM-DD'); // Format date using dayjs
            handleDateChange(formattedDate);
        }
    };

    const onHourChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { value } = event.target;
        setSelectedHour(value as string);
        handleHourChange(value as string);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'DatePicker',
                    'MobileDatePicker',
                ]}
            >
                <DemoItem label={languageSelected === 'French' ? "Choisis un jour pour votre rendez-vous" : languageSelected === "English" ? "Select a day for your appointment" : "Seleccione un dia para su cita"}>
                    <MobileDatePicker
                        disablePast
                        value={selectedDate}
                        onChange={onSelectedDateChange}
                    />
                </DemoItem>
            </DemoContainer>

            {/* Hour Range Selection */}
            <TextField
                select
                label={
                    languageSelected === "French"
                        ? "Choisissez votre plage horaire"
                        : languageSelected === "English"
                            ? "Select Hour Range"
                            : "Seleccione rango horario"
                }
                value={selectedHour}
                onChange={onHourChange}
                fullWidth
                style={{ marginTop: 20 }}
            >
                <MenuItem value="9am-12pm">9 AM - 12 PM</MenuItem>
                <MenuItem value="1pm-4pm">1 PM - 4 PM</MenuItem>
                <MenuItem value="5pm-8pm">5 PM - 8 PM</MenuItem>
            </TextField>
        </LocalizationProvider >
    );
};
