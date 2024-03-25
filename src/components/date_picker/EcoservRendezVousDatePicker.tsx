import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, MenuItem } from '@mui/material';

interface Props {
    handleDateChange: (date: any) => void;
    handleHourChange: (hourRange: any) => void;
}

export const EcoservRendezVousDatePicker: React.FC<Props> = ({ handleDateChange, handleHourChange }: Props) => {
    const [selectedHour, setSelectedHour] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs(Date.now()).toDate());

    const onSelectedDateChange = (date: any) => {
        if (date) {
            setSelectedDate(date);
            handleDateChange(dayjs(date).format('YYYY-MM-DD'));
        }
    };

    const onHourChange = (event: any) => {
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
                <DemoItem label="Choisis un jour pour votre rendez-vous">
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
                label="Select Hour Range"
                value={selectedHour}
                onChange={onHourChange}
                fullWidth
                style={{ marginTop: 20 }}
            >
                <MenuItem value="9am-12pm">9 AM - 12 PM</MenuItem>
                <MenuItem value="1pm-4pm">1 PM - 4 PM</MenuItem>
                <MenuItem value="5pm-8pm">5 PM - 8 PM</MenuItem>
            </TextField>
        </LocalizationProvider>
    );
};
