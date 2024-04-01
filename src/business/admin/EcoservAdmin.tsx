import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent, TextField } from '@mui/material';
import { usePriceCalculations } from '../../hooks/usePriceCalculations';

export const EcoservAdmin: React.FC = () => {
    const [size, setSize] = useState<string>('');
    const [effort, setEffort] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [clientType, setClientType] = useState<string>('');
    const [contractType, setContractType] = useState<string>('');
    const [squareFeet, setSquareFeet] = useState<number>(0);
    const [daysAWeek, setDaysAWeek] = useState<number>(0)
    const [basePrice, setBasePrice] = useState<number>(0);
    const [finalPrice, setFinalPrice] = useState<number>(0); // Add finalPrice state variable
    const [months, setMonths] = useState<number>(0);



    const { calculateCommercialFinalPrice } = usePriceCalculations()

    const onCalculate = () => {


        if (contractType.includes("1")) {
            setMonths(1)
        } else if (contractType.includes("2")) {
            setMonths(2)
        } else if (contractType.includes("3")) {
            setMonths(3)
        } else {
            setMonths(0)
        }

        console.log(months + " #########")

        const finalCalculatedCommercialPrice = calculateCommercialFinalPrice(clientType, daysAWeek, months, squareFeet, effort, location)
        console.log("----------->>>>>> " + calculateCommercialFinalPrice(clientType, daysAWeek, months, squareFeet, effort, location))

        setFinalPrice(finalCalculatedCommercialPrice)

    }

    const handleDaysAWeekChange = (event: any) => {
        setDaysAWeek(event.target.value);

    };

    const handleContractTypeChange = (event: SelectChangeEvent<string>) => {
        setContractType(event.target.value as string);
    };

    const handleSizeChange = (event: SelectChangeEvent<string>) => {
        setSize(event.target.value as string);
    };

    const handleP2Change = (event: any) => {
        setSquareFeet(event.target.value);
    };

    const handleEffortChange = (event: SelectChangeEvent<string>) => {
        setEffort(event.target.value as string);
    };

    const handleLocationChange = (event: SelectChangeEvent<string>) => {
        setLocation(event.target.value as string);
    };
    const handleClientTypeChange = (event: SelectChangeEvent<string>) => {
        setClientType(event.target.value as string);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Add your form submission logic here
    };

    return (
        <Container maxWidth="sm">
            <Typography style={{ textAlign: 'center' }} variant="h4" gutterBottom>Cleaning Pricing Calculator</Typography>
            <form onSubmit={handleSubmit}>
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
                {clientType === "Residential" && (<FormControl fullWidth margin="normal">
                    <InputLabel id="sizeLabel">Size</InputLabel>
                    <Select
                        labelId="sizeLabel"
                        id="sizeDropdown"
                        value={size}
                        onChange={handleSizeChange}
                    >
                        <MenuItem value="Small">Small</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Large">Large</MenuItem>
                        <MenuItem value="Extra Large">Extra Large</MenuItem>
                    </Select>
                </FormControl>)}
                {clientType === "Commercial" && (
                    <FormControl fullWidth margin="normal">
                        {/* <InputLabel id="p2Label">Enter feet square</InputLabel> */}
                        <TextField
                            id="p2Input"
                            label="P2/SqF"
                            type="number" // This makes the input field a number input
                            fullWidth
                            margin="normal"
                            value={squareFeet}
                            onChange={handleP2Change}
                        />
                    </FormControl>
                )}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="effortLabel">Effort</InputLabel>
                    <Select
                        labelId="effortLabel"
                        id="effortDropdown"
                        value={effort}
                        onChange={handleEffortChange}
                    >
                        <MenuItem value="Light">Light</MenuItem>
                        <MenuItem value="Normal">Normal</MenuItem>
                        <MenuItem value="Heavy">Heavy</MenuItem>
                        <MenuItem value="Extra">Extra</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="locationLabel">Location</InputLabel>
                    <Select
                        labelId="locationLabel"
                        id="locationDropdown"
                        value={location}
                        onChange={handleLocationChange}
                    >
                        <MenuItem value="Very Near">Very Near</MenuItem>
                        <MenuItem value="Near">Near</MenuItem>
                        <MenuItem value="Far">Far</MenuItem>
                        <MenuItem value="Very Far">Very Far</MenuItem>
                    </Select>
                </FormControl>


                <FormControl fullWidth margin="normal">
                    <InputLabel id="contractTypeLabel">Contract type</InputLabel>
                    <Select
                        labelId="contractTypeLabel"
                        id="contractTypeDropdown"
                        value={contractType}
                        onChange={handleContractTypeChange}
                    >
                        <MenuItem value="0">0</MenuItem>
                        <MenuItem value="1 month">1 month</MenuItem>
                        <MenuItem value="2 month">2 month</MenuItem>
                        <MenuItem value="3 month">3 month</MenuItem>

                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    {/* <InputLabel id="daysLabel">Days a week</InputLabel> */}
                    <TextField
                        id="daysInput"
                        label="Days a Week"
                        type="number" // This makes the input field a number input
                        fullWidth
                        margin="normal"
                        value={daysAWeek}
                        onChange={handleDaysAWeekChange}
                    />
                </FormControl>
                <div style={{ textAlign: 'center' }}>
                    <Button onClick={onCalculate} type="submit" variant="contained" color="primary">Calculate Price</Button>
                </div>
            </form>

            {finalPrice > 0 && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h5" gutterBottom>Calculated Prices</Typography>
                    {/* <Typography variant="body1">Base Price: ${basePrice.toFixed(2)}</Typography> */}
                    <Typography variant="body1">Final day: ${finalPrice.toFixed(2)}</Typography>
                    <Typography variant="body1">Final month: ${(finalPrice * daysAWeek * 4).toFixed(2)}</Typography>
                    <Typography variant="body1">Final Contract: ${(finalPrice * daysAWeek * 4 * months).toFixed(2)}</Typography>
                    {/* Additional styling for final price */}
                    <div style={{ marginTop: '10px', backgroundColor: '#f0f0f0', padding: '10px' }}>
                        <Typography variant="h6" gutterBottom>Final Price Details</Typography>
                        <Typography variant="body1">The final price includes all discounts and adjustments.</Typography>
                    </div>
                </div>
            )}
        </Container>
    );
};