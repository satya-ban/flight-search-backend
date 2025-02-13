import { Request, Response } from "express";
import { searchFlights } from "../services/flight.service";


export const getFlightsController = async (req: Request, res: Response) => {
    try {
        const origin = req.query.origin as string;
        const destination = req.query.destination as string;
        const departureDate = req.query.departureDate as string;
        const passengers = Number(req.query.passengers)
        const returnDate = req.query.returnDate ? (req.query.returnDate as string) : undefined;

        const flightData = await searchFlights(origin, destination, departureDate, passengers, returnDate)
        if (!flightData.departureFlights.length && !flightData.returnFlights?.length) {
            res.status(200).json({
                message: 'No fligts found!',
                data: []
            })
        } else {
            res.status(200).json({
                message: 'Flights fetched!',
                data: flightData
            })
        }

    } catch (err: any) {
        res.status(500).json({
            errMessgae: err.message
        })
    }

};