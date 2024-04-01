import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, Slider, SelectChangeEvent } from '@mui/material';
import { usePriceCalculations } from '../../hooks/usePriceCalculations';

export const EcoservAdminSlide: React.FC = () => {
    const [size, setSize] = useState<string>('');
    const [effort, setEffort] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [clientType, setClientType] = useState<string>('');
    const [contractType, setContractType] = useState<string>('');
    const [squareFeet, setSquareFeet] = useState<number>(0);
    const [daysAWeek, setDaysAWeek] = useState<number>(0);
    const [basePrice, setBasePrice] = useState<number>(0);
    const [finalPrice, setFinalPrice] = useState<number>(0);

    const onSubmitCalculation = () => {
        
    }

    const onCalculate = () => {
        onSubmitCalculation();
    }

    const handleDaysAWeekChange = (event: Event, value: number | number[]) => {
        setDaysAWeek(value as number);
        calculateIntermediatePrice();
    };

    const handleSizeChange = (event: SelectChangeEvent<string>) => {
        setSize(event.target.value as string);
    };

    const handleClientTypeChange = (event: SelectChangeEvent<string>) => {
        setClientType(event.target.value as string);
    };

    const handleP2Change = (event: Event, value: number | number[]) => {
        setSquareFeet(value as number);
        calculateIntermediatePrice();
    };

    const handleEffortChange = (event: SelectChangeEvent<string>) => {
        setEffort(event.target.value as string);
    };

    const handleLocationChange = (event: SelectChangeEvent<string>) => {
        setLocation(event.target.value as string);
    };

    const calculateIntermediatePrice = () => {
        if (clientType && size && effort && location && squareFeet !== 0 && daysAWeek !== 0) {
            onSubmitCalculation();
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        calculateIntermediatePrice();

        // console.log("----------->>>>>> "+calculateCommercialFinalPrice(clientType, daysAWeek, 3, squareFeet))
    };



    return (
        <Container maxWidth="sm">
            <Typography style={{ textAlign: 'center' }} variant="h4" gutterBottom>Cleaning Pricing Calculator</Typography>
            <form onSubmit={handleSubmit}>
                {/* Your form controls */}
                {/* Client Type */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="sizeLabel">Client type</InputLabel>
                    <Select
                        labelId="sizeLabel"
                        id="sizeDropdown"
                        value={clientType}
                        onChange={handleClientTypeChange}
                    >
                        <MenuItem value="Residential">Residential</MenuItem>
                        <MenuItem value="Commercial">Commercial</MenuItem>
                        <MenuItem value="Airbnb">Airbnb</MenuItem>
                        <MenuItem value="After Lease">After Lease</MenuItem>
                        <MenuItem value="Renovation">Renovation</MenuItem>
                    </Select>
                </FormControl>

                {/* Size (if Residential) */}
                {clientType === 'Residential' && (
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="sizeLabel">Size</InputLabel>
                        <Select
                            labelId="sizeLabel"
                            id="sizeSelect"
                            value={size}
                            onChange={handleSizeChange}
                        >
                            {/* Options for size */}
                        </Select>
                    </FormControl>
                )}

                {/* Effort */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="effortLabel">Effort</InputLabel>
                    <Select
                        labelId="effortLabel"
                        id="effortSelect"
                        value={effort}
                        onChange={handleEffortChange}
                    >
                        {/* Options for effort */}
                    </Select>
                </FormControl>

                {/* Location */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="locationLabel">Location</InputLabel>
                    <Select
                        labelId="locationLabel"
                        id="locationSelect"
                        value={location}
                        onChange={handleLocationChange}
                    >
                        {/* Options for location */}
                    </Select>
                </FormControl>

                {/* Square Feet (if Commercial) */}
                {clientType === 'Commercial' && (
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="squareFeetLabel">Square Feet</InputLabel>
                        <Slider
                            id="squareFeetSlider"
                            value={squareFeet}
                            onChange={handleP2Change}
                            aria-labelledby="squareFeetLabel"
                            min={0}
                            max={5000}
                            step={100}
                            marks
                        />
                    </FormControl>
                )}

                {/* Days a Week */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="daysLabel">Days a Week</InputLabel>
                    <Slider
                        id="daysSlider"
                        value={daysAWeek}
                        onChange={handleDaysAWeekChange}
                        aria-labelledby="daysLabel"
                        min={0}
                        max={7}
                        step={1}
                        marks
                    />
                </FormControl>

                {/* Calculate Button */}
                <div style={{ textAlign: 'center' }}>
                    <Button type="submit" variant="contained" color="primary">Calculate Price</Button>
                </div>
            </form>

            {/* Display Calculated Prices */}
            {basePrice > 0 && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h5" gutterBottom>Calculated Prices</Typography>
                    <Typography variant="body1">Base Price: ${basePrice.toFixed(2)}</Typography>
                    <Typography variant="body1">Final Price: ${finalPrice.toFixed(2)}</Typography>
                </div>
            )}
        </Container>
    );
};