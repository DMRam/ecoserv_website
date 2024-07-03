import React, { useState } from 'react'

export const usePriceCalculations = () => {

    /**
     * ==================
       COMMERCIAL_BASE_COST_P2
        Personal	20
        Productos	3
        Transporte	15
        Contabilidad	2
       ==================
     */
    const COMMERCIAL_BASE_COST_P2_FACTOR = 0.09

    //Calculate P2 Cost
    const calculateCommercialPriceNoDiscount = (p2: number, effort: string, location: string) => {

        /**
     * ==================
     * EFFORT	LOCATION
        0.48	0.5
        0.5	    0.56
        0.53	0.58
        0.55	0.59
       ==================
       COMMERCIAL_BASE_COST_P2
        Personal	20
        Productos	3
        Transporte	15
        Contabilidad	2
       ==================
     */

        let effort_factor = 0
        if (effort === 'Light') {
            effort_factor = 0.48
        } else if (effort === 'Normal') {
            effort_factor = 0.5
        } else if (effort === 'Heavy') {
            effort_factor = 0.53
        } else {
            effort_factor = 0.55
        }

        console.log(effort_factor + " effort_factor") // 0.5
        console.log(effort + " effort") // 0.5


        let location_factor = 0
        if (location === 'Very Near') {
            location_factor = 0.5
        } else if (location === 'Near') {
            location_factor = 0.56
        } else if (location === 'Far') {
            location_factor = 0.58
        } else if (location === 'Very Far') {
            location_factor = 0.59
        } else {
            location_factor = 0
        }

        console.log(location_factor + " location_factor") // 0.59
        let calculate_cost_factor = COMMERCIAL_BASE_COST_P2_FACTOR * effort_factor * location_factor // COMMERCIAL_BASE_COST_P2 * EFFORT * LOCATION

        console.log(calculate_cost_factor + " calculate_cost_factor") // 0.0265
        // This is my calculated COST by square feet
        let costCalculatedP2 = (calculate_cost_factor * p2) < 30 ? 30 : (calculate_cost_factor * p2)



        // costCalculatedP2 * 1.2 

        // const costCalculatedP2 = COST_P2 * p2;
        console.log(costCalculatedP2 + " costCalculatedP2")

        let calculatedPriceNoDiscount = costCalculatedP2;

        if (p2 < 900) {
            costCalculatedP2 = costCalculatedP2 * 1.2
            calculatedPriceNoDiscount = ((costCalculatedP2 * 1.3) + costCalculatedP2) < 65 ? 65 : ((costCalculatedP2 * 1.3) + costCalculatedP2);
        } else if (p2 >= 900 && p2 < 1350) {
            costCalculatedP2 = costCalculatedP2 * 1.7
            calculatedPriceNoDiscount = ((costCalculatedP2 * 0.88) + costCalculatedP2) < 65 ? 65 : ((costCalculatedP2 * 0.88) + costCalculatedP2);
        } else if (p2 >= 1350 && p2 < 1800) {
            costCalculatedP2 = costCalculatedP2 * 1.9
            calculatedPriceNoDiscount = ((costCalculatedP2 * 0.6) + costCalculatedP2) < 65 ? 65 : ((costCalculatedP2 * 0.6) + costCalculatedP2);
        } else if (p2 >= 1800 && p2 < 2250) {
            costCalculatedP2 = costCalculatedP2 * 1.9
            calculatedPriceNoDiscount = ((costCalculatedP2 * 0.5) + costCalculatedP2) < 65 ? 65 : ((costCalculatedP2 * 0.5) + costCalculatedP2);
        } else if (p2 >= 2250 && p2 < 2550) {
            costCalculatedP2 = costCalculatedP2 * 1.9
            calculatedPriceNoDiscount = ((costCalculatedP2 * 0.45) + costCalculatedP2) < 65 ? 65 : ((costCalculatedP2 * 0.45) + costCalculatedP2);
        } else {
            calculatedPriceNoDiscount *= 0 // Square feet over size must be recalculated/evaluated
        }
        return calculatedPriceNoDiscount;
    }

    const calculateDiscountToBeApplied = (type: string, daysAWeek: number) => {

        let discount = 0

        // Validation
        if (daysAWeek <= 0) {
            return 0
        }

        // Commercial, if contract is one month or more then 
        if (type === 'Commercial') {
            if (daysAWeek >= 1 && daysAWeek < 3) {
                discount = 0.1
            } else if (daysAWeek >= 3 && daysAWeek < 5) {
                discount = 0.15
            } else {
                discount = 0.2
            }

        }
        return discount
    }


    const calculateCommercialFinalPrice = (type: string, daysAWeek: number, months: number, squareFeet: number, effort: string, location: string) => {

        let base_price_no_discount = calculateCommercialPriceNoDiscount(squareFeet, effort, location)

        let discount_to_calculate_final_price = 0

        // has discount if contract 
        console.log(months + " months")
        if (months > 0) {
            discount_to_calculate_final_price = calculateDiscountToBeApplied(type, daysAWeek)
        }

        console.log(discount_to_calculate_final_price + " discount_to_calculate_final_price")
        return base_price_no_discount - base_price_no_discount * discount_to_calculate_final_price
    }

    /**
     * 
     * INFO TO USE IN CALCULATION: 
     * {
     * "name":"",
     * "email":"",
     * "area":"",
     * "bedrooms":"",
     * "bathrooms":"",
     * "service":"",
     * "date":"2024-06-27",
     * "date_appointment":"",
     * "hourRange":"",
     * "additionalServices":{
     * "carpetCleaning":{"selected":false,"info":"Servicio de limpieza de alfombras"},
     * "windowCleaning":{"selected":false,"info":"Servicio de limpieza de ventanas"},
     * "deepCleaning":{"selected":false,"info":"Servicio de limpieza profunda"},
     * "another":{"selected":false,"info":"Servicio de limpieza adicional"}}}
     */

    /**
     * 
     * 
     * @param daysAWeek used for admin
     * @param months used for admin
     * @param squareFeet 
     * @param effort used for admin
     * @param location used for admin
     * @param rooms 
     * @param bathrooms
     */
    const calculateResidential = (daysAWeek: number, months: number, squareFeet: number, effort: string, location: string, rooms: number, bathrooms: number) => {

        const roomPrice = rooms * 15
        const bathroomPrice = bathrooms * 10
        const areaPrice = squareFeet * 0.15

        console.log(roomPrice + " <-------- PRECIO CALCULADO ROOM")
        console.log(bathroomPrice + " <-------- PRECIO CALCULADO BATHROOM")
        console.log(areaPrice + " <-------- PRECIO CALCULADO AREA")
        console.log(roomPrice + bathroomPrice + areaPrice + " <-------- PRECIO CALCULADO")

    }

    const calculateAirBNB = (daysAWeek: number, months: number, squareFeet: number, effort: string, location: string) => {

    }

    const calculateAC = (daysAWeek: number, months: number, squareFeet: number, effort: string, location: string) => {

    }

    const calculateBroker = (daysAWeek: number, months: number, squareFeet: number, effort: string, location: string) => {

    }

    const calculateHP = (daysAWeek: number, months: number, squareFeet: number, effort: string, location: string) => {

    }

    return { calculateCommercialFinalPrice, calculateResidential };
}
