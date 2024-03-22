import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, MenuItem } from '@mui/material';

export const EcoservRendezVousDatePicker = () => {
    const [selectedHour, setSelectedHour] = useState('');

    const handleHourChange = (event: any) => {
        setSelectedHour(event.target.value);
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
                    <MobileDatePicker disablePast={true} defaultValue={dayjs(Date.now())} />
                </DemoItem>
            </DemoContainer>

            {/* Hour Range Selection */}
            <TextField
                select
                label="Select Hour Range"
                value={selectedHour}
                onChange={handleHourChange}
                fullWidth
                style={{ marginTop: 20 }}
            >
                <MenuItem value="9am-12pm">9 AM - 12 PM</MenuItem>
                <MenuItem value="1pm-4pm">1 PM - 4 PM</MenuItem>
                <MenuItem value="5pm-8pm">5 PM - 8 PM</MenuItem>
            </TextField>
        </LocalizationProvider>
    );
}
